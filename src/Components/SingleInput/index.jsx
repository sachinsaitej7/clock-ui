import React from "react";
import { useState } from "react";
import "./style.scss";

const SingleInput = () => {
  const [inputValue, setInputValue] = useState("");

  // Input Field handler
  const handleUserInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="singleip">
      <input
        className="searchbar"
        type="text"
        value={inputValue}
        onChange={handleUserInput}
      />
    </div>
  );
};

export default SingleInput;
