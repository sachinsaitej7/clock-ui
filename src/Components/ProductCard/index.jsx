import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import "./style.scss";
import LikeImage from "../../assets/png/like-heart.png";
import LikeActiveImage from "../../assets/png/like-heart-filled.png";
import { Link } from "react-router-dom";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      isLiked: !prevState.isLiked,
    }));
  };

  render() {
    const { Data } = this.props;
    const {
      id,
      thumbnail: Image,
      name: title,
      description,
      discount = 10,
      tagData,
      likeData,
      price_head = [],
    } = Data;
    let { mrp, price } = Data;
    const { isLiked } = this.state;
    if (!mrp && !price) {
      const { sale_price, regular_price } = price_head[0] || {};
      price = sale_price;
      mrp = regular_price;
    }

    return (
      <div id={id} className="product-card" style={{ margin: "1%" }}>
        <Link to={`/product/${id}`}>
          <div className="product-card-header">
            <img src={Image} className="img1" />
            {!isEmpty(tagData) && <div className="tag">{tagData.name}</div>}
            {!isEmpty(likeData) && (
              <div className="like-image">
                <img
                  onClick={this.handleClick}
                  src={isLiked ? LikeActiveImage : LikeImage}
                />
              </div>
            )}
          </div>
          <div className="product-card-body">
            <h4>{title}</h4>
            <div
              className="product-card-description"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <div className="pricing">
              <div className="show">
                <span id="price">{`₹ ${price || 0}`}</span>
                <span id="strike">{`₹ ${mrp || 0}`}</span>
                <span id="percent">{`(${discount}% off)`}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

ProductCard.propTypes = {
  Data: PropTypes.object.isRequired,
};

export default ProductCard;
