import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import moment from "moment";
import { Divider, Typography, App } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import { processResults } from "buyer/utils/searchService";

import { generateFilters } from "buyer/utils";

import { useProductsByProfile, useUserProfile, useUserFollower } from "./hooks";
import { StyledNameContainer, StyledButton } from "./styled";

import Filters from "buyer/shared-components/Filters";
import ProductCard from "buyer/shared-components/ProductCard";
import Spinner from "buyer/shared-components/Spinner";
import { ReactComponent as ArrowLongLeft } from "buyer/assets/common/arrow-long-left.svg";
import { ReactComponent as Calender } from "app/assets/common/calender.svg";

import { getParams } from "./utils";

const ProfilePageContainer = styled.div`
  width: 100%;
  padding-bottom: ${(props) => props.theme.space[5]};
  min-height: 100vh;
`;

const Collections = styled(InfiniteScroll)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: ${(props) => props.theme.space[3]};
  align-content: center;
  gap: ${(props) => props.theme.space[3]};
  @media (min-width: 330px) {
    padding: ${(props) => props.theme.space[5]};
    gap: ${(props) => props.theme.space[5]};
  }

  @media (min-width: 430px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const DEFAULT_VALUE = { sort: ["relevance"] };

const ProfilePage = () => {
  const { message } = App.useApp();
  const [lastSnapshot, setLastSnapshot] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const [products, setProducts] = useState([]);
  const [filterValues, setFilterValues] = useState(DEFAULT_VALUE);

  const [profileData, profileLoading] = useUserProfile(params.id);
  const {
    userFollowerId,
    addFollow,
    removeFollow,
    loading: userFollowerLoading,
    error,
  } = useUserFollower(profileData);
  const [productsData, productsLoading, , snapshot] = useProductsByProfile(
    params.id,
    lastSnapshot
  );

  useEffect(() => {
    if (productsData) setProducts([...products, ...productsData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsData]);

  useEffect(() => {
    if (error) message.error(error.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (productsLoading && !lastSnapshot) return <Spinner />;
  if (products.length === 0)
    return (
      <div
        style={{ height: "60vh", textAlign: "center", padding: theme.space[5] }}
      >
        No products found
      </div>
    );

  const { searchedResults, sortedResults } = processResults(
    products,
    undefined,
    filterValues
  );

  const filters = generateFilters(searchedResults);

  if (profileLoading) return <Spinner />;

  return (
    <ProfilePageContainer>
      <div>
        <div
          style={{
            height: "84px",
            backgroundColor: theme.bg.primary,
          }}
        >
          <ArrowLongLeft
            width='24px'
            onClick={() => navigate(-1)}
            style={{
              cursor: "pointer",
              margin: theme.space[5] + " " + theme.space[3],
            }}
          />
        </div>
        <StyledNameContainer>
          <img src={profileData.logo} alt='logo'></img>
          <div className='name'>
            <Typography.Title level={5}>{profileData.name}</Typography.Title>
            {userFollowerId ? (
              <StyledButton
                size='small'
                onClick={() => removeFollow()}
                loading={userFollowerLoading}
              >
                Following
              </StyledButton>
            ) : (
              <StyledButton
                type='primary'
                size='small'
                onClick={() => addFollow()}
                loading={userFollowerLoading}
              >
                Follow
              </StyledButton>
            )}
          </div>
          <p>
            <span>
              {profileData.followers?.count > 0
                ? profileData.followers?.count
                : 0}
            </span>{" "}
            followers
            <span
              style={{
                margin: `0px ${theme.space[3]}`,
                width: "4px",
                height: "4px",
                background: "#D9D9D9",
                borderRadius: "50%",
                verticalAlign: "middle",
              }}
            ></span>
            <span>{products.length || 0}</span> listed products
          </p>
          <p>{profileData.description || "No Description"}</p>
          <div
            style={{
              color: theme.text.light,
              fontSize: theme.fontSizes[2],
              display: "flex",
              alignContent: "center",
            }}
          >
            <Calender width='14px' />
            <span
              style={{ marginLeft: theme.space[3] }}
            >{`Seller since ${moment(profileData.createdAt.toDate()).format(
              "MMMM YYYY"
            )}`}</span>
          </div>
        </StyledNameContainer>
      </div>
      <Divider style={{ margin: theme.space[3] + " " + theme.space[0] }} />
      <div style={{ padding: theme.space[3] }}>
        <Filters
          filters={filters}
          onApply={setFilterValues}
          values={filterValues}
        />
      </div>
      {sortedResults.length > 0 ? (
        <>
          <p
            style={{
              color: theme.text.light,
              fontSize: theme.fontSizes[1],
              margin: "0px " + theme.space[5],
            }}
          >
            Showing {sortedResults.length} products
          </p>
          <Collections
            dataLength={products.length}
            next={() => setLastSnapshot(snapshot)}
            hasMore={
              !productsLoading &&
              productsData.length > 0 &&
              !products.length < 25
            }
            loader={<Spinner />}
          >
            {sortedResults.map((product, index) => {
              return (
                <ProductCard
                  key={product.id + "-" + index}
                  {...product}
                  variant={window.innerWidth < 330 ? "small" : "large"}
                  onClick={() =>
                    navigate(`/product-page/${product.slug}?id=${product.id}`)
                  }
                />
              );
            })}
          </Collections>
        </>
      ) : (
        <div
          style={{
            height: "60vh",
            textAlign: "center",
            padding: theme.space[5],
          }}
        >
          {"No products found"}
        </div>
      )}
    </ProfilePageContainer>
  );
};

export default ProfilePage;
