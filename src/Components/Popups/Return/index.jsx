import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";

class ReturnItemPopup extends Component {
  render() {
    return (
      <div className="returnItemsPopup">
        <div className="popupBox">
          <div className="headerSpan">
            <div className="headerText">Return</div>
            <div className="closeButton" onClick={this.props.triggerClose}>
              &times;
            </div>
          </div>
          <div className="body">
            Please visit nearby Max Lifestyle store to return the product
          </div>
        </div>
      </div>
    );
  }
}
ReturnItemPopup.propTypes = {
  triggerClose: PropTypes.func.isRequired,
};
export default ReturnItemPopup;
