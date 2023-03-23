import React from "react";
import styled, { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import isEmpty from "lodash/isEmpty";
import { useSearchBox } from "react-instantsearch-hooks-web";

import { useSubcategories } from "../hooks";

import { ChevronRightIcon } from "@assets/icons";
import { ArrowTrendingUpIcon } from "@buyer/assets/icons";

const TrendingContainer = styled.div`
  margin-top: ${(props) => props.theme.space[7]};
`;

const StyledTag = styled.div`
  height: 32px;
  font-size: ${(props) => props.theme.fontSizes[2]};
  line-height: 16px;
  color: ${(props) => props.theme.text.dark};
  border-radius: ${(props) => props.theme.borderRadius[1]};
  padding: ${(props) => props.theme.space[3] + " " + props.theme.space[4]};
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const TrendingCategories = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [subcategories, loading, ...rest] = useSubcategories();
  const { query } = useSearchBox();

  const handleClick = ({ slug, id }) => {
    navigate(`/products/${slug}?subcategory=${id}`);
  };

  if (loading) return <Skeleton active className="my-4 w-full" title={null} />;

  if (isEmpty(subcategories) || query) return null;
  return (
    <TrendingContainer className="text-left w-full">
      <div className="mb-4">
        <span className="mr-2 text-primary">
          <ArrowTrendingUpIcon width="20px" className="inline" />
        </span>
        <span
          style={{
            fontSize: theme.fontSizes[2],
            color: theme.text.light,
          }}
        >
          Trending in search
        </span>
      </div>
      <div className="flex flex-wrap items-center">
        {subcategories.slice(0, 9).map((item) => {
          return (
            <StyledTag
              key={item.id}
              onClick={() => handleClick(item)}
              className="inline-block cursor-pointer mb-2 mr-2"
            >
              <span>{item.name}</span>
              <ChevronRightIcon width="16px" className="inline" />
            </StyledTag>
          );
        })}
      </div>
    </TrendingContainer>
  );
};

export default TrendingCategories;
