import React, { Component } from "react";
import TopBar from "../../../../components/TopBar/index";
import NotificationBar from "../../../../components/NotificationBar/index";
import MallCard from "../../../../components/MallCard/index";
import AdCard from "../../../../components/Ad-Card/index";
import StoreCard from "../../../../components/StoreCard/index";
import UserLocation from "../../../../components/UserLocation/index";

//Images
import MallCardImageForum from "../../../../assets/png/Mall Card/ForumChennai.png";
import MallCardImagePhoenix from "../../../../assets/png/Mall Card/PhoenixChennai.png";
import MallCardImageVR from "../../../../assets/png/Mall Card/VRChennai.png";
import StoreCardImageAdidas from "../../../../assets/png/Store Card/Adidas.png";
import StoreCardImageBasics from "../../../../assets/png/Store Card/Basics.png";
import StoreCardImageNike from "../../../../assets/png/Store Card/Nike.png";
import StoreCardImageAllen from "../../../../assets/png/Store Card/AllenSolly.png";
//CSS
import "./style.scss";
import Showmore from "../../../../components/Showmore";

//Constants
const notificationBarData =
  "Get 6% Discount on all Products on in-store Purchase";
const mallCardOneData = {
  title: "VR",
  imageUrl: MallCardImageVR,
  distance: "2.6km",
};
const mallCardTwoData = {
  title: "Forum Vijaya Mall",
  imageUrl: MallCardImageForum,
  distance: "3.0km",
};
const mallCardThreeData = {
  title: "Phoenix Mall",
  imageUrl: MallCardImagePhoenix,
  distance: "4.1km",
};
const mallCardFourData = {
  title: "VRR",
  imageUrl: MallCardImageVR,
  distance: "2.6km",
};

//StoreCard
const storeCardAdidasData = {
  imageUrl: StoreCardImageAdidas,
  name: "Adidas",
  width: "60",
};
const storeCardAllenData = {
  imageUrl: StoreCardImageAllen,
  name: "Adidas",
  width: "45",
  height: "40",
};
const storeCardBasicsData = {
  imageUrl: StoreCardImageBasics,
  name: "Basics",
  width: "60",
};
const storeCardNikeData = {
  imageUrl: StoreCardImageNike,
  name: "Nike",
  width: "55",
};
//UserLocation
const UserLocationData = {
  description: "Showing Malls near",
  link: "Venkateshwara street, vadapalani, Chennai",
};
//Code
class Top extends Component {
  render() {
    return (
      <div className="tops">
        <div>
          <TopBar className="topBar" />
        </div>
        <div className="line"></div>
        <div>
          <NotificationBar
            notificationBarData={notificationBarData}
            className="notificationBar flex-item"
          />
        </div>
        <div className="userLoc">
          <UserLocation userLocationData={UserLocationData} />
        </div>
        <div className="span">
          <div className="item-1">
            <MallCard mallCardData={mallCardOneData} />
          </div>
          <div className="item-2">
            <MallCard mallCardData={mallCardTwoData} />
          </div>
          <div className="item-3">
            <MallCard mallCardData={mallCardThreeData} />
          </div>
          <div className="item-4">
            <MallCard mallCardData={mallCardFourData} />
          </div>
        </div>

        <div className="Showmore">
          <Showmore />
        </div>

        <div className="adCard">
          <AdCard />
        </div>
        <text className="trending">trending stores</text>

        <div className="spanStoreCard">
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
            <StoreCard storeCardData={storeCardAdidasData} />
          </div>
        </div>
      </div>
    );
  }
}
export default Top;
