import React, { Component } from "react";
import Top from "../LandingPage1/LandingPage1Top/index";
import LP2Bottom from "../LandingPage2/LandingPage2Bottom/index";

class LandingPageHome extends Component {
  render() {
    return (
      <div className="landingPageHome">
        <Top />
        <LP2Bottom />
      </div>
    );
  }
}

export default LandingPageHome;
