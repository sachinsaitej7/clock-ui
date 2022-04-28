import React, { Component } from "react";

import "./style.scss";
import Logo from "../../assets/png/Logo Full (GBG).png";
import Seperator from "../../assets/png/separator.png";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <img className="img01" src={Seperator} />

        <div className="belowsep">
          <div className="firstali">
            <img className="img02" src={Logo} />

            <text className="lin">
              Clock sets the stage for retail fashion stores to showcase their
              inventory to people searching for it nearby.
            </text>
          </div>
          <div>
            <div className="row">
              <div className="col1">
                <div className="titcol1">
                  <text>Discovery</text>
                </div>
                <div className="item1">
                  <li>Men</li>
                  <li>Women</li>
                  <li>Kids</li>
                </div>
              </div>
              <div className="col2">
                <div className="titcol2">
                  <text>About</text>
                </div>
                <div className="item2">
                  <li>Help</li>
                  <li>Shipping</li>
                  <li>Malls</li>
                </div>
              </div>
              <div className="col3">
                <div className="titcol3">
                  <text>Info</text>
                </div>
                <div className="item3">
                  <li>Contact Us</li>
                  <li>Privacy Policies</li>
                  <li>Return Policies</li>
                  <li>Terms & Conditions</li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
