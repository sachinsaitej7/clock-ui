import React from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Divider } from "antd";

import { ArrowLongLeftIcon } from "@assets/icons";
import { useProduct } from "./hooks";

import { ProductProvider } from "./store/ProductProvider";
import {
  ProductCarousal,
  ShareIcon,
  ProductDetails,
  DeliveryDetails,
  BuyButtons,
  UserData,
  Variants,
  Features,
  OtherCollection,
} from "./components";

const Container = styled.div`
  padding: 0px ${(props) => props.theme.space[5]};
  overflow-x: hidden;
`;

const ProductPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [product, loading] = useProduct(searchParams.get("id"));

  return (
    <ProductProvider>
      <Container className='mb-6'>
        <div className='flex items-center justify-between my-2'>
          <ArrowLongLeftIcon
            width='24px'
            onClick={() => navigate(-1)}
            className='cursor-pointer'
          />
          <ShareIcon />
        </div>
        {!loading && !product ? (
          <h1 className='text-center text-xl h-60'>Product not found</h1>
        ) : (
          <>
            <ProductCarousal />
            <ProductDetails />
            <Divider className='my-4 border-t-8 w-[120%] -ml-[10%]' />
            <Variants />
            {product?.price && (
              <>
                <DeliveryDetails />
                <Divider className='my-4 border-t-8 w-[120%] -ml-[10%]' />
              </>
            )}
            <BuyButtons type={product?.type} />
            <Divider className='my-4 border-t-8 w-[120%] -ml-[10%]' />
            <UserData />
            <Features type={product?.type} />
            <Divider className='my-4 border-t-8 w-[120%] -ml-[10%]' />
            <OtherCollection />
          </>
        )}
      </Container>
    </ProductProvider>
  );
};

export default ProductPage;
