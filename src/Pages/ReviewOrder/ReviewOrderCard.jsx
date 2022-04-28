import React from "react";
import PropTypes from "prop-types";
import "./ReviewOrderCard.scss";
import minus from "../../assets/png/minus.png";
import plus from "../../assets/png/plus.png";
import separator from "../../utils/numberWithCommas";


const ReviewOrderCard = (props) => {
  const { data, setQuantity, triggerDelete } = props;

  return (
    <div className="reviewordercard">
      <div className="scimage">
        <img src={data.thumbnail} width="100px" height="150px" />
      </div>

      <div className="scproductname">
        <text>{data.name}</text>
      </div>
      <div className="scinstock">
        <text>{data.status ? "In Stock" : ""}</text>
      </div>
      <div className="properties">
        <text>
          <b>Colour :</b> {data.selectedColorVariant.variant_name}{" "}
        </text>
      </div>
      <div className="properties2">
        <text>
          <b>Size :</b> {data.selectedSizeVariant.variant_name}{" "}
        </text>
      </div>
      <div className="scpricing">
        <text>
          <b>
            {"₹ "}
            {separator(data.price)}
          </b>
        </text>
      </div>

      <div className="scquantity">
        <img
          src={minus}
          className="item1"
          onClick={() => setQuantity(data, false)}
        />
        <div className="count">{data.quantity}</div>
        <img
          src={plus}
          className="item2"
          onClick={() => setQuantity(data, true)}
        />
      </div>
      <span className="del" alt="error" onClick={() => triggerDelete(data)}>
        Delete
      </span>
    </div>
  );
};

ReviewOrderCard.propTypes = {
  data: PropTypes.object.isRequired,
  setQuantity: PropTypes.func.isRequired,
  triggerDelete: PropTypes.func.isRequired,
};
export default ReviewOrderCard;
