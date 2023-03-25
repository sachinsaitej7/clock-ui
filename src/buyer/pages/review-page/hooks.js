import { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import {
  useCollectionDataOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import { Logo } from "@assets/logo";
import { useAuth } from "@app/store";
import { ProfileQuery, ProductQuery, OrderQuery } from "@buyer/queries";
import { useCartContext } from "@buyer/store";

import { loadScript } from "./utils";
import { useSummaryContext } from "./store/SummaryProvider";

export function useGetUserAddress() {
  const [user] = useAuth();
  return useCollectionDataOnce(ProfileQuery.fetchUserAddressQuery(user?.uid));
}

export function useUserProfile() {
  const [user] = useAuth();
  return useDocumentData(ProfileQuery.fetchUserProfileQuery(user?.uid));
}

export function useAddNewAddress() {
  const [user] = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const addNewAddress = async (address) => {
    setLoading(true);
    try {
      await ProfileQuery.addNewAddress(user?.uid, address);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [addNewAddress, loading, error];
}

export function usePincodeCheck(pincode) {
  return useCollectionDataOnce(ProductQuery.fetchPincodeCheckQuery(pincode));
}

// razorpay hook for payment

export function useRazorpay() {
  const [user] = useAuth();
  const { address, paymentType } = useSummaryContext();
  const { items } = useCartContext();
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const createRazorpayOrder = async () => {
    if (!address || !user) return;
    try {
      setLoading(true);
      const res = await OrderQuery.createRazorpayOrder({
        address,
        items,
        userId: user?.uid,
        paymentType,
      });
      setOrder(res.data);
    } catch (error) {
      console.log(error.message);
      setError(error);
    }
    setLoading(false);
  };

  return {
    order,
    createRazorpayOrder,
    error,
    loading,
  };
}

export function useGetOrderData(id) {
  return useDocumentData(OrderQuery.fetchOrderByIdQuery(id));
}

export function useUpdateOrderData() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const updateOrder = async (id, payload) => {
    try {
      setLoading(true);
      await OrderQuery.updateOrderData(id, payload);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [updateOrder, loading, error];
}

export function usePaymentMethod(id) {
  const theme = useTheme();
  const [user] = useAuth();
  const [userData] = useUserProfile();
  const [orderData] = useGetOrderData(id);
  const [updateOrder, loading, error] = useUpdateOrderData();

  const handleRazorpayResponse = async (response) => {
    const razorpayPaymentId = response.razorpay_payment_id;
    const razorpaySignature = response.razorpay_signature;
    const payload = {
      razorpayPaymentId,
      razorpaySignature,
      amountPaid: orderData.amount,
      status: "payment_received",
      amountDue: 0,
    };
    await updateOrder(id, payload);
  };

  useEffect(() => {
    if (orderData && orderData.status === "created") {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        currency: orderData.currency,
        amount: orderData.amount,
        name: "AARAM NETWORKS PRIVATE LIMITED",
        description: "Order ID: " + orderData.razorpayOrderId,
        image: <Logo width='40px' />,
        order_id: orderData.razorpayOrderId,
        handler: handleRazorpayResponse,
        prefill: {
          name: userData?.name,
          email: userData?.email,
          contact: user?.phoneNumber,
        },
        theme: {
          color: theme.colors.primary,
        },
      };
      if (orderData.paymentType === "prepaid") {
        if (window.Razorpay) {
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        }
      } else {
        updateOrder(id, {
          status: "order_placed",
        });
      }
    }
  }, [orderData]);
  return [updateOrder, loading, error];
}
