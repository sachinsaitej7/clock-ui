import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NotMap from "./pages/DeliveryAddress/NotMap";
import { Route, Routes } from "react-router-dom";
import EmptyStatesPages from "./pages/EmptyState/EmptyStatesPages";
import LandingPageHome from "./pages/LandingPage/LandingPageHome";
import StorePage from "./pages/StorePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import MyCart from "./pages/EmptyState/MyCart";
// import ReviewOrder1 from "./pages/ReviewOrder/ReviewOrder1";
import WithTemplate from "./hoc/WithTemplate";
import { AuthContext } from "./context/AuthContext";
import ScrollToTop from "./Components/ScrollToTop";
import ProfilePage from "./pages/ProfilePage";
import DeliveryAddress from "./pages/DeliveryAddress/NewUser";
import WithAuthRoute from "./hoc/WithAuthRoute";
import NotFoundPage from "./pages/NotFoundPage";
import DeskTopOnlyPage from "./pages/DeskTopOnlyPage";
import { useAuthState } from "react-firebase-hooks/auth";

// eslint-disable-next-line no-unused-vars
import { app } from "./firebase-config";
import { CartContext } from "./context/CartContext";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updateProfile,
  updatePassword,
  updateEmail,
} from "firebase/auth";

// import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import DeliveryPage from "./pages/DeliveryAddress";
import ReviewOrder from "./pages/ReviewOrder";
import OrderConfirmation from "./pages/ReviewOrder/OrderConfirmation";

