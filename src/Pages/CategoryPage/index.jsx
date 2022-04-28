import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import SearchBar from "../../Components/Search";
import ProductCard from "../../Components/ProductCard";
// import ProductImage from "../../assets/png/image 29.png";
// import Campus from "../../assets/png/ProductPage/Campus.png";
// import Mast from "../../assets/png/ProductPage/Mast.png";
// import Shoe from "../../assets/png/ProductPage/Shoe.png";
// import Shorts from "../../assets/png/ProductPage/Shorts.png";
// import product from "../../assets/png/ProductPage/product.png";
import MoreFilters from "../../Components/Popups/MoreFilters";
import withRouter from "../../Hoc/WithRouter";

import checkedImage from "../../assets/png/store-page/checked.png";
import uncheckedImage from "../../assets/png/store-page/unchecked.png";
import axios from "axios";

// const CategoryPageDataMax = [
//   {
//     id: 0,
//     imageUrl: Shorts,
//     tagData: {
//       name: "NEW",
//     },
//     likeData: {
//       isVisible: true,
//     },
//     title: "Domyos by Decatholon",
//     description: "Men Regular Fit Sports Shorts",
//     mrp: "1999",
//     price: "499",
//     discount: "50",
//   },
//   {
//     id: 1,
//     imageUrl: Mast,
//     tagData: {
//       name: "NEW",
//     },
//     likeData: {
//       isVisible: true,
//     },
//     title: "Mast and Habour",
//     description: "Colour Blocked Pullover",
//     mrp: "1999",
//     price: "999",
//     discount: "50",
//   },
//   {
//     id: 2,
//     imageUrl: Campus,
//     tagData: {
//       name: "NEW",
//     },
//     likeData: {
//       isVisible: true,
//     },
//     title: "Campus Sutra",
//     description: "Men Regular Fit Casual Shits",
//     mrp: "1999",
//     price: "999",
//     discount: "50",
//   },
//   {
//     id: 3,
//     imageUrl: product,
//     tagData: {
//       name: "NEW",
//     },
//     likeData: {
//       isVisible: true,
//     },
//     title: "Max Lifestyle",
//     description: "MAX Stonewashed Slim Fit Denim Shirt in light faded",
//     mrp: "1999",
//     price: "999",
//     discount: "50",
//   },
//   {
//     id: 4,
//     imageUrl: Shoe,
//     tagData: {
//       name: "NEW",
//     },
//     likeData: {
//       isVisible: true,
//     },
//     title: "Roadster",
//     description: "Men Slip on Sneakers",
//     mrp: "1999",
//     price: "999",
//     discount: "50",
//   },
// ];
// import ProductImage from "./assets/png/image 29.png";
class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter1: [
        { category: "Men", isSelected: true, noOfProducts: 20, id: 1 },
        { category: "Women", isSelected: false, noOfProducts: 20, id: 2 },
        { category: "Kids", isSelected: true, noOfProducts: 20, id: 3 },
      ],
      filter2: [
        { category: "Men", isSelected: true, noOfProducts: 20, id: 18 },
        { category: "Women", isSelected: false, noOfProducts: 20, id: 4 },
        { category: "Kids", isSelected: true, noOfProducts: 20, id: 5 },
        { category: "Women", isSelected: false, noOfProducts: 20, id: 6 },
      ],
      filter3: [
        { category: "Men", isSelected: true, noOfProducts: 20, id: 7 },
        { category: "Women", isSelected: false, noOfProducts: 20, id: 8 },
        { category: "Kids", isSelected: true, noOfProducts: 20, id: 9 },
        { category: "Men", isSelected: false, noOfProducts: 20, id: 10 },
        { category: "Kids", isSelected: false, noOfProducts: 20, id: 11 },
        { category: "Women", isSelected: false, noOfProducts: 20, id: 12 },
      ],
      filter4: [
        { category: "Men", isSelected: true, noOfProducts: 20, id: 13 },
        { category: "Women", isSelected: false, noOfProducts: 20, id: 14 },
        { category: "Women", isSelected: false, noOfProducts: 20, id: 15 },
        { category: "Kids", isSelected: true, noOfProducts: 20, id: 16 },
        { category: "Women", isSelected: false, noOfProducts: 20, id: 17 },
      ],
      showPopup: false,
      idMap: Array.from({ length: 17 }).reduce((A, item, index) => {
        A[index + 1] = false;

        return A;
      }, {}),
    };
  }
  componentDidMount() {
    const { searchParams } = this.props;
    const keyValues = searchParams.entries();
    const payload = {};
    for (const [key, value] of keyValues) {
      if (key === "brand") {
        payload["brand_id"] = value;
      } else payload[key] = value;
    }
    this.fetchProducts({ params: payload });
  }

  fetchProducts = async (payload) => {
    try {
      let res = await axios.get(
        "https://clockapi.theclock.xyz/product/",
        payload
      );
      // let data = await res.json();
      if (res.data.success) this.setState({ products: res.data.data || [] });
    } catch (err) {
      console.log(err.message);
    }
  };

  selectCategory = () => {};
  checkthisBox = (id) => {
    this.setState((prevstate) => {
      return {
        idMap: { ...prevstate.idMap, [id]: !prevstate.idMap[id] },
      };
    });
  };
  clearAll = () => {
    this.setState(() => {
      return {
        idMap: false,
      };
    });
  };
  getCollectionName = () => {
    const { searchParams } = this.props;
    const { products = [] } = this.state;
    switch (true) {
      case !!searchParams.get("brand"):
        return products[0]?.brand?.name || "Brand";
      case !!searchParams.get("category"):
        return products[0]?.category?.name || "Category";
      default:
        return "";
    }
  };
  render() {
    const { filter1, filter2, filter3, filter4, products = [] } = this.state;
    const collectionName = this.getCollectionName();

    return (
      <div className="productPage">
        <div className="topPart">
          <text className="heading">
            {collectionName} Collections
            <text className="noOfStores">
              &nbsp;&nbsp;&bull;&nbsp;{`${products.length} Items`}
            </text>
          </text>
          <div className="flex">
            <text
              className="filters"
              style={{ marginRight: window.innerWidth < 1281 ? "3%" : "7%" }}
            >
              Filters
            </text>
            <text
              className="red"
              style={{ marginRight: window.innerWidth < 1281 ? "53%" : "63%" }}
              onClick={() => {
                this.clearAll();
              }}
            >
              Clear&nbsp;All
            </text>
            <text className="sort">
              Sort&nbsp;by<text className="chevron"></text>
            </text>
            <SearchBar className="" />
          </div>
        </div>
        <div className="mainPart">
          <div className="sideBar">
            <div className="listContainer">
              <div className="listName">For</div>
              <form className="listContents">
                {filter1.map((row, index) => (
                  <div className="categories" key={index}>
                    <img
                      onClick={() => {
                        this.checkthisBox(row.id);
                      }}
                      className={
                        this.state.idMap[row.id] ? "checkbox" : "uncheckedbox"
                      }
                      src={
                        this.state.idMap[row.id] ? checkedImage : uncheckedImage
                      }
                      alt=""
                    />
                    <text className="label">
                      {row.category}&nbsp;&nbsp;
                      <text className="noOfProducts">({row.noOfProducts})</text>
                    </text>
                  </div>
                ))}
              </form>
              <div className="linee"></div>
              <div className="listName">Category</div>
              <form className="listContents">
                {filter3.map((row, index) => (
                  <div className="categories" key={index}>
                    <img
                      onClick={() => {
                        this.checkthisBox(row.id);
                      }}
                      className={
                        this.state.idMap[row.id] ? "checkbox" : "uncheckedbox"
                      }
                      src={
                        this.state.idMap[row.id] ? checkedImage : uncheckedImage
                      }
                      alt=""
                    />
                    <text className="label">
                      {row.category}&nbsp;&nbsp;
                      <text className="noOfProducts">({row.noOfProducts})</text>
                    </text>
                  </div>
                ))}
              </form>
              <div className="linee"></div>
              <div className="listName">Other Category</div>
              <form className="listContents">
                {filter2.map((row, index) => (
                  <div className="categories" key={index}>
                    <img
                      onClick={() => {
                        this.checkthisBox(row.id);
                      }}
                      className={
                        this.state.idMap[row.id] ? "checkbox" : "uncheckedbox"
                      }
                      src={
                        this.state.idMap[row.id] ? checkedImage : uncheckedImage
                      }
                      alt=""
                    />
                    <text className="label">
                      {row.category}&nbsp;&nbsp;
                      <text className="noOfProducts">({row.noOfProducts})</text>
                    </text>
                  </div>
                ))}
              </form>
              <text className="moreCategories" onClick={this.togglePopup}>
                and +45 more
              </text>
              <div className="linee"></div>
              <div className="listName">Category</div>
              <form className="listContents">
                {filter4.map((row, index) => (
                  <div className="categories" key={index}>
                    <img
                      onClick={() => {
                        this.checkthisBox(row.id);
                      }}
                      className={
                        this.state.idMap[row.id] ? "checkbox" : "uncheckedbox"
                      }
                      src={
                        this.state.idMap[row.id] ? checkedImage : uncheckedImage
                      }
                      alt=""
                    />
                    <text className="label">
                      {row.category}&nbsp;&nbsp;
                      <text className="noOfProducts">({row.noOfProducts})</text>
                    </text>
                  </div>
                ))}
              </form>
              <div className="linee"></div>
            </div>
          </div>
          <div className="pageContent">
            <div className={this.state.hovering ? "red" : "storeCardFlex"}>
              <div className="PCclass">
                {products.map((cardData) => (
                  <ProductCard key={cardData.id} Data={cardData} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {this.state.showPopup ? (
          <MoreFilters triggerPopup={this.togglePopup} />
        ) : null}
      </div>
    );
  }
  togglePopup = () => {
    this.setState((prevState) => ({ showPopup: !prevState.showPopup }));
  };
}
CategoryPage.propTypes = {
  CategoryPageData: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  searchParams: PropTypes.object,
};
export default withRouter(CategoryPage);
