import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ProductCard from "../../Components/ProductCard";
import withRouter from "../../Hoc/WithRouter";
import OverlayLoader from "../../Components/OverlayLoader";

import axios from "axios";
import { isEqual } from "lodash";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
      if (res.data.success)
        return this.setState({ products: res.data.data || [], loading: false });
      this.setState({ loading: false, products: [] });
    } catch (err) {
      this.setState({ loading: false });
      toast.error("error in fetching the collection");
    }
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
    const { products = [], loading } = this.state;
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
        </div>
        <div className="mainPart">
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
      </div>
    );
  }
}
CategoryPage.propTypes = {
  CategoryPageData: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  searchParams: PropTypes.object,
};
export default withRouter(CategoryPage);