function App() {
  const [user, setUser] = useState(undefined);
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);
  const [loginState, setLoginState] = useState("SEND_OTP");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [activeAddress, setActiveAddress] = useState(undefined);
  const [items, setItems] = useState([]);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  let unsubscribe1 = () => {};
  let unsubscribe2 = () => {};

  const [firebaseUser, authLoading, authError] = useAuthState(getAuth());

  // const [fireBaseUser, loading] = useAuthState(getAuth());

  const saveItems = (items) => {
    localStorage.setItem("items", JSON.stringify(items));
    setItems(items);
  };

  const removeAllItems = () => {
    localStorage.removeItem("items");
    setItems([]);
  };

  const saveActiveAddress = (address) => {
    localStorage.setItem("address", JSON.stringify(address));
    setActiveAddress(address);
  };

  useEffect(() => {
    firebaseUser &&
      firebaseUser.getIdToken().then((idToken) => {
        const {
          email: email_id,
          displayName: name,
          phoneNumber: phone_number,
          uuid: id,
        } = firebaseUser;
        const user = {
          email_id,
          name,
          phone_number,
          id,
        };
        setUser(user);
        localStorage.setItem("id_token", idToken);
        fetchAuthToken();
      });
  }, [firebaseUser]);

  useEffect(() => {
    const items = localStorage.getItem("items");
    const address = localStorage.getItem("address");
    setItems(items ? JSON.parse(items) : []);
    setActiveAddress(address ? JSON.parse(address) : undefined);
    if (window.innerWidth <= 800) setShowMobileWarning(true);
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    setUpAddressMeta(user.id);
    setUpOrderMeta(user.id);
  }, [user?.id]);

  useEffect(() => {
    if (user?.id)
      setUser({ ...user, orders: [...orders], address: [...address] });
  }, [orders, address]);

  const addItem = (item) => {
    saveItems([...items, item]);
  };

  const removeItem = (item) => {
    const selectedItem = items.findIndex(
      (i) =>
        item.id === i.id &&
        (!item.selectedColorVariant.variant_id ||
          item.selectedColorVariant.variant_id ===
            i.selectedColorVariant.variant_id) &&
        (!item.selectedSizeVariant.variant_id ||
          item.selectedSizeVariant.variant_id ===
            i.selectedSizeVariant.variant_id)
    );
    if (selectedItem !== -1) {
      saveItems(items.filter((i, index) => index !== selectedItem));
    }
  };

  const setUpAddressMeta = (id) => {
    const db = getFirestore();

    const deliveryQuery = query(
      collection(db, "delivery-address"),
      where("uuid", "==", id)
    );

    unsubscribe1 = onSnapshot(deliveryQuery, (querySnapshot) => {
      const address = [];
      querySnapshot.forEach((doc) => {
        address.push({ id: doc.id, ...doc.data() });
      });
      setAddress(address);
    });
  };

  const setUpOrderMeta = (id) => {
    const db = getFirestore();
    const orderQuery = query(
      collection(db, "orders"),
      where("user_id", "==", id)
    );

    unsubscribe2 = onSnapshot(orderQuery, (querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setOrders(orders);
    });
  };

  const changeQuantity = (item, increment) => {
    const selectedItem = items.findIndex(
      (i) =>
        item.id === i.id &&
        (!item.selectedColorVariant.variant_id ||
          item.selectedColorVariant.variant_id ===
            i.selectedColorVariant.variant_id) &&
        (!item.selectedSizeVariant.variant_id ||
          item.selectedSizeVariant.variant_id ===
            i.selectedSizeVariant.variant_id)
    );
    if (increment) {
      if (selectedItem !== -1) {
        saveItems(
          items.map((i, index) => ({
            ...i,
            quantity: index === selectedItem ? i.quantity + 1 : i.quantity,
          }))
        );
      }
    } else {
      if (selectedItem !== -1) {
        saveItems(
          items.map((i, index) => ({
            ...i,
            quantity:
              index === selectedItem && i.quantity > 1
                ? i.quantity - 1
                : i.quantity,
          }))
        );
      }
    }
  };

  const fetchAuthToken = async () => {
    const token = localStorage.getItem("id_token");
    if (token) {
      try {
        let data = await fetch(
          "https://clockapi.theclock.xyz/api/customer/login/?id_token=" + token
        );
        let json = await data.json();
        if (json.success) setUser(json.user);
        else setUser(null);
      } catch (err) {
        localStorage.removeItem("id_token");
        toast.error("Authentication failed");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const handleSignInWithEmail = async (email, password) => {
    const auth = getAuth();
    try {
      toast.success("Veriying, Please wait...");
      const result = await signInWithEmailAndPassword(auth, email, password);
      const {
        email: email_id,
        displayName: name,
        phoneNumber: phone_number,
        uuid: id,
      } = result.user;
      const user = {
        email_id,
        name,
        phone_number,
        id,
      };
      const idToken = await result.user.getIdToken();

      localStorage.setItem("id_token", idToken);
      setUser(user);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        toast.error("Please check the Password");
      }
      if (error.code === "auth/user-not-found") {
        toast.error("Please check the Email");
      }
      if (error.code === "auth/invalid-email") {
        toast.error("Please check the Email");
      }
    }
  };

  const handleSignInWithPhone = async (phoneNumber) => {
    let validPhoneNumber = phoneNumber.replace(/[^\d]/g, "");
    // if (validPhoneNumber.length === "10") {
    validPhoneNumber = `+91${validPhoneNumber}`;
    // }
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
    const appVerifier = window.recaptchaVerifier;
    try {
      toast.success("Sending Otp, Please wait...");
      const result = await signInWithPhoneNumber(
        auth,
        validPhoneNumber,
        appVerifier
      );
      window.confirmationResult = result;
      setLoginState("VERIFY_OTP");
    } catch (error) {
      // Error; SMS not sent
      // ...
      if (error.code === "auth/invalid-phone-number") {
        toast.error("Please check the Phone Number");
      } else {
        toast.error("Error in sending the sms");
      }
      console.log(error);
    }
  };

  const updateUserProfile = async (displayName, email, password) => {
    const user = getAuth().currentUser;
    try {
      await updateProfile(user, {
        displayName,
      });
      await updateEmail(user, email);
      await updatePassword(user, password);
      toast.success("Profile created Successfully");
      setLoginState("LOGGED_IN");
    } catch (error) {
      console.log(error);
      toast.error("Error saving the details");
    }
  };

  const verifyOtp = async (code) => {
    try {
      toast.info("Verifying Otp, Please wait...");
      const result = await window.confirmationResult.confirm(code);
      // const user = result.user;
      const {
        email: email_id,
        displayName: name,
        phoneNumber: phone_number,
        uid: id,
      } = result.user;
      const user = {
        email_id,
        name,
        phone_number,
        id,
      };
      const idToken = await result.user.getIdToken();
      localStorage.setItem("id_token", idToken);
      if (!user.email_id || !user.name) {
        setLoginState("COMPLETE_PROFILE");
      } else {
        setUser(user);
      }
    } catch (error) {
      toast.error("Error verifying the code");
    }
  };

  const handleSignOut = async () => {
    try {
      await getAuth().signOut();
      setUser(null);
      localStorage.removeItem("id_token");
    } catch (error) {
      console.log(error);
    }
  };

  if (showMobileWarning) return <DeskTopOnlyPage />;

  return (
    <AuthContext.Provider
      value={{
        user,
        loginState,
        showLoginPopup,
        setShowLoginPopup,
        setLoginState,
        verifyOtp,
        handleSignInWithEmail,
        handleSignInWithPhone,
        updateUserProfile,
        signOut: handleSignOut,
      }}
    >
      <CartContext.Provider
        value={{
          items,
          addItem,
          removeItem,
          removeAllItems,
          changeQuantity,
          activeAddress,
          setActiveAddress: saveActiveAddress,
        }}
      >
        <div className="App">
          <ToastContainer></ToastContainer>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <WithTemplate>
                  <LandingPageHome />
                </WithTemplate>
              }
            />
            <Route
              path="/wishlist"
              exact
              element={
                <WithAuthRoute>
                  <WithTemplate>
                    <EmptyStatesPages />
                  </WithTemplate>
                </WithAuthRoute>
              }
            />
            <Route path="/deliveryAddress" exact element={<NotMap />} />
            <Route
              path="/malls/:mallId"
              exact
              element={
                <WithTemplate>
                  <StorePage />
                </WithTemplate>
              }
            />
            <Route
              path="/product"
              exact
              element={
                <WithTemplate>
                  <CategoryPage />
                </WithTemplate>
              }
            />
            <Route
              path="/product/:productId"
              exact
              element={
                <WithTemplate>
                  <ProductPage />
                </WithTemplate>
              }
            />
            <Route
              path="/profile"
              exact
              element={
                <WithAuthRoute>
                  <WithTemplate>
                    <ProfilePage />
                  </WithTemplate>
                </WithAuthRoute>
              }
            />
            <Route
              path="/my-cart"
              exact
              element={
                // <WithAuthRoute>
                <WithTemplate>
                  <MyCart />
                </WithTemplate>
                // </WithAuthRoute>
              }
            />
            <Route
              path="/add-new-address"
              exact
              element={
                <WithAuthRoute>
                  <WithTemplate>
                    <DeliveryAddress />
                  </WithTemplate>
                </WithAuthRoute>
              }
            />
            <Route
              path="/address"
              exact
              element={
                <WithAuthRoute>
                  <WithTemplate>
                    <DeliveryPage />
                  </WithTemplate>
                </WithAuthRoute>
              }
            />
            <Route
              path="/review-order"
              exact
              element={
                <WithAuthRoute>
                  <WithTemplate>
                    <ReviewOrder user={user} />
                  </WithTemplate>
                </WithAuthRoute>
              }
            />
            <Route
              path="/order/:orderId"
              exact
              element={
                <WithAuthRoute>
                  <WithTemplate>
                    <OrderConfirmation user={user} />
                  </WithTemplate>
                </WithAuthRoute>
              }
            />

            <Route
              path="/*"
              element={
                <WithTemplate>
                  <NotFoundPage />
                </WithTemplate>
              }
            />
          </Routes>
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
