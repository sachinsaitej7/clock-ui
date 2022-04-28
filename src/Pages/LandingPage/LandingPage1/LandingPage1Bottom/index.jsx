import React from "react";
import "./style.scss";
import PropTypes from "prop-types";
import ProductCard from "../../../components/ProductCard";
import ProductImage from "../../../assets/png/image 29.png";
import CategoryCard from "../../../components/CategoryCard";
import Footer from "../../../components/Footer";

const LP1Bottom = () => {
  const CategoryCardData = [
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
    {
      imageUrl: ProductImage,
      title: "Shirts",
    },
  ];

  const ProductCardData = [
    {
      id: 0,
      imageUrl: ProductImage,
      tagData: {
        name: "NEW",
      },
      likeData: {
        isVisible: true,
      },
      title: "Domyos by Decatholon",
      description: "Men Regular Fit Sports Shorts",
      mrp: "1999",
      price: "999",
      discount: "50",
    },
    {
      id: 1,
      imageUrl: ProductImage,
      tagData: {
        name: "NEW",
      },
      likeData: {
        isVisible: true,
      },
      title: "Domyos by Decatholon",
      description: "Men Regular Fit Sports Shorts",
      mrp: "1999",
      price: "999",
      discount: "50",
    },
    {
      id: 2,
      imageUrl: ProductImage,
      tagData: {
        name: "NEW",
      },
      likeData: {
        isVisible: true,
      },
      title: "Domyos by Decatholon",
      description: "Men Regular Fit Sports Shorts",
      mrp: "1999",
      price: "999",
      discount: "50",
    },
    {
      id: 3,
      imageUrl: ProductImage,
      tagData: {
        name: "NEW",
      },
      likeData: {
        isVisible: true,
      },
      title: "Domyos by Decatholon",
      description: "Men Regular Fit Sports Shorts",
      mrp: "1999",
      price: "999",
      discount: "50",
    },
    {
      id: 4,
      imageUrl: ProductImage,
      tagData: {
        name: "NEW",
      },
      likeData: {
        isVisible: true,
      },
      title: "Domyos by Decatholon",
      description: "Men Regular Fit Sports Shorts",
      mrp: "1999",
      price: "999",
      discount: "50",
    },
    {
      id: 5,
      imageUrl: ProductImage,
      tagData: {
        name: "NEW",
      },
      likeData: {
        isVisible: true,
      },
      title: "Domyos by Decatholon",
      description: "Men Regular Fit Sports Shorts",
      mrp: "1999",
      price: "999",
      discount: "50",
    },
    {
      id: 6,
      imageUrl: ProductImage,
      tagData: {
        name: "NEW",
      },
      likeData: {
        isVisible: true,
      },
      title: "Domyos by Decatholon",
      description: "Men Regular Fit Sports Shorts",
      mrp: "1999",
      price: "999",
      discount: "50",
    },
    {
      id: 7,
      imageUrl: ProductImage,
      tagData: {
        name: "NEW",
      },
      likeData: {
        isVisible: true,
      },
      title: "Domyos by Decatholon",
      description: "Men Regular Fit Sports Shorts",
      mrp: "1999",
      price: "999",
      discount: "50",
    },
    {
      id: 8,
      imageUrl: ProductImage,
      tagData: {
        name: "NEW",
      },
      likeData: {
        isVisible: true,
      },
      title: "Domyos by Decatholon",
      description: "Men Regular Fit Sports Shorts",
      mrp: "1999",
      price: "999",
      discount: "50",
    },
    {
      id: 9,
      imageUrl: ProductImage,
      tagData: {
        name: "NEW",
      },
      likeData: {
        isVisible: true,
      },
      title: "Domyos by Decatholon",
      description: "Men Regular Fit Sports Shorts",
      mrp: "1999",
      price: "999",
      discount: "50",
    },
  ];

  return (
    <div className="BottomLP1">
      <div className="txt1"> Popular Picks For You</div>

      <div className="PCclass">
        {" "}
        {ProductCardData.map((cardData, index) => (
          <ProductCard key={index} Data={cardData} />
        ))}
      </div>

      <div className="txt2">
        {" "}
        Categories to Bag in <span style={{ color: "red" }}> VR MAll </span>
      </div>
      <div className="rectangle">
        {CategoryCardData.map((cardData, index) => (
          <CategoryCard key={index} Data={cardData} />
        ))}{" "}
      </div>
      <div className="Bottom">
        <Footer />
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

export default LP1Bottom;
