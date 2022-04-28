import React from "react";
import PropTypes from "prop-types";
import Trash from "../../assets/png/trash-2.png";
import "./MCProductCard.scss";
import minus from "../../assets/png/minus.png";
import plus from "../../assets/png/plus.png";
import separator from "../../utils/numberWithCommas";

const MCProductCard = (props) => {
  const { data, removeItem, setQuantity } = props;

  return (
    <div className="mcproduct-card" style={{ marginBottom: "20px" }}>
      <div className="mcimage">
        <img src={data.thumbnail} width="100px" height="150px" />
      </div>
      <div className="productname">
        <text>{data.name}</text>
      </div>
      <div className="instock">
        <text>{data.status ? "In Stock" : ""}</text>
      </div>
      <div className="properties">
        <div>
          <text>Color: {data.selectedColorVariant.variant_name}</text>
        </div>
        <div>
          <text>Size: {data.selectedSizeVariant.variant_name}</text>
        </div>
        {/* <text dangerouslySetInnerHTML={{ __html: data.description }}></text> */}
      </div>
      <div className="pricing">
        <text>
          <b>
            {"₹ "}
            {separator(data.price)}
          </b>
        </text>
      </div>
      <div className="deleteimg" onClick={() => removeItem(data)}>
        <img src={Trash} />
      </div>
      <div className="quantity">
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
    </div>
  );
};

MCProductCard.propTypes = {
  data: PropTypes.object.isRequired,
  setQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default MCProductCard;
