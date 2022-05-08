import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EmptyCartImage from "../../../assets/png/EmptyStates/Cart.png";
import CloseButtonImage from "../../../assets/png/EmptyStates/Close.png";
// import MyCart from "../MyCart";
import MyCart from "../../../Components/MyCart";
import { CartContext } from "../../../context/CartContext";
import Backdrop from "@mui/material/Backdrop";

class Minicart extends Component {
  render() {
    const { items } = this.context;

    return (
      // <MyCart/>
      <Backdrop
        sx={{
          opacity: 1,
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        {/* <div className="wholePage"> */}
        <div className="miniCart">
          <div className="blackRectangle">
            <text className="text1">My Cart</text>
            <img
              src={CloseButtonImage}
              alt="error"
              className="xButton"
              onClick={this.props.triggerMinicart}
            />
          </div>
          {items.length > 0 ? (
            <MyCart closeCart={this.props.triggerMinicart}/>
          ) : (
            <>
              <div className="emptyImage">
                <img src={EmptyCartImage} alt="error" className="Image" />
              </div>
              <div className="text2">
                <p>Your shopping cart is Empty</p>
              </div>
              <div onClick={this.props.triggerMinicart}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div className="button">
                    <div className="rectangle">
                      <text className="buttonText">Continue Shopping</text>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
        {/* </div> */}
      </Backdrop>
    );
  }
}
Minicart.propTypes = {
  triggerMinicart: PropTypes.func,
};

Minicart.contextType = CartContext;
export default Minicart;
