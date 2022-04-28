import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
class Links extends Component {
  render() {
    const { Data } = this.props;
    const { description, link } = Data;
    return (
      <div className="userlocation">
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
      </div>
    );
  }
}

Links.propTypes = {
  Data: PropTypes.object.isRequired,
};

export default Links;
