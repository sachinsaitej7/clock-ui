import React, { useEffect, useState } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import ProductCard from "../../../../Components/ProductCard";
// import ProductImage from "../../../../assets/png/image 29.png";
import CategoryCard from "../../../../Components/CategoryCard";

const LP2Bottom = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      let res = await fetch("https://clockapi.theclock.xyz/category/");
      let data = await res.json();
      if (data.success) setCategories(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchProducts = async () => {
    try {
      let res = await fetch("https://clockapi.theclock.xyz/product/");
      let data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  // const CategoryCardData = [
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  //   {
  //     imageUrl: ProductImage,
  //     title: "Shirts",
  //   },
  // ];

  // const ProductCardData = [
  //   {
  //     id: 0,
  //     imageUrl: ProductImage,
  //     tagData: {
  //       name: "NEW",
  //     },
  //     likeData: {
  //       isVisible: true,
  //     },
  //     title: "Domyos by Decatholon",
  //     description: "Men Regular Fit Sports Shorts",
  //     mrp: "1999",
  //     price: "999",
  //     discount: "50",
  //   },
  //   {
  //     id: 1,
  //     imageUrl: ProductImage,
  //     tagData: {
  //       name: "NEW",
  //     },
  //     likeData: {
  //       isVisible: true,
  //     },
  //     title: "Domyos by Decatholon",
  //     description: "Men Regular Fit Sports Shorts",
  //     mrp: "1999",
  //     price: "999",
  //     discount: "50",
  //   },
  //   {
  //     id: 2,
  //     imageUrl: ProductImage,
  //     tagData: {
  //       name: "NEW",
  //     },
  //     likeData: {
  //       isVisible: true,
  //     },
  //     title: "Domyos by Decatholon",
  //     description: "Men Regular Fit Sports Shorts",
  //     mrp: "1999",
  //     price: "999",
  //     discount: "50",
  //   },
  //   {
  //     id: 3,
  //     imageUrl: ProductImage,
  //     tagData: {
  //       name: "NEW",
  //     },
  //     likeData: {
  //       isVisible: true,
  //     },
  //     title: "Domyos by Decatholon",
  //     description: "Men Regular Fit Sports Shorts",
  //     mrp: "1999",
  //     price: "999",
  //     discount: "50",
  //   },
  //   {
  //     id: 4,
  //     imageUrl: ProductImage,
  //     tagData: {
  //       name: "NEW",
  //     },
  //     likeData: {
  //       isVisible: true,
  //     },
  //     title: "Domyos by Decatholon",
  //     description: "Men Regular Fit Sports Shorts",
  //     mrp: "1999",
  //     price: "999",
  //     discount: "50",
  //   },
  //   {
  //     id: 5,
  //     imageUrl: ProductImage,
  //     tagData: {
  //       name: "NEW",
  //     },
  //     likeData: {
  //       isVisible: true,
  //     },
  //     title: "Domyos by Decatholon",
  //     description: "Men Regular Fit Sports Shorts",
  //     mrp: "1999",
  //     price: "999",
  //     discount: "50",
  //   },
  //   {
  //     id: 6,
  //     imageUrl: ProductImage,
  //     tagData: {
  //       name: "NEW",
  //     },
  //     likeData: {
  //       isVisible: true,
  //     },
  //     title: "Domyos by Decatholon",
  //     description: "Men Regular Fit Sports Shorts",
  //     mrp: "1999",
  //     price: "999",
  //     discount: "50",
  //   },
  //   {
  //     id: 7,
  //     imageUrl: ProductImage,
  //     tagData: {
  //       name: "NEW",
  //     },
  //     likeData: {
  //       isVisible: true,
  //     },
  //     title: "Domyos by Decatholon",
  //     description: "Men Regular Fit Sports Shorts",
  //     mrp: "1999",
  //     price: "999",
  //     discount: "50",
  //   },
  //   {
  //     id: 8,
  //     imageUrl: ProductImage,
  //     tagData: {
  //       name: "NEW",
  //     },
  //     likeData: {
  //       isVisible: true,
  //     },
  //     title: "Domyos by Decatholon",
  //     description: "Men Regular Fit Sports Shorts",
  //     mrp: "1999",
  //     price: "999",
  //     discount: "50",
  //   },
  //   {
  //     id: 9,
  //     imageUrl: ProductImage,
  //     tagData: {
  //       name: "NEW",
  //     },
  //     likeData: {
  //       isVisible: true,
  //     },
  //     title: "Domyos by Decatholon",
  //     description: "Men Regular Fit Sports Shorts",
  //     mrp: "1999",
  //     price: "999",
  //     discount: "50",
  //   },
  // ];

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
        <span style={{ color: "red" }}> Near By Mall </span>
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
