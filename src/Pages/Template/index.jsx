import React, { Component } from "react";
import PropTypes from "prop-types";
import TopBar from "../../Components/TopBar/index";
import Footer from "../../Components/Footer/index";
import { AuthContext } from "../../AuthContext";

class Template extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, showLoginPopup, setShowLoginPopup } = this.context;
    return (
      <div style={{width: "100%", maxWidth: "1600px", margin:"0 auto"}}>
        <TopBar user={user} showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

Template.propTypes = {
  children: PropTypes.any,
};

Template.contextType = AuthContext;

export default Template;
