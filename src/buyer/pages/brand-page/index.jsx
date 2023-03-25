import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ArrowLongLeftIcon } from "@assets/icons";

import FiltersBar from "./components/FiltersBar";
import Collections from "./components/Collections";
import BrandCard from "./components/BrandCard";
import { DEFAULT_VALUE } from "@buyer/constants";


const BrandPageContainer = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.space[5]};
`;

const Header = styled.div`
  p {
    font-size: ${(props) => props.theme.fontSizes[5]};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    line-height: 120%;
  }
`;

const BrandPage = () => {
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState(DEFAULT_VALUE);

  return (
    <BrandPageContainer>
      <Header>
        <div className='flex items-center mb-4'>
          <ArrowLongLeftIcon
            width='24px'
            onClick={() => navigate(-1)}
            className='cursor-pointer'
          />
        </div>
      </Header>
      <BrandCard />
      <FiltersBar
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
      <Collections filterValues={filterValues} />
    </BrandPageContainer>
  );
};

export default BrandPage;
