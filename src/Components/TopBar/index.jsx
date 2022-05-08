import React, { Component } from "react";
import "react-slidedown/lib/slidedown.css";
import { Link } from "react-router-dom";

import "./style.scss";
// import MegaMenu from "../MegaMenu/index";
import MiniCart from "../../pages/EmptyState/MiniCart/index";
import LoginPages from "../../pages/LoginPage";
import heart from "../../assets/svg/TopBar/heart.svg";
import search from "../../assets/svg/TopBar/search.svg";
import person from "../../assets/svg/TopBar/person.svg";
import shopping from "../../assets/svg/TopBar/shopping-cart.svg";
import logo from "../../assets/svg/TopBar/Logo-Full.svg";
import beta from "../../assets/svg/beta.svg";
import PropTypes from "prop-types";
import { ProductContext } from "../../context/ProductContext";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuActive: false,
      showMinicart: false,
      showWishlist: false,
      ActiveState: "HomePage",
    };
  }

  componentDidUpdate(prevProps) {
    const { setShowLoginPopup } = this.props;
    if (prevProps.user !== this.props.user && this.props.user) {
      this.setState({
        showLoginActive: false,
      });
      setShowLoginPopup(false);
    }
  }

  showMenu = () => {
    this.setState((prevState) => ({
      showMenuActive: !prevState.showMenuActive,
    }));
  };

  showOverlay = () => {
    this.setState((prevState) => ({
      showMinicart: !prevState.showMinicart,
    }));
  };

  handleLoginClick = () => {
    const { setShowLoginPopup } = this.props;
    const { showLoginActive } = this.state;
    setShowLoginPopup(!showLoginActive);
    this.setState((prevState) => {
      return {
        showLoginActive: !prevState.showLoginActive,
      };
    });
  };

  render() {
    const { user, showLoginPopup } = this.props;
    const { categories } = this.context;
    return (
      <div id="blur">
        <div className="topbar">
          <Link to="/">
            <div className="item-1">
              <img className="itemss-1" src={logo} alt="Error" />
              <img className="itemss-2" src={beta} alt="Error" />
            </div>
          </Link>
          <div className="item-2">
            {categories.map((category) => {
              return (
                <Link
                  to={"/product?category=" + category.id}
                  style={{ textDecoration: "none" }}
                >
                  <div className="items-1">{category.name}</div>
                </Link>
              );
            })}

            {/* {this.state.showMenuActive ? <MegaMenu /> : null} */}
            {/* <div className="items-2">Women</div> */}
            {/* <div className="items-3">Kids</div>
            <div className="items-4">Sale</div> */}
          </div>
          <div className="item-3">
            <img src={search} alt="Error" className="ite-1" />
            <Link to="/wishlist" style={{ textDecoration: "none" }}>
              <img
                src={heart}
                alt="Error"
                className="ite-2"
                onClick={this.showNavbarWishlist}
              />
            </Link>
            <img
              src={shopping}
              alt="Error"
              className="ite-3"
              onClick={this.showOverlay}
            />
            {user ? (
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <img src={person} alt="Error" className="ite-4" />
              </Link>
            ) : (
              <img
                src={person}
                alt="Error"
                className="ite-4"
                onClick={this.handleLoginClick}
              />
            )}
          </div>
        </div>
        <div className="topbarbottom"></div>
        {this.state.showMinicart ? (
          <MiniCart triggerMinicart={this.showOverlay} />
        ) : null}
        {this.state.showLoginActive || showLoginPopup ? (
          <LoginPages handleClose={this.handleLoginClick} />
        ) : null}
      </div>
    );
  }
}

TopBar.contextType = ProductContext;

TopBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  showLoginPopup: PropTypes.bool.isRequired,
  setShowLoginPopup: PropTypes.func.isRequired,
};

export default TopBar;
