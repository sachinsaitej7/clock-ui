import React, { Component } from "react";
import "./style.scss";
import ChevronRight from "../../assets/png/Store Card/chevron-right.png";
import ChevronLeft from "../../assets/png/Store Card/chevron-left.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class StoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      offerState: false,
    };
  }
  revealChevron = () => {
    this.setState({
      hovering: true,
    });
  };
  revealOffer = () => {
    this.setState({
      offerState: true,
    });
  };
  resetStates = () => {
    this.setState({
      offerState: false,
      hovering: false,
    });
  };
  hideOffer = () => {
    this.setState({
      offerState: false,
    });
  };

  render() {
    const { storeCardData, isStore } = this.props;
    const {
      name,
      image: Image,
      width="160px",
      height="145px",
      hasOffer,
      id,
    } = storeCardData;
    return (
      <Link
        to={`/product?${isStore ? "store" : "brand"}=${id}`}
        style={{ textDecoration: "none" }}
        className="storeCard"
      >
        <div onMouseEnter={this.revealChevron} onMouseLeave={this.resetStates}>
          {hasOffer === true ? (
            <>
              {this.state.hovering ? (
                this.state.offerState ? (
                  <>
                    <div className="offerFlex">
                      <img
                        src={ChevronLeft}
                        className="chevronLeft"
                        onClick={this.hideOffer}
                      />
                      <img src={Image} className="offerImage" />
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={Image}
                      className="image"
                      width={`${width}`}
                      height={`${height}`}
                      style={{
                        margin:
                          window.innerWidth < 1281
                            ? "30px 6% 0px"
                            : "30px 20% 0px",
                      }}
                    />
                    <img
                      src={ChevronRight}
                      className="chevron"
                      onClick={this.revealOffer}
                    />
                    <div>
                      <p className="texth">{name}</p>
                    </div>
                  </>
                )
              ) : (
                <>
                  <img
                    src={Image}
                    className="image"
                    width={`${width}`}
                    height={`${height}`}
                    style={{
                      margin:
                        window.innerWidth < 1281
                          ? "30px 6% 0px"
                          : "30px 20% 0px",
                    }}
                  />

                  <div>
                    <p className="text">{name}</p>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <img
                src={Image}
                className="image"
                width={`${width}px`}
                height={`${height}px`}
                // style={{
                //   margin:
                //     window.innerWidth < 1281 ? "30px 6% 0px" : "30px 20% 0px",
                // }}
              />

              <div>
                <p className="text">{name}</p>
              </div>
            </>
          )}
        </div>
      </Link>
    );
  }
}

export default StoreCard;

StoreCard.propTypes = {
  storeCardData: PropTypes.object.isRequired,
  Offer: PropTypes.bool.isRequired,
  isStore: PropTypes.bool,
};
