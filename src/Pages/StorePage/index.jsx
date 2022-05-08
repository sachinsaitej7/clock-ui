import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import SearchBar from "../../Components/Search";
import StoreCard from "../../Components/StoreCard";
import MoreFilters from "../../Components/Popups/MoreFilters";
import withRouter from "../../hoc/WithRouter";

import checkedImage from "../../assets/png/store-page/checked.png";
import uncheckedImage from "../../assets/png/store-page/unchecked.png";
// import Offer from "../../assets/png/Store Card/offerAdidas.png";
// import Adidas from "../../assets/png/Store Card/Adidas.png";
// import AllenSolly from "../../assets/png/Store Card/AllenSolly.png";
// import Nike from "../../assets/png/Store Card/Nike.png";
// import Basics from "../../assets/png/Store Card/Basics.png";

class StorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storesData: [],
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

  componentDidMount() {
    console.log(this.props);
    const { mallId = 1 } = this.props.params || {};
    this.fetchStores(mallId);
  }

  fetchStores = async (id) => {
    try {
      let res = await fetch(
        `https://clockapi.theclock.xyz/store/?mall_id=${id}`
      );
      let data = await res.json();
      if (data.success) this.setState({ storesData: data.data });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { filter1, filter2, filter3, filter4 } = this.state;
    // const { StoreCardData } = this.props;
    // const storeCardDataVR = [
    //   {
    //     name: "Adidas",
    //     imageUrl: Adidas,
    //     width: "200",
    //     height: "200",
    //     hasOffer: true,
    //     imageUrl1: Offer,
    //   },
    //   {
    //     name: "Basics",
    //     imageUrl: Basics,
    //     width: "200",
    //     height: "200",
    //     hasOffer: false,
    //     imageUrl1: Offer,
    //   },
    //   {
    //     name: "Allen Solly",
    //     imageUrl: AllenSolly,
    //     width: "200",
    //     height: "200",
    //     hasOffer: false,
    //     OfferImage: { Offer },
    //   },
    //   {
    //     name: "Nike",
    //     imageUrl: Nike,
    //     width: "200",
    //     height: "200",
    //     hasOffer: false,
    //     OfferImage: { Offer },
    //   },
    // ];
    // const storeCardDataPhoenix = [
    //   {
    //     name: "Adidas",
    //     imageUrl: Adidas,
    //     width: "200",
    //     height: "200",
    //     hasOffer: true,
    //     imageUrl1: Offer,
    //   },
    //   {
    //     name: "Basics",
    //     imageUrl: Basics,
    //     width: "200",
    //     height: "200",
    //     hasOffer: false,
    //     imageUrl1: Offer,
    //   },
    //   {
    //     name: "Allen Solly",
    //     imageUrl: AllenSolly,
    //     width: "200",
    //     height: "200",
    //     hasOffer: false,
    //     OfferImage: { Offer },
    //   },
    //   {
    //     name: "Nike",
    //     imageUrl: Nike,
    //     width: "200",
    //     height: "200",
    //     hasOffer: false,
    //     OfferImage: { Offer },
    //   },
    // ];
    // const storeCardDataForum = [
    //   {
    //     name: "Adidas",
    //     imageUrl: Adidas,
    //     width: "200",
    //     height: "200",
    //     hasOffer: true,
    //     imageUrl1: Offer,
    //   },
    //   {
    //     name: "Basics",
    //     imageUrl: Basics,
    //     width: "200",
    //     height: "200",
    //     hasOffer: false,
    //     imageUrl1: Offer,
    //   },
    //   {
    //     name: "Allen Solly",
    //     imageUrl: AllenSolly,
    //     width: "200",
    //     height: "200",
    //     hasOffer: false,
    //     OfferImage: { Offer },
    //   },
    //   {
    //     name: "Nike",
    //     imageUrl: Nike,
    //     width: "200",
    //     height: "200",
    //     hasOffer: false,
    //     OfferImage: { Offer },
    //   },
    // ];
    // let StoreCardData = null;
    // {
    //   if (this.props.params.mallName === "VR Mall") {
    //     StoreCardData = storeCardDataVR;
    //   }
    //   if (this.props.params.mallName === "Forum Vijaya Mall") {
    //     StoreCardData = storeCardDataForum;
    //   }
    //   if (this.props.params.mallName === "Phoenix Mall") {
    //     StoreCardData = storeCardDataPhoenix;
    //   } else StoreCardData = storeCardDataPhoenix;
    // }
    const { storesData } = this.state;
    const mallName = storesData[0]?.mall_name;

    return (
      <div className="productPage">
        <div className="topPart">
          <text className="heading">
            Stores in {mallName}
            <text className="noOfStores">
              &nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;
              {`${storesData.length} Stores`}
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
              {storesData.map((data) => (
                <StoreCard
                  key={data.id}
                  storeCardData={{
                    ...data,
                    image: data.logo,
                    name: data.store_name,
                    width: "100%",
                    height: "100%",
                  }}
                  className="storeCard"
                />
              ))}
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
StorePage.propTypes = {
  // StoreCardData: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};
export default withRouter(StorePage);
