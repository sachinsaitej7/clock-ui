import React, { Component } from "react";
import "./style.scss";
import adCardImage from "../../assets/png/image-removebg-preview 1.png";
import { Link } from "react-router-dom";
class AdCard extends Component {
  render() {
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    ></meta>;
    return (
      <div className="reectangle">
        <img src={adCardImage} alt="error" className="image" />
        <pre className="sxlogan">
          Best Deal
          <br />
          on the
          <br />
          Top Brands
          <br />
          Near You
        </pre>
        <Link to="/product" style={{ textDecoration: "none" }}>
          <pre className="button"> Grab the Deal </pre>
        </Link>
      </div>
    );
  }
}

export default AdCard;
