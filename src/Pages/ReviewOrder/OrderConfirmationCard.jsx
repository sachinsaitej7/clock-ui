import React from "react";
import PropTypes from "prop-types";
import "./OrderConfirmationCard.scss";
import separator from "../../utils/numberWithCommas";
const OrderConfirmationCard = (props) => {
  return (
    <div className="orderconfirmationcard">
      <div className="ocimage">
        <img src={props.data.thumbnail} width="58px" height="70px" />
      </div>

      <div className="ocproductname">
        <text>{props.data.name}</text>
      </div>
      <div className="occompname">
        <text>
          Sold by:
          <span style={{ color: "#0555BB", marginLeft: "10px" }}>
            {props.data.brand?.name || "-"}
          </span>
        </text>
      </div>
      <div className="ocpricing">
        <text>
          {"₹ "}
          {separator(props.data.price.toFixed(2))}
        </text>
      </div>
      <div className="ocquantity">
        <text>Quantity: {props.data.quantity}</text>
      </div>
    </div>
  );
};

OrderConfirmationCard.propTypes = {
  data: PropTypes.object.isRequired,
};
export default OrderConfirmationCard;
