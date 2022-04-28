import React, { Component } from "react";
import "./style.scss";
import PropTypes from "prop-types";

// import SearchBar from "../../Search/index";

import checkedImage from "../../../assets/png/store-page/checked.png";
import uncheckedImage from "../../../assets/png/store-page/unchecked.png";
const filters = [
  "abampere",
  "abamperes",
  "abamps",
  "aband",
  "abanded",
  "abanding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandoners",
  "abampere",
  "abanded",
  "aabamperes",
  "abamps",
  "aband",
  "banding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandoners",
  "abandoners",
  "abampere",
  "abanded",
  "aabamperes",
  "abamps",
  "aband",
  "banding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandoners",
  "abandoners",
  "abampere",
  "abanded",
  "aabamperes",
  "abamps",
  "aband",
  "banding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandoners",
  "abandoners",
  "abampere",
  "abanded",
  "aabamperes",
  "abamps",
  "aband",
  "banding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandoners",
  "abandoners",
  "abampere",
  "abanded",
  "aabamperes",
  "abamps",
  "aband",
  "banding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandoners",
  "abandoners",
  "abampere",
  "abanded",
  "aabamperes",
  "abamps",
  "aband",
  "banding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandoners",
  "abampere",
  "abanded",
  "aabamperes",
  "abamps",
  "aband",
  "banding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandoners",
  "abandoners",
  "abampere",
  "abanded",
  "aabamperes",
  "abamps",
  "aband",
  "banding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandoners",
  "abandoners",
  "abampere",
  "abanded",
  "aabamperes",
  "abamps",
  "aband",
  "banding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandoners",
  "abandoners",
  "abampere",
  "abanded",
  "aabamperes",
  "abamps",
  "aband",
  "banding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
  "abandoners",
  "abandoners",
  "abampere",
  "abanded",
  "aabamperes",
  "abamps",
  "aband",
  "banding",
  "abandon",
  "abandoned",
  "abandonedly",
  "abandonee",
  "abandonees",
  "abandoner",
];

const P = Array.apply(null, { length: filters.length }).map(
  Function.call,
  () => {
    return false;
  }
);

export default class MoreFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      P,
      filters,
      Search: { searchQuery: "" },
      searchArray: [],
    };
  }
  searchQueryChanged = (event) => {
    const searchedArray = [];
    var search = this.state.Search;
    search.searchQuery = event.target.value;
    for (var i = 0; i < filters.length; i++) {
      if (
        filters[i]
          .toLowerCase()
          .includes(this.state.Search.searchQuery.toLowerCase())
      ) {
        searchedArray.push(filters[i]);
      }
    }
    this.setState({
      searchArray: searchedArray,
      Search: search,
    });

    
  };

  changeCheckbox = (index) => {
    this.setState({
      P: this.state.P.map((A, Index) => {
        if (Index == index) {
          return !A;
        }
        return A;
      }),
    });
  };
  render() {
    const { searchArray, filters } = this.state;
    const A = this.state.Search.searchQuery.length > 0 ? searchArray : filters;
    return (
      <div className="moreFilters">
        <div className="popup">
          <div style={{ width: "96%" }}>
            <div className="searchBarFlex">
              <input
                type="text"
                value={this.state.searchQuery}
                className="field"
                onChange={this.searchQueryChanged.bind(this)}
                placeholder="Enter filter name"
              />

              <text onClick={this.props.triggerPopup}>&#x2715;</text>
            </div>
          </div>

          <div className="filters">
            {A.map((filter, index) => (
              <div
                className="filterName"
                key={index}
                onClick={() => this.changeCheckbox(index)}
              >
                {this.state.P[index] == true ? (
                  <img src={checkedImage} alt="a" />
                ) : (
                  <img src={uncheckedImage} alt="a" />
                )}

                {filter}
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
MoreFilters.propTypes = {
  triggerPopup: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
