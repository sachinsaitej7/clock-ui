import React, { Component } from "react";
import "./style.scss";
import Heart from "../../assets/png/heart.png";
import LikeActiveImage from "../../assets/png/like-heart-filled.png";

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
    };
  }

  handleClick1 = () => {
    this.setState((prevState) => ({
      isLiked: !prevState.isLiked,
      isVisible: true,
    }));
  };
  render() {
    const { isLiked } = this.state;
    return (
      <div>
        <button className="wishlist" onClick={this.handleClick1}>
          <img
            src={isLiked ? LikeActiveImage : Heart}
            width="30px"
            height="30px"
          />
        </button>
      </div>
    );
  }
}

export default WishList;
