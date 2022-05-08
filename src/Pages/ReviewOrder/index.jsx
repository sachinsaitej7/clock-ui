import React, { Component } from "react";
import "./style.scss";
import Img1 from "../../assets/svg/Progress1tick.svg";
import Img2 from "../../assets/svg/Progress2col.svg";
import Img3 from "../../assets/svg/Progress3.svg";
import line from "../../assets/svg/Line 18.svg";
import logo from "../../assets/svg/TopBar/Logo-Full.svg";

import PropTypes from "prop-types";
import Seperator from "../../assets/png/separator.png";

import { CartContext } from "../../Contexts/CartContext";
import ReviewAddressComponent from "../../Components/ReviewOrderAddress";
import withRouter from "../../Hoc/WithRouter";
import { toast } from "react-toastify";
import CartSummary from "../../Components/CartSummary/CartSummary";
import axios from "axios";
import { isEqual } from "lodash";
import {
  doc,
  updateDoc,
  getFirestore,
  setDoc,
  collection,
} from "firebase/firestore";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

class ReviewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: "",
      razorpayData: {},
    };
  }

  handleClick = () => {
    toast.info("Please wait we are placing your order");
    this.fetchRazorpayOrder();
  };

  handleRazorpayResponse = async (response) => {
    const { orderId, razorpayData } = this.state;
    const { navigate } = this.props;
    const { removeAllItems } = this.context;
    const razorpay_payment_id = response.razorpay_payment_id;
    const razorpay_signature = response.razorpay_signature;
    const payload = {
      razorpay_payment_id,
      razorpay_signature,
      amount_paid: razorpayData.amount,
      status: "payment received",
      amount_due: 0,
    };
    try {
      await this.updateFirebaseOrder(orderId, payload);
      navigate("/order/" + orderId);
      removeAllItems();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  updateFirebaseOrder = async (orderId, payload) => {
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

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.razorpayData, this.state.razorpayData)) {
      const { razorpayData, orderId } = this.state;
      const { user } = this.props;
      const options = {
        key: "rzp_live_wKoj3DjB4pqEY2",
        currency: razorpayData.currency,
        amount: razorpayData.amount,
        name: "AARAM NETWORKS PRIVATE LIMITED",
        description: "Order ID: " + orderId,
        image: logo,
        order_id: razorpayData.id,
        handler: this.handleRazorpayResponse,
        prefill: {
          name: user.name,
          email: user.email_id,
          contact: user.phone_number,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  }

  componentDidMount() {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }

  fetchRazorpayOrder = async () => {
    const { items = [], activeAddress } = this.context;
    const { id: delivery_address_id } = activeAddress;
    try {
      const id_token = await localStorage.getItem("id_token");
      const response = await axios.post(
        "https://clockapi.theclock.xyz/razorpay/order/",
        {
          delivery_address_id,
          items,
          id_token,
        }
      );
      if (response.status === 200) {
        const { data } = response;
        this.setState({
          orderId: data.data.order_id,
          razorpayData: data.data.razorpay_order,
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  render() {
    const {
      items = [],
      removeItem,
      changeQuantity,
      activeAddress,
    } = this.context;

    return (
      <div className="review-order-final">
        <img alt="error-loading" className="line" src={Seperator} />
        <div className="disp1">
          <div style={{ width: "30%" }}>
            <text className="txt1">Review Your Order</text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img alt="error-loading" src={Img1} className="img1" />
            <img alt="error-loading" src={line} className="lin1" />
            <img alt="error-loading" src={Img2} className="img2" />
            <img alt="error-loading" src={line} className="lin2" />
            <img alt="error-loading" src={Img3} className="img3" />
          </div>
        </div>

        <img alt="error-loading" className="line3" src={Seperator} />
        <div className="txt2">
          By placing your Order, you agree to Clock’s{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              color: "#666666;",
            }}
          >
            Privacy Policy
          </span>{" "}
          and
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              color: "#666666;",
            }}
          >
            {" "}
            Terms and Conditions
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div className="container">
            <CartSummary
              items={items}
              setQuantity={changeQuantity}
              triggerDelete={removeItem}
              renderHeader={() => (
                <>
                  <div
                    style={{
                      padding: "10px",
                      border: "1px solid #e6e6e6",
                    }}
                  >
                    <span className="txt3">Delivery Address</span>
                  </div>
                  <ReviewAddressComponent addressDetails={activeAddress} />
                </>
              )}
              onClick={this.handleClick}
            />
          </div>
        </div>
        <img alt="error-loading" className="line2" src={Seperator} />
      </div>
    );
  }
}

ReviewOrder.contextType = CartContext;
ReviewOrder.propTypes = {
  address: PropTypes.arrayOf(PropTypes.object),
  navigate: PropTypes.func,
  user: PropTypes.object,
};

export default withRouter(ReviewOrder);
