import React, {useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import TopBar from "../../Components/TopBar/index";
import Footer from "../../Components/Footer/index";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import axios from "axios";

const Template = (props) => {
  const [ categories, setCategories ] = useState([]);
  const { user, showLoginPopup, setShowLoginPopup } = useContext(AuthContext);
  const { items } = useContext(CartContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      let res = await axios.get("https://clockapi.theclock.xyz/category/");
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        categories: categories,
        setCategories: setCategories,
      }}
    >
      <div style={{ width: "100%", maxWidth: "1600px", margin: "0 auto" }}>
        <TopBar
          user={user}
          showLoginPopup={showLoginPopup}
          setShowLoginPopup={setShowLoginPopup}
          itemsCount={items.length}
        />
        {props.children}
        <Footer />
      </div>
    </ProductContext.Provider>
  );
};

Template.propTypes = {
  children: PropTypes.any,
};

export default Template;
