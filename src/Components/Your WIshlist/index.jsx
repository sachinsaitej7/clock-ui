import React, { Component } from "react";
import "./style.scss";

import productImage from "../../assets/png/Your Orders/productImage.png";


const orderContent =  [
    {
      productPic: productImage,
      productName: "MAX Stonewashed Slim Fit Denim Shirt",
      color: "Blue",
      size: "Small",
      storeName: "Max Lifestyle",
      price: "₹ 1,499.00",
      status : "inStock"
    },
    {
      productPic: productImage,
      productName: "MAX Stonewashed Regular Fit Denim Shirt",
      color: "Blue",
      size: "Extra Large",
      storeName: "Max Lifestyle",
      price: "₹ 1,499.00",
      status : "inStock"
    },
    {
      productPic: productImage,
      productName: "MAX Stonewashed Slim Fit Denim Shirt",
      color: "Blue",
      size: "Large",
      storeName: "Max Lifestyle",
      price: "₹ 1,499.00",
      status : "inStock"
    },
    {
      productPic: productImage,
      productName: "MAX Stonewashed Slim Fit Denim Shirt",
      color: "Blue",
      size: "Large",
      storeName: "Max Lifestyle",
      price: "₹ 1,499.00",
      status : "Out of Stock"
    },
  ];

class YourWishlist extends Component {
    render() {
        return (
            <>              
              
                {orderContent.map((product, Index) => (
              <div className="productDeetails" key={Index}>
                <div className="image">
                  <img src={product.productPic} alt="" />
                </div>
                <div className="notImage">
                  <div className="horizontalFlex">
                    <div className="productVerticalFlex">
                      <div className="productNameandPrice">
                      <text className="productName">
                        {product.productName}
                        <br />
                      </text>
                      <text className="price">{product.price}</text>
                      </div>
                      {product.status === "inStock"?<><text className="green">In Stock</text><br/></> : <><text className="red">Out of Stock</text><br/></>}
                      <text className="colorandSize">
                        <b>Colour: </b>
                        {product.color}
                        <br />
                      </text>
                      <text className="colorandSize">
                        <b>Size: </b>
                        {product.size}
                        <br />
                      </text>
                    </div>
                    
                  </div>
                  <div className="buttonsandStoreName">
                  <div className="buttons">
                    <text className="button">Move to Cart</text>
                     &nbsp;|&nbsp; 
                    <text className="button">Delete</text>
                    </div>
                    <text>
                      Product from{" "}
                      <text className="storeName">{product.storeName}</text>
                      </text>
                  </div>
                </div>
              </div>
            ))}
            
            </>

        );
    }
}

export default YourWishlist;