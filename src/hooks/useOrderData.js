import { useEffect, useState, useRef, useCallback } from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

export function useOrderData(user) {
  const id = user?.uid;
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);
  const [activeAddress, setActiveAddress] = useState();

  const orderUnSubscription = useRef(() => {});
  const addressUnSubscription = useRef(() => {});

  useEffect(() => {
    try {
      const address = JSON.parse(localStorage.getItem("address"));
      console.log(address);
      setActiveAddress(address ? address : undefined);
    }
    catch (e) {
      localStorage.removeItem("address");
      console.log(e);
    }

    return () => {
      orderUnSubscription.current();
      addressUnSubscription.current();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(activeAddress));
  }, [activeAddress]);

  const setUpAddressMeta = useCallback(() => {
    const db = getFirestore();

    const deliveryQuery = query(
      collection(db, "delivery-address"),
      where("uuid", "==", id)
    );

    addressUnSubscription.current = onSnapshot(
      deliveryQuery,
      (querySnapshot) => {
        const address = [];
        querySnapshot.forEach((doc) => {
          address.push({ id: doc.id, ...doc.data() });
        });
        setAddress(address);
      }
    );
  }, [id]);

  const setUpOrderMeta = useCallback(() => {
    const db = getFirestore();
    const orderQuery = query(
      collection(db, "orders"),
      where("user_id", "==", id)
    );

    orderUnSubscription.current = onSnapshot(orderQuery, (querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setOrders(orders);
    });
  }, [id]);

  useEffect(() => {
    if (id) {
      setUpAddressMeta();
      setUpOrderMeta();
    }
  }, [id, setUpAddressMeta, setUpOrderMeta]);

  const addNewAddress = async ({
    name,
    email,
    pincode,
    address,
    city,
    landMark,
    state,
    mobileNo,
  }) => {
    const db = getFirestore();
    try {
      await addDoc(collection(db, "delivery-address"), {
        uuid: id,
        name,
        email,
        pincode,
        address,
        city,
        landMark,
        state,
        mobileNo,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const updateOrder = async (orderId, payload) => {
    const { user } = this.props;
    const { activeAddress, items } = this.context;
    const db = getFirestore();
    const orderRef = doc(db, "orders", orderId);
    const newMessageRef = doc(collection(db, "messages"));
    const messageData = {
      order_id: orderId,
      // prettier-ignore
      body: `Order placed by ${user.name}.\nAddress: ${activeAddress.address}, pincode: ${activeAddress.pincode}.\nMobile: ${activeAddress.mobileNo}\nAlternative Number: ${activeAddress.alternativeNo || user.phone_number}\nProducts: ${items.map((item) =>`Name: ${item.name}\nSize: ${item.selectedSizeVariant.variant_name || "NA"}\nColor: ${item.selectedColorVariant.variant_name || "NA"}\nQuantity: ${item.quantity}\nPrice: ${item.price}\nLink: https://theclock.xyz/product/${item.id},`).join("\n")}`,
      timestamp: new Date(),
      to: "+919952974048",
    };

    await updateDoc(orderRef, {
      ...payload,
    });
    await setDoc(newMessageRef, { ...messageData });
  };

  const fetchOrderData = async (orderId) => {
    const db = getFirestore();
    try {
      const orderRef = doc(db, "orders", orderId);
      const orderDoc = await getDoc(orderRef);
      const orderData = orderDoc.data();
      const { delivery_address_id } = orderData;
      const addressRef = doc(db, "delivery-address", delivery_address_id);
      const addressDoc = await getDoc(addressRef);
      const addressData = addressDoc.data();
      return {
        orderData,
        deliveryAddress: addressData,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    orders,
    address,
    activeAddress,
    addNewAddress,
    setActiveAddress,
    updateOrder,
    fetchOrderData,
  };
}
