import React, { Component } from "react";
import PropTypes from "prop-types";
import TopBar from "../../Components/TopBar/index";
import Footer from "../../Components/Footer/index";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";
import axios from "axios";

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  setCategories = (categories) => {
    this.setState({
      categories,
    });
  };

  fetchCategories = async () => {
    try {
      let res = await axios.get("https://clockapi.theclock.xyz/category/");
      if (res.data.success) {
        this.setCategories(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { user, showLoginPopup, setShowLoginPopup } = this.context;
    return (
      <ProductContext.Provider
        value={{
          categories: this.state.categories,
          setCategories: this.setCategories,
        }}
      >
        <div style={{ width: "100%", maxWidth: "1600px", margin: "0 auto" }}>
          <TopBar
            user={user}
            showLoginPopup={showLoginPopup}
            setShowLoginPopup={setShowLoginPopup}
          />
          {this.props.children}
          <Footer />
        </div>
      </ProductContext.Provider>
    );
  }
}

Template.propTypes = {
  children: PropTypes.any,
};

Template.contextType = AuthContext;

export default Template;
