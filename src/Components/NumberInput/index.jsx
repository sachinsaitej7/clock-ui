import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const NumberInput = ({ onChange, value }) => {
  return (
    <div className="numberip">
      <div className="nbox">+91</div>
      <input
        className="searchbar"
        type="tel"
        name="telphone"
        pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
        maxLength="10"
        required
        placeholder="Enter  your  number  here"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

NumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default NumberInput;
