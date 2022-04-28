import React, { Component } from "react";
import PropTypes from "prop-types";

import "./style.scss";

class DAFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelpActive: false,
    };
  }
  render() {
    return (
      <div className="DAfooter">
        <div className="first">
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Return Policy
          </span>{" "}
          |{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Privacy Policy{" "}
          </span>
          |{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Terms and Conditions{" "}
          </span>
        </div>
        <div className="nhelp">
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={this.props.triggerHelp}
          >
            Need Help?
          </span>
        </div>
      </div>
    );
  }
}

DAFooter.propTypes = {
  triggerHelp: PropTypes.func.isRequired,
};

export default DAFooter;
