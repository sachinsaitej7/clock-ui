import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../Context/AuthContext";
import ExistingUser from "./ExistingUser";
import { useNavigate } from "react-router-dom";

DeliveryPage.propTypes = {
  data: PropTypes.object,
};

function DeliveryPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { address = [] } = user;

  useEffect(() => {
    if (address.length === 0) {
      navigate("/add-new-address");
    }
  }, [user]);

  return (
    <div>
      <ExistingUser address={address} />
    </div>
  );
}

export default DeliveryPage;
