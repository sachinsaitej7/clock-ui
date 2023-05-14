import React from "react";
import styled from "styled-components";
import { Skeleton } from "antd";
import { useSearchParams } from "react-router-dom";

import { useAuth } from "@app/store";
import { useLoginContext } from "@buyer/store";
import { useProduct, useCheckProductInSaved, useSaveProduct, useRemoveSavedProduct } from "../hooks";
import { Button } from "antd";

const StyledButton = styled(Button)`
  box-shadow: none;
  border-radius: 8px;
  height: 42px;

  font-weight: ${(props) => props.theme.fontWeights.semibold};
  font-size: ${(props) => props.theme.fontSizes[3]};
  line-height: 120%;
`;

const VisitButton = () => {
  const [user] = useAuth();
  const { handleLoginModal } = useLoginContext();
  const [searchParams] = useSearchParams();
  const [product, loading] = useProduct(searchParams.get("id"));
  const [checkProductInSaved] = useCheckProductInSaved(searchParams.get("id"));
  const [saveProduct, saveLoading] = useSaveProduct();
  const [removeSavedProduct, removeLoading] = useRemoveSavedProduct(
    searchParams.get("id")
  );

  if (loading) return <Skeleton active className='my-4' />;
  if (!product?.location) return null;

  const { latitude, longitude } = product.location;
  // open google maps with the location
  const handleVisitStore = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    );
  };

  const handleSaveProduct = () => {
    if (!user) return handleLoginModal(() => saveProduct(product));
    if(checkProductInSaved) return removeSavedProduct(product.id);
    saveProduct(product);
  };

  return (
    <>
      <StyledButton
        type='primary'
        className='w-full bg-primary my-2'
        onClick={handleVisitStore}
      >
        Visit Store
      </StyledButton>
      <StyledButton
        className='w-full my-2 text-primary border-primary'
        onClick={handleSaveProduct}
        loading={saveLoading || removeLoading}
      >
        {checkProductInSaved ? "Saved" : "Save"}
      </StyledButton>
    </>
  );
};

export default VisitButton;
