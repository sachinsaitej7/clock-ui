import React, { Component } from "react";
import discountImage from "../../assets/svg/Icon/NotificationBar/Discount.svg";
import MoreDetailsPopup from "../Popups/MoreDetails/index";
import PropTypes from "prop-types";
import "./style.scss";
class NotificationBar extends Component {
  constructor(props) {
    super(props);
    this.state = { offerVisible: false };
  }
  render() {
    const { notificationBarData } = this.props;

    return (
      <div className="rectangle">
        <div>
          <div className="span">
            <div className="discImage">
              <img src={discountImage} alt="error" />
            </div>
            <text className="desc1">{notificationBarData}</text>
          </div>
          <div className="button">
            more details
          </div>
          {this.state.offerVisible ? (
            <>
              <MoreDetailsPopup triggerClose={this.showOffer} />
            </>
          ) : null}
        </div>
      </div>
    );
  }
  showOffer = () => {
    this.setState(
      (prevState) => 
      ({
      offerVisible: !prevState.offerVisible,
    })
    );
  };
}
NotificationBar.propTypes = {
  notificationBarData: PropTypes.object.isRequired,
};
export default NotificationBar;
