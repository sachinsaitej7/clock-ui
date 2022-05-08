import React, { useEffect, useState, useContext } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import ProductCard from "../../../../Components/ProductCard";
// import ProductImage from "../../../../assets/png/image 29.png";
import CategoryCard from "../../../../Components/CategoryCard";
import { ProductContext } from "../../../../Contexts/ProductContext";

const LP2Bottom = () => {
  const [products, setProducts] = useState([]);
  const { categories } = useContext(ProductContext);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      let res = await fetch("https://clockapi.theclock.xyz/product/");
      let data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="BottomLP2">
      <div className="txt1"> Popular Picks For You</div>

      <div className="PCclass">
        {" "}
        {products.map((cardData) => (
          <ProductCard key={cardData.id} Data={cardData} />
        ))}
      </div>

      <div className="txt2">
        {" "}
        Categories to Bag in{" "}
        <span style={{ color: "red" }}> Forum Mall </span>
      </div>
      <div className="rectangle">
        {categories.map((category) => (
          <CategoryCard key={category.id} Data={category} />
        ))}{" "}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  Data: PropTypes.object.isRequired,
};

CategoryCard.propTypes = {
  Data: PropTypes.object.isRequired,
};

export default LP2Bottom;
