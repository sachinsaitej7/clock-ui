import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Link } from "react-router-dom";
class MallCard extends Component {
  render() {
    const { mallCardData } = this.props;
    const {
      mall_name: title,
      image: Image,
      distance = "<10km",
      id,
    } = mallCardData;
    return (
      <Link to={`/malls/${id}`}>
        <div className="Mall">
          <div>
            <img src={Image} className="image" />
          </div>
          <div className="Rectangle2">
            <pre className="item-1">{title}</pre>
            <pre className="item-2">{distance}</pre>
          </div>
        </div>
      </Link>
    );
  }
}

MallCard.propTypes = {
  mallCardData: PropTypes.object.isRequired,
};
export default MallCard;
