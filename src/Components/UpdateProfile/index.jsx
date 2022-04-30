import React, { Component } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../AuthContext";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourProfile: {
        // fullName: user.name,
        // phoneNumber: user.phone_number,
        // emailId: user.email_id,
        // id: user.id,
      },
    };
  }

    componentWillMount() { }
    componentDidMount() { 
        const { user } = this.context;

        this.setState({
          yourProfile: {
            fullName: user.name,
            phoneNumber: user.phone_number,
            emailId: user.email_id,
            id: user.id,
          },
        });
    }

    handleButtonClicked() {
        const { yourProfile } = this.state;
        const { updateUserProfile } = this.context;
        updateUserProfile(yourProfile.fullName, yourProfile.emailId);
     }

  render() {
    const { yourProfile } = this.state;
    return (
      <>
        <div className="navbar">
          <div className="header">
            <div className="text">Your Profile</div>
          </div>
          <div className="line"></div>
        </div>
        <div>
          <form className="contactUsForm">
            <div className="inputLabelSet">
              <label className="label">
                Full Name
                <br />
                <input
                  type="text"
                  name="fullName"
                  className="field"
                  value={yourProfile.fullName}
                  onChange={(e) => {
                    this.setState({
                      yourProfile: { ...yourProfile, fullName: e.target.value },
                    });
                  }}
                />
              </label>
            </div>
            <div className="inputLabelSet">
              <label className="label">
                Phone Number
                <br />
                <input
                  type="text"
                  name="phoneNum"
                  className="field"
                  value={yourProfile.phoneNumber}
                  readOnly
                />
              </label>
            </div>
            <div className="inputLabelSet">
              <label className="label">
                Email Address
                <br />
                <input
                  type="text"
                  name="emailId"
                  className="field"
                  value={yourProfile.emailId}
                  onChange={(e) => {
                    this.setState({
                      yourProfile: { ...yourProfile, emailId: e.target.value },
                    });
                  }}
                />
              </label>
            </div>
            {/* <p className="selectName">Gender</p>
            <div className="customSelect">
              <select
                className="styledSelect"
                value={yourProfile.gender}
                onChange={(e) => {this.setState({})}}
              >
                <option>choose</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
              </select>
            </div> */}
          </form>
          <button
            className="updateButton"
            onClick={this.handleButtonClicked.bind(this)}
          >
            update changes
          </button>
        </div>
      </>
    );
  }
}

UpdateProfile.propTypes = {};
UpdateProfile.contextType = AuthContext;

export default UpdateProfile;
