import React, { Component } from "react";
import NotificationBar from "../../../../Components/NotificationBar/index";
import MallCard from "../../../../Components/MallCard/index";
import AdCard from "../../../../Components/Ad-Card/index";
import StoreCard from "../../../../Components/StoreCard/index";
// import ShowMore from "../../../../components/Showmore/index";
import UserLocation from "../../../../Components/UserLocation/index";

//Images
// import StoreCardImageAdidas from "../../../../assets/png/Store Card/Adidas.png";
// import StoreCardImageNike from "../../../../assets/png/Store Card/Nike.png";
// import StoreCardImageBasics from "../../../../assets/png/Store Card/Basics.png";
// import StoreCardImageAllen from "../../../../assets/png/Store Card/AllenSolly.png";
// import MallCardImageVR from "../../../../assets/png/Mall Card/VRChennai.png";
// import MallCardImagePhoenix from "../../../../assets/png/Mall Card/PhoenixChennai.png";
// import MallCardImageForum from "../../../../assets/png/Mall Card/ForumChennai.png";
//CSS
import "./style.scss";

//Constants
const notificationBarData =
  "Get 6% Discount on all Products on in-store Purchase";
// const mallCardOneData = {
//   title: "VR",
//   imageUrl: MallCardImageVR,
//   distance: "2.6km",
// };
// const mallCardTwoData = {
//   title: "Forum Vijaya Mall",
//   imageUrl: MallCardImageForum,
//   distance: "3.0km",
// };
// const mallCardThreeData = {
//   title: "Phoenix Mall",
//   imageUrl: MallCardImagePhoenix,
//   distance: "4.1km",
// };
// const mallCardFourData = {
//   title: "VR Mall",
//   imageUrl: MallCardImageVR,
//   distance: "2.6km",
// };

//StoreCard
// const storeCardAdidasData = {
//   imageUrl: StoreCardImageAdidas,
//   name: "Adidas",
//   width: "60",
// };
// const storeCardAllenData = {
//   imageUrl: StoreCardImageAllen,
//   name: "Adidas",
//   width: "45",
//   height: "40",
// };
// const storeCardBasicsData = {
//   imageUrl: StoreCardImageBasics,
//   name: "Basics",
//   width: "60",
// };
// const storeCardNikeData = {
//   imageUrl: StoreCardImageNike,
//   name: "Nike",
//   width: "55",
// };
//UserLocation
const UserLocationData = {
  description: "Showing Malls near",
  link: "Chennai",
};

// const OtherMallsinChennai = {
//   description: "Other malls in",
//   link: "Chennai",
// };
//Code
class Top extends Component {
  constructor(props) {
    super(props);
    this.state = { showMoreActive: false, mallsData: [], brandsData: [] };
  }
  fetchMalls = async () => {
    try {
      let res = await fetch("https://clockapi.theclock.xyz/malls/");
      let data = await res.json();
      if (data.success) this.setState({ mallsData: data.data });
    } catch (err) {
      console.log(err.message);
    }
  };

  fetchBrands = async () => {
    try {
      let res = await fetch("https://clockapi.theclock.xyz/brand/");
      let data = await res.json();
      if (data.success) this.setState({ brandsData: data.data });
    } catch (err) {
      console.log(err.message);
    }
  };

  componentDidMount() {
    this.fetchMalls();
    this.fetchBrands();
  }

  render() {
    const { mallsData, brandsData } = this.state;
    return (
      <div className="tops">
        <div className="notificationBar">
          <NotificationBar notificationBarData={notificationBarData} />
        </div>
        <div className="userLoc">
          <UserLocation userLocationData={UserLocationData} />
        </div>
        <div className="span1">
          {mallsData.map((mall) => {
            return <MallCard key={mall.id} mallCardData={mall} />;
          })}
          {/* <div className="item">
            <MallCard mallCardData={mallCardOneData} />
          </div>
          <div className="item">
            <MallCard mallCardData={mallCardTwoData} />
          </div>
          <div className="item">
            <MallCard mallCardData={mallCardThreeData} />
          </div>
          <div className="item">
            <MallCard mallCardData={mallCardFourData} />
          </div> */}
          {/* {this.state.showMoreActive ? (
            <>
              <div className="item">
                <MallCard mallCardData={mallCardTwoData} />
              </div>
              <div className="item">
                <MallCard mallCardData={mallCardThreeData} />
              </div>
            </>
          ) : null} */}
          {/* <div  className="item"><MallCard mallCardData = {mallCardTwoData}/></div> */}
        </div>
        {/* {this.state.showMoreActive ? (
          <>
            <div className="othermalls">
              <UserLocation userLocationData={OtherMallsinChennai} />
            </div>
            <div className="span2">
              <div className="item1">
                <MallCard mallCardData={mallCardOneData} />
              </div>
              <div className="item1">
                <MallCard mallCardData={mallCardTwoData} />
              </div>
              <div className="item1">
                <MallCard mallCardData={mallCardThreeData} />
              </div>
            </div>
          </>
        ) : null} */}

        {/* <div className="showMore">
          <ShowMore onClick={this.showDiv} />
        </div> */}
        <div className="adCard">
          <AdCard />
        </div>
        <text className="trending">trending stores</text>

        <div className="spanStoreCard">
          {brandsData.map((brand) => {
            return <StoreCard storeCardData={brand} key={brand.id} />;
          })}
          {/* <div className="item">
            <StoreCard storeCardData={storeCardNikeData} />
          </div>
          <div className="item">
            <StoreCard storeCardData={storeCardAdidasData} />
          </div>
          <div className="item">
            <StoreCard storeCardData={storeCardAllenData} />
          </div>
          <div className="item">
            <StoreCard storeCardData={storeCardBasicsData} />
          </div>
          <div className="item">
            <StoreCard storeCardData={storeCardNikeData} />
          </div>
          <div className="item">
            <StoreCard storeCardData={storeCardNikeData} />
          </div>
          <div className="item">
            <StoreCard storeCardData={storeCardAdidasData} />
          </div>
          <div className="item">
            <StoreCard storeCardData={storeCardAllenData} />
          </div>
          <div className="item">
            <StoreCard storeCardData={storeCardBasicsData} />
          </div>
          <div className="item">
            <StoreCard storeCardData={storeCardNikeData} />
          </div> */}
        </div>
      </div>
    );
  }
  showDiv = () => {
    this.setState({ showMoreActive: !this.state.showMoreActive });
  };
}
export default Top;
