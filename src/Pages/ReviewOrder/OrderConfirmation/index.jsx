import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
// import OCImage from "../../../assets/svg/orderconfirmationimage.svg";
import OrderConfirmationCard from "../OrderConfirmationCard";
import DeliveryCard from "../../../Components/DeliveryDetailsCard";
import withRouter from "../../../hoc/WithRouter";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import OverlayLoader from "../../../Components/OverlayLoader";
import { Link } from "react-router-dom";

// const deliveryDetails = {
//   Deliveryon: "Today",
//   OrderNo: "#100-64892631-7264528",
//   Name: "Anbarasan,",
//   Address:
//     "10, Venkateshwara 1st Street, Ramapuram, Valasaravakkam Chennai - 600 087",
//   count: 4,
//   subtotal: 6499.0,
//   discount: 400.0,
//   total: 6099.0,
// };

class OrderConfirmation extends Component {
  state = {
    orderData: null,
    deliveryAddress: null,
    loading: true,
  };

  componentDidMount() {
    const { params } = this.props;
    this.fetchOrderData(params.orderId);
  }

  fetchOrderData = async (orderId) => {
    const db = getFirestore();
    this.setState({ loading: true });
    try {
      const orderRef = doc(db, "orders", orderId);
      const orderDoc = await getDoc(orderRef);
      const orderData = orderDoc.data();
      const { delivery_address_id } = orderData;
      const addressRef = doc(db, "delivery-address", delivery_address_id);
      const addressDoc = await getDoc(addressRef);
      const addressData = addressDoc.data();
      this.setState({
        orderData,
        deliveryAddress: addressData,
        loading: false,
      });
    } catch (error) {
      toast.error("Error in fetching the order details");
      this.setState({ loading: false });
      // this.props.
    }
  };

  render() {
    const { deliveryAddress, loading, orderData } = this.state;
    const { items = [] } = orderData || {};

    if (loading) return <OverlayLoader />;

    return (
      <div className="orderconfirmation">
        <div className="ordconftext">Your Order is Confirmed!</div>
        <text className="thanks">
          Thanks for shopping with us, You will receive a confirmation mail to
          you registered mail address.
        </text>

        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="continueshopping">Continue Shopping</button>
        </Link>
        <div className="deliverybox">
          {deliveryAddress && (
            <DeliveryCard
              deliveryDetails={deliveryAddress}
              orderData={orderData}
            />
          )}
        </div>
        <div className="cardbox">
          <div className="cards">
            {" "}
            {items.map((cardData, index) => (
              <OrderConfirmationCard key={index} data={cardData} />
            ))}
          </div>
          <div className="contactus">Contact Us?</div>
          <div className="contacttext">
            Feel free to{" "}
            <span style={{ color: "blue", cursor: "pointer" }}>
              <a href="mailto:reached.clock@gmail.com">Contact us</a>
            </span>{" "}
            with any questions regarding your purchase
          </div>
        </div>
      </div>
    );
  }
}

OrderConfirmation.propTypes = {
  params: PropTypes.object,
};

export default withRouter(OrderConfirmation);
