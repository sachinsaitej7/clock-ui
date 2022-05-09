import React, { useContext } from "react";
import PropTypes from "prop-types";
import ReviewOrderCard from "../../Pages/ReviewOrder/ReviewOrderCard";
import Seperator from "../../assets/png/separator.png";
import seperator from "../../utils/numberWithCommas";
import Vector from "../../assets/svg/Vector.svg";
import "./style.scss";
import { AuthContext } from "../../Contexts/AuthContext";

const CartSummary = (props) => {
  const { user, setShowLoginPopup } = useContext(AuthContext);

  const handleProceedToCheckout = () => {
    if (user) {
      props.onClick && props.onClick();
    } else {
      setShowLoginPopup(true);
    }
  };
  const {
    items,
    setQuantity,
    triggerDelete,
    renderHeader = () => null,
  } = props;
  let a = 0;
  items.forEach((item) => {
    if (item.price) {
      a += item.price * (item.quantity || 1);
    }
  });
  const delivery = 0;
  return (
    <div className="cart-summary-container">
      <div className="lhs">
        <div style={{ marginBottom: "20px", width: "95%" }}>
          {renderHeader()}
        </div>

        <div className="cart-items">
          {" "}
          {items.map((item) => (
            <ReviewOrderCard
              key={item.id}
              data={item}
              setQuantity={setQuantity}
              triggerDelete={triggerDelete}
            />
          ))}
        </div>
      </div>
      <div className="rhs">
        <div className="cart-summary">
          <p className="b1">Summary</p>
          <div className="cart-summary-items">
            <p>{`Subtotal (${items.length} items)`}</p>
            <p>
              {" "}
              <b>₹{seperator(a)}</b>
            </p>
          </div>
          <div className="cart-summary-items">
            <p>Discount</p>
            <b>-₹{seperator(0)}</b>
          </div>
          <div className="cart-summary-items">
            <p>Delivery Charges</p>
            <b>
              {delivery === 0 ? (
                <div style={{ color: "green" }}>Free</div>
              ) : (
                <div>₹separator(delivery)</div>
              )}
            </b>
          </div>
          <img className="linesum" src={Seperator} alt="seperator" />
          <div className="cart-summary-items">
            <p>Total</p>
            <b>₹{seperator(a - 0)}</b>
          </div>
        </div>
        <button className="butt1" onClick={handleProceedToCheckout}>
          Proceed to Buy
        </button>{" "}
        <div className="deliverytime">
          <img src={Vector} alt="seperator-vector" />
          <text> Order before 5 PM for sameday delivery </text>
        </div>
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  setQuantity: PropTypes.func,
  triggerDelete: PropTypes.func,
  renderHeader: PropTypes.func,
  onClick: PropTypes.func,
};

export default CartSummary;
