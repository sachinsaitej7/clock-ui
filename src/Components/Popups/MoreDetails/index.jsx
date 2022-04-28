import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
class MoreDetailsPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { storesVisible: false };
  }
  render() {
    return (
      <div className="moredetPopup">
        <div className="card">
          <div className="headerbar">
            <div className="header">How to avail the offer</div>
            <div className="closeButton" onClick={this.props.triggerClose}>
              &times;
            </div>
          </div>
          <div className="line"></div>
          <div className="body1">
            <text>
              1. Purchase your products on the mentioned store below
              <br />
            </text>
            <text>
              2. Scan the Clock’s QR code in the billing Counter
              <br />
            </text>
            <text>
              3. A webpage will open contains the Coupon code
              <br />
            </text>
            <text>
              4. Share that code when billing
              <br />
            </text>
            <text>
              5. 6% discount will be added to your billing
              <br />
            </text>
          </div>
          <div className="line"></div>
          <button className="dropdown" onClick={this.revealStores}>
            Stores
          </button>
          {this.state.storesVisible ? (
            <div className="body2">
              <text>
                1. Adidas
                <br />
              </text>
              <text>
                2. Puma
                <br />
              </text>
              <text>
                3. Max Lifestyle
                <br />
              </text>
              <text>
                4. Allen solly
                <br />
              </text>
              <text>
                5. Basics
                <br />
              </text>
              <text>
                6. Nike
                <br />
              </text>
              <text>
                7. Peter England
                <br />
              </text>
              <text>
                8. Trends
                <br />
              </text>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  revealStores = () => {
    this.setState((prevState) => ({
      storesVisible: !prevState.storesVisible,
    }));
  };
}
MoreDetailsPopup.propTypes = {
  triggerClose: PropTypes.func.isRequired,
};
export default MoreDetailsPopup;
