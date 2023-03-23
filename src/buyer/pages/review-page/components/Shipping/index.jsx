import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useTheme } from "styled-components";
import { Skeleton, Typography, App, Divider } from "antd";

import { useCartContext } from "@buyer/store";
import { formatCurrency, getSummaryData, removeEmptyKeys } from "@buyer/utils";
import { StyledStickyContainer } from "@buyer/styled-components";

import {
  useGetUserAddress,
  useAddNewAddress,
  usePincodeCheck,
} from "../../hooks";
import { useSummaryContext } from "../../store/SummaryProvider";
import { StyledButton } from "../../styled";
import NewAddressPage from "./NewAddressForm";
import SavedAddressPage from "./SavedAddress";
import DeliveryCard from "./DeliveryCard";

const AddressComponent = () => {
  const theme = useTheme();
  const [addNew, setAddNew] = useState(true);
  const { setAddress } = useSummaryContext();
  const [addresses, loading] = useGetUserAddress();

  useEffect(() => {
    if (loading) return;
    if (!isEmpty(addresses)) setAddNew(false);
  }, [addresses]);

  if (loading)
    return (
      <>
        <Skeleton active className="mt-4 p-4" />
        <Skeleton active className="mt-4 p-4" />
        <Skeleton active className="mt-4 p-4" />
      </>
    );

  return (
    <>
      <div className="flex justify-between font-semibold mb-2">
        <h1 className=" text-base">Contact Information</h1>
        <Typography.Link
          style={{ color: theme.colors.primary }}
          onClick={() => {
            setAddress(null);
            setAddNew((p) => !p);
          }}
        >
          {addNew ? "Saved Addresses" : "Add New Address"}
        </Typography.Link>
      </div>
      {addNew ? (
        <NewAddressPage setAddNew={setAddNew} />
      ) : (
        <SavedAddressPage setAddNew={setAddNew} />
      )}
    </>
  );
};

const ShippingData = () => {
  const { message } = App.useApp();
  const { items } = useCartContext();
  const { total } = getSummaryData(items);

  const { setActiveTab, address } = useSummaryContext();
  const [pincodeData, pincodeLoading] = usePincodeCheck(address?.pincode);

  const [addNewAddress, loading, error] = useAddNewAddress();

  useEffect(() => {
    if (error) {
      message.error("Something went wrong. Please try again later.");
    }
  }, [error]);

  const handleNext = async () => {
    const { saveAddress, fname, lname, address1, address2, ...rest } = address;
    const payload = {
      name: fname + " " + lname,
      address: address1 + " " + address2,
      ...rest,
    };
    if (
      !payload.name ||
      !payload.address ||
      !payload.pincode ||
      !payload.city ||
      !payload.mobileNo
    )
      return message.error("Please enter your address details");
    if (saveAddress) await addNewAddress(removeEmptyKeys(payload));

    setActiveTab("3");
  };

  return (
    <div>
      <AddressComponent />
      <Divider className="my-4 border-t-2 w-[120%] -ml-[10%]" />
      <DeliveryCard />
      <div className="h-20"></div>
      <StyledStickyContainer>
        <div className="flex justify-between items-center mb-2">
          <p className="text-base font-semibold">Final Price</p>
          <p className="text-base font-semibold">{formatCurrency(total)}</p>
        </div>
        <StyledButton
          type="primary"
          disabled={!address || isEmpty(pincodeData)}
          onClick={handleNext}
          className="bg-primary my-1 w-full"
          loading={loading || pincodeLoading}
        >
          Proceed to payment
        </StyledButton>
      </StyledStickyContainer>
    </div>
  );
};

export default ShippingData;
