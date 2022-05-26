import React, { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Store from "../../store";

import NewAddressPage from "./new-address-page";
import SaveAddressPage from "./saved-address-page";

const { AuthContext } = Store;

const AddressPage = () => {
  const {
    address = [],
    activeAddress = {},
    addNewAddress,
    setActiveAddress,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (newAddress) => {
    try {
      await addNewAddress(newAddress);
      navigate("/address");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const onNext = () => {
    if (activeAddress) navigate("/review-order");
  };

  return searchParams.get("new") || address.length === 0 ? (
    <NewAddressPage onSubmit={handleSubmit} />
  ) : (
    <SaveAddressPage
      address={address}
      activeAddress={activeAddress}
      setSearchParams={setSearchParams}
      setActiveAddress={setActiveAddress}
      onClick={onNext}
    />
  );
};

export default AddressPage;
