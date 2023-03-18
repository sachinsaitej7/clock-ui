import { useEffect, useState, useRef, useCallback } from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

import { getFirebase } from "app/firebase";

export function useOrderData(user) {
  const { db } = getFirebase();
  const id = user?.uid;
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);
  const [activeAddress, setActiveAddress] = useState();

  const orderUnSubscription = useRef(() => {});
  const addressUnSubscription = useRef(() => {});

const loadAddress = async () => {
  try {
    let localAddress = localStorage.getItem("address");
    if (typeof localAddress === "string") {
      try {
        localAddress = JSON.parse(localAddress);
        setActiveAddress(localAddress);
      } catch (e) {
        console.log("Error parsing address JSON:", e);
      }
    }
  } catch (e) {
    console.log("Error loading address from localStorage:", e);
    localStorage.removeItem("address");
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
  if (activeAddress)
    localStorage.setItem("address", JSON.stringify(activeAddress));
}, [activeAddress]);

  const setUpAddressMeta = useCallback(() => {
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

  const updateOrder = async (orderId, payload, items = []) => {
    const orderRef = doc(db, "orders", orderId);
    const newMessageRef = doc(collection(db, "emails"));
    const messageData = {
      subject: `New Order placed by ${user.name || "New User"} || ${orderId}`,
      text: `New Order placed by ${user.name || "New User"}.\nAddress: ${
        activeAddress.address
      }, pincode: ${activeAddress.pincode}.\nMobile: ${
        activeAddress.mobileNo
      }\nAlternative Number: ${
        activeAddress.alternativeNo || user.phone_number
      }\nProducts: ${items
        .map(
          (item) =>
            `Name: ${item.name}\nSize: ${item.size?.values || "NA"}\nColor: ${
              item.color?.name || "NA"
            }\nQuantity: ${item.quantity}\nPrice: ${
              item.price
            }\nLink: https://theclock.xyz/products/${item.id}`
        )
        .join("\n")}`,
    };

    await updateDoc(orderRef, {
      ...payload,
    });
    await setDoc(newMessageRef, {
      message: messageData,
      to: "barathms13@gmail.com",
    });
  };

  const fetchOrderData = async (orderId) => {
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
