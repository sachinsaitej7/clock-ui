import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "antd";

import { useAppMode } from "@app/store";
import { ArrowRightCircleIcon } from "@assets/icons";
import { SparklesIcon } from "@buyer/assets/icons";

import { useSearch } from "../store/SearchProvider";

const StyledCard = styled(Card)`
  background: #252629;
  height: 138px;
  margin-top: ${(props) => props.theme.space[7]};
  padding: ${(props) => props.theme.space[5]};
  cursor: pointer;
  border-radius: 8px;
  .ant-card-body {
    padding: 0;
  }

  p {
    font-size: ${(props) => props.theme.fontSizes[1]};
  }

  .heading {
    font-family: "Crimson Pro";
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-size: ${(props) => props.theme.fontSizes[5]};

    background: linear-gradient(
      90deg,
      #956d18 -7.22%,
      #ffe5be 53.04%,
      #956d18 108.33%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .tap-here {
    margin-top: ${(props) => props.theme.space[5]};
    p {
      background: linear-gradient(
        90deg,
        #956d18 -7.22%,
        #ffe5be 53.04%,
        #956d18 108.33%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
`;

const SellBanner = () => {
  const { setMode } = useAppMode();
  const { searchMode } = useSearch();
  const [sellerBannerClick, setSellerBannerClick] = useState(true);

  useEffect(() => {
    const sellerBannerClick = localStorage.getItem("sellerBannerClick");
    if (!sellerBannerClick) setSellerBannerClick(false);
  }, []);

  const handleClick = () => {
    localStorage.setItem("sellerBannerClick", true);
    setMode("seller");
  };

  if (sellerBannerClick || searchMode) return null;

  return (
    <StyledCard className="w-full" onClick={handleClick}>
      <div className="heading flex justify-start">
        <SparklesIcon
          width="24px"
          className="inline-block mr-1 text-[#956D18]"
        />
        <h3>Introducing Shop & Sell</h3>
      </div>
      <p className="text-white">
        Earn some extra money by listing products from our partner stores
      </p>
      <div className="tap-here flex justify-start items-center">
        <p>Tap here to know more</p>
        <ArrowRightCircleIcon
          width="24px"
          className="inline-block ml-1"
          fill="#956D18"
        />
      </div>
    </StyledCard>
  );
};

export default SellBanner;
