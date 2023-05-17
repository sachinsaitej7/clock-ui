import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Tabs, Typography } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirebase } from "@firebase-app";
import {
  useInstantProducts,
  useUserProfile,
  useUserSavedProducts,
  // useOnDemandProducts,
} from "./hooks";
import EmptyPage from "./empty-page";
import Spinner from "@components/Spinner";
import FilterDrawer from "@seller/components/Drawer";
import ProductView from "./product-view";

const StyledContainer = styled.div``;

const Collections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: ${(props) => props.theme.space[3]};
  align-content: center;
  align-items: center;
  gap: ${(props) => props.theme.space[3]};
  overflow: auto;
  @media (min-width: 330px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${(props) => props.theme.space[3]};
  }

  @media (min-width: 430px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
  .ant-tabs-tab-active {
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
  .ant-tabs-nav {
    margin-bottom: ${(props) => props.theme.space[3]};
  }
`;

const ProductsImage = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius[1]}};
`;

const Products = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState("instant");
  const { auth } = getFirebase();
  const [user, userLoading] = useAuthState(auth);
  const [profile, profileLoading] = useUserProfile(user?.uid);
  const [savedProducts, savedProductsLoading] = useUserSavedProducts(user?.uid);
  console.log("savedProducts", savedProducts);

  const [instantProducts, iLoading] = useInstantProducts(profile?.id);
  // const [onDemandProducts, dLoading] = useOnDemandProducts(store?.id);

  useEffect(() => {
    if (active === "instant") {
      instantProducts && setProducts(instantProducts);
    }
  }, [instantProducts, active]);

  const handleActive = (type) => {
    setActive(type);
  };

  const getChildren = () => {
    if (userLoading || profileLoading || savedProductsLoading || !products)
      return <Spinner />;
    const items = active === "instant" ? instantProducts : savedProducts;

    if (active === "instant" && items?.length === 0) return <EmptyPage />;
    if (active === "orders" && items?.length === 0)
      return (
        <Typography.Text
          style={{
            color: theme.colors.text,
            textAlign: "center",
            display: "block",
            margin: theme.space[6],
          }}
        >
          No Saved posts found
        </Typography.Text>
      );

    return (
      <Collections
        dataLength={items?.length || 0}
        next={() => {}}
        hasMore={false}
        loader={<Spinner />}
        key={active}
      >
        {items.map((product, index) => {
          return (
            <ProductsImage
              src={product.thumbnail}
              alt={product.name || product.description}
              key={product.id}
              onClick={() => {
                setActiveProduct(product);
                setOpen(true);
              }}
            />
          );
        })}
      </Collections>
    );
  };

  return (
    <StyledContainer>
      {iLoading ? (
        <Spinner />
      ) : (
        <StyledTabs
          activeKey={active}
          onChange={(key) => handleActive(key)}
          size='small'
          centered
          tabBarGutter={36}
          className='w-full'
          items={[
            {
              key: "instant",
              label: <h3>Posts ({products?.length || 0})</h3>,
              children: getChildren(),
              forceRender: true,
            },
            {
              key: "orders",
              label: <h3>Saved </h3>,
              children: getChildren(),
              forceRender: true,
            },
          ]}
        />
      )}

      {activeProduct && (
        <FilterDrawer
          open={open}
          title={null}
          onClose={() => {
            setActiveProduct(null);
            setOpen(false);
          }}
          closable
        >
          <ProductView
            product={activeProduct}
            handleClose={() => {
              setActiveProduct(null);
              setOpen(false);
            }}
          />
        </FilterDrawer>
      )}
    </StyledContainer>
  );
};

export default Products;
