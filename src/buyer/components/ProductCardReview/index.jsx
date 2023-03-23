import React from "react";
import styled from "styled-components";

import { Typography } from "antd";
//images
import { MinusIcon, PlusIcon, ExclamationCircleIcon } from "@assets/icons";

import { formatCurrency } from "@buyer/utils";

const { Paragraph } = Typography;

const Container = styled.div``;

const QuantityCounter = ({ changeQuantity, item }) => {
  if (!item.status)
    return (
      <p className="text-red-500 my-2 flex items-center">
        <ExclamationCircleIcon width="16px" className="inline-block mr-1" />
        <span>Out of Stock</span>
      </p>
    );
  return (
    <div className="flex items-center justify-between w-20 rounded border border-gray-200 shadow p-0.5">
      <MinusIcon
        onClick={() => changeQuantity(item, false)}
        width="16px"
        className="cursor-pointer text-primary"
      />
      <p className="mx-2">{item.quantity || 1}</p>
      <PlusIcon
        onClick={() => changeQuantity(item, true)}
        width="16px"
        className="cursor-pointer text-primary"
      />
    </div>
  );
};

const ProductCardReview = ({
  removeItem = () => {},
  changeQuantity = () => {},
  onClick = () => {},
  ...item
}) => {
  const { thumbnail, name, price, brand } = item;
  return (
    <Container className="flex justify-start items-start w-full">
      <img
        src={thumbnail}
        alt={name}
        onClick={onClick}
        className="cursor-pointer mr-2 rounded w-[105px] h-[148px] object-cover"
      ></img>
      <div className="w-full">
        <h3 className="font-semibold mb-1">{brand.name}</h3>
        <Paragraph
          ellipsis={{ rows: 2, expandable: false }}
          className="text-gray-500"
        >
          {name}
        </Paragraph>
        <p>
          Size: <span>{item.size?.values || "NA"}</span>
        </p>
        <div className="flex justify-between items-center my-1">
          <QuantityCounter item={item} changeQuantity={changeQuantity} />
          <p>{formatCurrency(price.currentPrice)}</p>
        </div>
        <p
          className="text-red-500 font-semibold cursor-pointer"
          onClick={() => removeItem(item)}
        >
          Remove
        </p>
      </div>
    </Container>
  );
};

const ProductCardReviewNonEditable = ({ onClick, ...item }) => {
  const { thumbnail, name, price, brand } = item;
  return (
    <Container className="flex justify-start items-start w-full">
      <img
        src={thumbnail}
        alt={name}
        onClick={onClick}
        className="cursor-pointer mr-2 rounded w-[105px] h-[148px] object-cover"
      />
      <div className="w-full flex flex-col justify-between min-h-[148px]">
        <div>
          <h3 className="font-semibold mb-1">{brand.name}</h3>
          <Paragraph
            ellipsis={{ rows: 2, expandable: false }}
            className="text-gray-500"
          >
            {name}
          </Paragraph>
        </div>
        <div className="mt-2">
          <p>
            Size: <span>{item.size?.values || "NA"}</span>
          </p>
          <div className="flex justify-between items-center my-1">
            <p>Quantity: {item.quantity || 1}</p>
            <p>{formatCurrency(price.currentPrice)}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

ProductCardReview.NonEditable = ProductCardReviewNonEditable;

export default ProductCardReview;
