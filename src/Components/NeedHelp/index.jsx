import React, { Component } from "react";
import DAFooter from "../Delivery Adress Footer";
import Help from "../../../pages/Other_Pages/Help";

class NeedHelpControl extends Component {
  constructor(props) {
    super(props);
    this.state = { activeState: "NoHelp" };
  }
  render() {
    return (
      <div>
        {this.state.activeState === "Help" ? <Help /> : null}
        {this.state.activeState === "NoHelp" ? (
          <DAFooter triggerHelp={this.changeStatetoHelp} />
        ) : null}
      </div>
    );
  }

  changeStatetoHelp = () => {
    this.setState({ activeState: "Help" });
  };
}

export default NeedHelpControl;

// import React,{Component} from "react";
// import Modal from "react-responsive-modal";
// import "./style.scss";
// import PropTypes from "prop-types";

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         showModal: true
//     };
// }

//   render() {

//     const showModal=this.state;
//   return (
//     <Modal  open={showModal}

//   >
//     <div className="login">

//       <text className="txt1"> Login</text>
//     <div><text className="txt2">  Complete the below details to create your account</text></div>
//     <form>
//       <div className="inputing"><label>Mobile Number or Email</label> <div> <input type="text" placeholder="Enter your Mobile number" /></div></div>
//       <div className="inputing"><label>Password</label> <div> <input type="text" placeholder="Enter your Password"/></div> </div>
//     </form>
//       <div className="fptxt"  onClick={this.props.triggerReset} >Forgot Password?</div>
//       <button className="gbutton">
//           <text>Login</text>
//         </button>
//       <div><text className="txt3" style={{color:"red"}}>Need Help?</text></div>

//     </div>
//     </Modal>
//   );
// }
// }

// Login.propTypes = {
//   triggerReset : PropTypes.func.isRequired,
//   triggerLogin : PropTypes.func.isRequired,

// };
