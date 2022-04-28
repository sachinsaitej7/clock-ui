import React, { Component } from "react";
import "./style.scss";
import ArrowDown from "../../assets/png/arrow-ios-down.png";
import PropTypes from "prop-types";
class Showmore extends Component {
  render() {
    return (
      <div className="scard" onClick={this.props.onClick}>
        <div className="spann">
          <p className="item-1">Show more</p>
          <div className="item-2">
            <img src={ArrowDown} />
          </div>
        </div>
      </div>
    );
  }
}
Showmore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Showmore;
