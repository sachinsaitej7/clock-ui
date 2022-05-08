import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import SearchBar from "../../Components/Search";
import StoreCard from "../../Components/StoreCard";
import MoreFilters from "../../Components/Popups/MoreFilters";
import withRouter from "../../Hoc/WithRouter";

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
    }
  }


  componentDidMount() {
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
        </div>
        <div className="mainPart">
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
