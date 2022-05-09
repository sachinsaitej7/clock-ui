import React, { Component } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import ProductCard from "../../../Components/ProductCard/index";
import PropTypes from "prop-types";
import emptyStateImage from "../../../assets/png/EmptyStates/Cart.png";
import { CartContext } from "../../../Contexts/CartContext";
import withRouter from "../../../Hoc/WithRouter";

import CartSummary from "../../../Components/CartSummary/CartSummary";

class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }
  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      let res = await fetch("https://clockapi.theclock.xyz/product/");
      let data = await res.json();
      if (data.success) this.setState({ products: data.data });
    } catch (err) {
      console.log(err.message);
    }
  };

  handleClick = () => { 
    console.log("clicked");
    const { navigate } = this.props;
    navigate("/address");
  };

  renderCartItems = () => {
    const { items = [], removeItem, changeQuantity } = this.context;

    return (
      <CartSummary
        items={items}
        setQuantity={changeQuantity}
        triggerDelete={removeItem}
        onClick={this.handleClick}
        renderHeader={() => <div className="cart-header" style={{paddingLeft: "24px"}}>
          <p>{`${items.length} items from Forum mall`}</p>
        </div>}
      />
    );
  };

  render() {
    const { items = [] } = this.context;
    const { products } = this.state;

    const A = (
      <div className="PCclass">
        {" "}
        {products.map((cardData) => (
          <ProductCard key={cardData.id} Data={cardData} />
        ))}
      </div>
    );
    return (
      <div className="templateDiv">
        {items.length === 0 ? (
          <>
            <div className="emptyImage">
              <img src={emptyStateImage} alt="error" className="Image" />
            </div>
            <div className="text">You&apos;ll also love</div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="button">
                <div className="rectangle">
                  <text className="buttonText">Continue Shopping</text>
                </div>
              </div>
            </Link>
            {A}
          </>
        ) : (
          this.renderCartItems()
        )}
      </div>
    );
  }
}

MyCart.contextType = CartContext;
MyCart.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default withRouter(MyCart);
