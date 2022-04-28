import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";

class GreenButton extends Component {
  constructor(props) {
    super(props);
    this.state = { oldPage: false, newPage: false };
  }
  linkMenu = (event) => {
    console.log(event);
    this.setState((prevState) => ({
      newPage: !prevState.oldPage,
    }));
  };

  render() {
    const { Data, link } = this.props;
    const { text } = Data;
    return (
      <div>
        <button className="gbutton" onClick={this.linkMenu}>
          <text>{text}</text>
        </button>

        {this.state.newPage ? <div>{link}</div> : <div> </div>}
      </div>
    );
  }
}

export default GreenButton;

GreenButton.propTypes = {
  Data: PropTypes.object.isRequired,
  link: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

// constructor(props) {
//   super(props);
//   this.state = { showMoreActive: false, showMenuActive: false };
// }

// {this.state.showMenuActive?<MegaMenu/>:null}

// showMenu = (event) => {
//   console.log(event);
//   this.setState(prevState =>( { showMenuActive: !prevState.showMenuActive }));
// };

// opBar.propTypes = {
//   onClick : PropTypes.func.isRequired

// };
