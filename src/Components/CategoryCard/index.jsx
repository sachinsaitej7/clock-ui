import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import PropTypes from "prop-types";

class CategoryCard extends Component {
  render() {
    const { Data } = this.props;
    const { image: Image, name:title, id } = Data;
    return (
      <Link to={"/product?category=" + id}>
        <div className="card">
          <img src={Image} className="circular--landscape" />
          <div className="cont">
            <b>
              {title}
              <br></br>
            </b>
          </div>
        </div>
      </Link>
    );
  }
}

export default CategoryCard;

CategoryCard.propTypes = {
  Data: PropTypes.object.isRequired,
};
