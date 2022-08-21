import { useEffect, useState, useRef, useCallback } from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
  addDoc,
  getDoc,
  getDocs,
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

  const loadAddress = async () => {
    try {
      let localAddress = await localStorage.getItem("address");
      localAddress = localAddress ? JSON.parse(localAddress) : null;
      setActiveAddress(localAddress);
    } catch (e) {
      localStorage.removeItem("address");
      console.log(e);
    }
  };

  useEffect(() => {
    loadAddress();
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

  const updateOrder = async (orderId, payload, items=[]) => {
    const db = getFirestore();
    const orderRef = doc(db, "orders", orderId);
    const newMessageRef = doc(collection(db, "emails"));
    const messageData = {
      subject: `New Order placed by ${user.name || 'New User'} || ${orderId}`,
      text: `New Order placed by ${user.name || 'New User'}.\nAddress: ${
        activeAddress.address
      }, pincode: ${activeAddress.pincode}.\nMobile: ${
        activeAddress.mobileNo
      }\nAlternative Number: ${
        activeAddress.alternativeNo || user.phone_number
      }\nProducts: ${items
        .map(
          (item) =>
            `Name: ${item.name}\nSize: ${
              item.selectedSizeVariant.variant_name || "NA"
            }\nColor: ${
              item.selectedColorVariant.variant_name || "NA"
            }\nQuantity: ${item.quantity}\nPrice: ${
              item.price
            }\nLink: https://theclock.xyz/product/${item.id}`
        )
        .join("\n")}`,
    };


    await updateDoc(orderRef, {
      ...payload,
    });
    await setDoc(newMessageRef, { message: messageData, to: "barathms13@gmail.com", });
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

  const fetchPincodeData = async (pincode) => {
    const db = getFirestore();
    try {
      const q = query(
        collection(db, "pincode-checker"),
        where("pincode", "==", +pincode)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      return data[0];
    } catch (error) {
      console.log(error);
      return;
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
    fetchPincodeData,
  };
}
