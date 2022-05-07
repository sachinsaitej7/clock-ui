import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";

import shoppingCart from "../../assets/png/AddtoCartButton/shopping-cart.png";
import Plane from "../../assets/png/ProductPage/Plane.png";
import heartLiked from "../../assets/png/ProductPage/Mask.png";
import heart from "../../assets/png/ProductPage/heart.png";
// import colorImage from "../../assets/png/ProductPage/productColours.png";
// import locationImage from "../../assets/png/ProductPage/locationImage.png";
// const coloursAvailable = [
//   { image: colorImage, value: "red", isActive: false },
//   { image: colorImage, value: "blue", isActive: false },
//   { image: colorImage, value: "green", isActive: false },
// ];

// const sizesAvailable = [
//   { size: "XS", isAvailable: true, isActive: false },
//   { size: "S", isAvailable: true, isActive: false },
//   { size: "M", isAvailable: true, isActive: false },
//   { size: "L", isAvailable: true, isActive: false },
//   { size: "XL", isAvailable: true, isActive: true },
//   { size: "XXL", isAvailable: false, isActive: true },
// ];

import withRouter from "../../Hoc/WithRouter";
import OverlayLoader from "../../Components/OverlayLoader";
import { CartContext } from "../../CartContext";
import { toast } from "react-toastify";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: {},
      selectedColorVariant: {},
      selectedSizeVariant: {},
      loading: false,
      offersAvailable: [
        "Get 6% discount on in-store purchase",
        "Get additional 5% discount on HDFC Cards",
      ],
      deliveryDetails: {
        currentDeliveryAddress: "Venkateshwara street, Vadapalani, Chennai",
        deliveryType: "Free Delivery within a day",
      },
      availableLocations: [
        {
          storeName: "Max Lifestyle",
          mallName: "",
          location: "Porur",
          distance: "2.6",
        },
        {
          storeName: "Max Lifestyle",
          mallName: "",
          location: "Virugampakkam",
          distance: "2.6",
        },
        {
          storeName: "Max Lifestyle",
          mallName: "Forum Mall",
          location: "Vadapalani",
          distance: "2.4",
        },
      ],
    };
  }

  setSizeasActive = (variant) => {
    this.setState({
      selectedSizeVariant: { ...variant },
    });
  };

  setColourasActive = (variant) => {
    this.setState({
      selectedColorVariant: { ...variant },
    });
  };

  likeProduct = () => {
    this.setState((prevstate) => ({
      productLiked: !prevstate.productLiked,
    }));
  };

  componentDidMount() {
    const { params } = this.props;
    if (params.productId) this.fetchProduct(params.productId);
  }

  fetchProduct = async (id) => {
    try {
      this.setState({ loading: true });
      let res = await fetch(
        `https://clockapi.theclock.xyz/product/?product_id=${id}`
      );
      let data = await res.json();
      if (data.success) {
        const productData = data.data[0];
        const {
          product_images = [],
          price_head = [],
          attribute_types = [],
        } = productData;
        const colorVariant =
          attribute_types.find(
            (variant) => variant.variant_type_name === "Colour"
          ) || {};
        const sizeVariant =
          attribute_types.find((variant) =>
            variant.variant_type_name.includes("Size")
          ) || {};
        this.setState({
          productData,
          productImages: product_images,
          colorVariant: colorVariant,
          sizeVariant: sizeVariant,
          priceData: price_head,
          selectedColorVariant:
            (colorVariant.variant && colorVariant.variant[0]) || {},
          selectedSizeVariant:
            (sizeVariant.variant && sizeVariant.variant[0]) || {},
          loading: false,
        });
        return;
      }
      this.setState({ loading: false });
    } catch (err) {
      console.log(err.message);
      this.setState({ loading: false });
    }
  };

  addToCart = () => {
    const { addItem } = this.context;
    const { productData, selectedColorVariant, selectedSizeVariant } =
      this.state;
    const { mrp, discount, price } = this.generatePrice();

    if (!this.checkItemInCart()) {
      addItem({
        ...productData,
        selectedColorVariant,
        selectedSizeVariant,
        mrp,
        discount,
        price,
        quantity: 1,
      });
      toast.success("Item added to cart");
    } else {
      toast.error("Item already in cart");
    }
  };

  checkItemInCart = () => {
    const { items } = this.context;
    const { productData, selectedColorVariant, selectedSizeVariant } =
      this.state;
    return items.find((item) => {
      return (
        item.id === productData.id &&
        (!selectedColorVariant.variant_id ||
          item.selectedColorVariant.variant_id ===
            selectedColorVariant.variant_id) &&
        (!selectedSizeVariant.variant_id ||
          item.selectedSizeVariant.variant_id ===
            selectedSizeVariant.variant_id)
      );
    });

    // return items.find((item) => isEqual(item, {})
  };

  generatePrice = () => {
    const {
      selectedColorVariant = {},
      selectedSizeVariant = {},
      priceData = [],
    } = this.state;
    // let currentPrice = null,
    //   mrp = null,
    //   discount = null;
    return priceData.reduce((acc, variant) => {
      if (
        (!selectedColorVariant.variant_id ||
          variant.price_line.find(
            (item) => item.variant_id === selectedColorVariant.variant_id
          )) &&
        (!selectedSizeVariant.variant_id ||
          variant.price_line.find(
            (item) => item.variant_id === selectedSizeVariant.variant_id
          ))
      ) {
        return {
          price: Number(variant.sale_price),
          mrp: Number(variant.regular_price),
          discount: 0,
        };
      }
      return acc;
    }, {});
  };

  render() {
    const {
      deliveryDetails,
      availableLocations,
      productLiked = false,
      productData,
      productImages = [],
      sizeVariant,
      colorVariant,
      selectedSizeVariant,
      selectedColorVariant,
      loading,
    } = this.state;

    if (loading) return <OverlayLoader />;
    const { brand = {}, name = "" } = productData;
    const { mrp, discount, price } = this.generatePrice();
    return (
      <div className="productPage">
        <div className="mainPart row">
          <div className="column1">
            {productImages.map((productImage) => (
              <img
                src={productImage.image}
                alt="error1"
                key={productImage.id}
              />
            ))}
          </div>
          <div className=" column2">
            <div className="storeDetails">
              <div className="storeName">{brand.name}</div>
              <div className="mallName">Chennai</div>
            </div>

            <div className="product">
              <div className="productName">{name}</div>
              {price ? (
                <div className="priceDetails">
                  <div className="currentPrice">&#8377;{price}</div>
                  <div className="originalPrice">
                    <del>&#8377;{mrp}</del>
                  </div>
                  <div className="offer">{discount}%&nbsp;off</div>
                  <div className="read">Inclusive of all taxes</div>
                </div>
              ) : (
                <div className="priceDetails">Unavailable</div>
              )}
            </div>

            <div className="offers">
              <div className="title">Offers:</div>
              <div className="offersAvailable">
                Get 6% discount on in-store purchase
              </div>
              <div className="offersAvailable">
                Get additional 5% discount on HDFC Cards
              </div>
            </div>
            <div className="sizes">
              <div className="header">
                <div className="titleName">Select Size:</div>
                <div className="guide">size guide</div>
              </div>
              <div className="sizesAvailable">
                {sizeVariant?.variant &&
                  sizeVariant?.variant.map((variant) => (
                    <div
                      className={
                        variant.variant_id === selectedSizeVariant.variant_id
                          ? "activeBox"
                          : "box"
                      }
                      key={variant.variant_id}
                      onClick={() => this.setSizeasActive(variant)}
                    >
                      <div className="size">{variant.variant_name}</div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="colours">
              <div className="title">
                Select Colour : <b>{selectedColorVariant.variant_name}</b>
              </div>
              <div className="coloursAvailable">
                {colorVariant?.variant &&
                  colorVariant?.variant.map((color) => (
                    <div
                      className={
                        color.variant_id === selectedColorVariant.variant_id
                          ? "activeBox"
                          : "box"
                      }
                      key={color.variant_id}
                      onClick={() => this.setColourasActive(color)}
                    >
                      {color.image ? (
                        <img src={color.image} alt="" />
                      ) : (
                        <span>{color.variant_name}</span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="deliveryDetails">
              <div className="title">
                Selected delivery location : <text>Change</text>
              </div>
              <div className="location">
                {deliveryDetails.currentDeliveryAddress}
              </div>
              <div className="deliveryType">{deliveryDetails.deliveryType}</div>
            </div>
            <div className="buttons">
              <button className="addtoCart" onClick={() => this.addToCart()}>
                <img src={shoppingCart} className="image" />
                Add to Cart
              </button>
              <div className="box">
                <img
                  src={productLiked ? heartLiked : heart}
                  alt=""
                  className={productLiked ? "likedSize" : "size"}
                  onClick={this.likeProduct}
                />
              </div>
            </div>
            <div className="availableLocations">
              <div className="title">
                This product is available near you at:
              </div>

              {availableLocations.map((divData, index) => (
                <div className="stores" key={index}>
                  <div className="storeName">
                    {divData.storeName}, {divData.mallName}, {divData.location}
                  </div>
                  <div>
                    <img src={Plane} alt="" className="image" />
                    <div className="distance">{divData.distance}&nbsp;Kms</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="line" />
            <div className="productDetails">
              <div className="title">Brand Details :</div>
              <div className="desc">{brand.description}</div>
            </div>
            {/* {this.state.productDetailsList.map((productDetailsList, index) => (
              <div className="productDetails" key={index}>
                <div className="title">Product Details :</div>
                <div className="desc">{productDetailsList.description}</div>
                <div className="detailsList">
                  <ul>
                    <li>Design : {productDetailsList.design} </li>
                    <li>Neckline : {productDetailsList.neckline} </li>
                    <li>Sleeve Length : {productDetailsList.sleeveLength} </li>
                    <li>Fabric : {productDetailsList.fabric}</li>
                    <li>Fit : {productDetailsList.fit}</li>
                    <li>Instructions : {productDetailsList.instructions} </li>
                    <li>Model Wears : {productDetailsList.modelWears}</li>
                    <li>Return Policy : {productDetailsList.returnPolicy}</li>
                    <li>Product : {productDetailsList.product}</li>
                    <li>
                      Country of Origin : {productDetailsList.countryofOrigin}{" "}
                    </li>
                    <li>
                      Manufactured By : {productDetailsList.manufacturedBy}
                    </li>
                    <li>Net Quantity : {productDetailsList.netQuantity}</li>
                  </ul>
                </div>
              </div>
            ))} */}
          </div>
        </div>
        {/* <div className="productCardSpan1">
          <div className="title">You may also like</div>
          <div className="pcspan">
            {this.state.ProductCardData.map((cardData, index) => (
              <ProductCard key={index} Data={cardData} />
            ))}
          </div>
        </div>
        <div className="productCardSpan1">
          <div className="title">People also viewed</div>
          <div className="pcspan">
            {this.state.ProductCardData.map((cardData, index) => (
              <ProductCard key={index} Data={cardData} />
            ))}
          </div>
        </div> */}
      </div>
    );
  }
}

ProductPage.propTypes = {
  params: PropTypes.object.isRequired,
};

ProductPage.contextType = CartContext;

export default withRouter(ProductPage);
