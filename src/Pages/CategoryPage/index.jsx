import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import SearchBar from "../../Components/Search";
import ProductCard from "../../Components/ProductCard";
import MoreFilters from "../../Components/Popups/MoreFilters";
import withRouter from "../../hoc/WithRouter";
import OverlayLoader from "../../Components/OverlayLoader";

import checkedImage from "../../assets/png/store-page/checked.png";
import uncheckedImage from "../../assets/png/store-page/unchecked.png";
import axios from "axios";
import { isEqual } from "lodash";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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

  componentDidUpdate(prevProps, prevState) {
    const { searchParams } = this.props;
    if (!isEqual(prevProps.searchParams, this.props.searchParams)) {
      const keyValues = searchParams.entries();
      const payload = {};
      for (const [key, value] of keyValues) {
        if (key === "brand") {
          payload["brand_id"] = value;
        } else payload[key] = value;
      }
      this.fetchProducts({ params: payload });
    }
  }

  fetchProducts = async (payload) => {
    this.setState({ loading: true });
    try {
      let res = await axios.get(
        "https://clockapi.theclock.xyz/product/",
        payload
      );
      // let data = await res.json();
      if (res.data.success)
        return this.setState({ products: res.data.data || [], loading: false });
      this.setState({ loading: false, products: [] });
    } catch (err) {
      this.setState({ loading: false });
      toast.error("error in fetching the collection");
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
    const {
      filter1,
      filter2,
      filter3,
      filter4,
      products = [],
      loading,
    } = this.state;
    const collectionName = this.getCollectionName();
    if (loading) return <OverlayLoader />;

    return (
      <div className="productPage">
        <div className="topPart">
          <text className="heading">
            {collectionName} Collections
            <text className="noOfStores">
              &nbsp;&nbsp;&bull;&nbsp;{`${products.length} Items`}
            </text>
          </text>
          {/* <div className="flex">
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
          </div> */}
        </div>
        <div className="mainPart">
          {/* <div className="sideBar">
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
          </div> */}
          <div className="pageContent">
            <div>
              <div className="PCclass">
                {products.map((cardData) => (
                  <ProductCard key={cardData.id} Data={cardData} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* {this.state.showPopup ? (
          <MoreFilters triggerPopup={this.togglePopup} />
        ) : null} */}
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
