import React, { Component } from "react";
import "./style.scss";
import QuestionMark from "../../assets/png/question-mark-circle.png";
import PropTypes from "prop-types";
class UserLocation extends Component {
  render() {
    const { userLocationData } = this.props;
    const { description, link } = userLocationData;
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
        <img src={QuestionMark} className="qmark" />
      </div>
    );
  }
}

UserLocation.propTypes = {
  userLocationData: PropTypes.object.isRequired,
};

export default UserLocation;
