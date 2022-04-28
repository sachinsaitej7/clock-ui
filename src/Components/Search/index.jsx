import React from "react";
import { useState } from "react";
import "./style.scss";
import searchbutton from "../../assets/png/search.png";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  // Input Field handler
  const handleUserInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="search">
      <input
        className="searchbar"
        type="text"
        style={{ paddingLeft: "10px" }}
        placeholder="Search Stores in VR Mall..."
        value={inputValue}
        onChange={handleUserInput}
      ></input>{" "}
      <img src={searchbutton} />
    </div>
  );
};

export default SearchBar;
