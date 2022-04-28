import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
class ShopLocation extends Component {
  render() {
    const { inputs } = this.props;
    const { description, link } = inputs;
    return (
      <div className="userlocation">
        <text>
          {description}{" "}
          <span
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {link}
          </span>
        </text>
      </div>
    );
  }
}

ShopLocation.propTypes = {
  inputs: PropTypes.object.isRequired,
};

export default ShopLocation;
