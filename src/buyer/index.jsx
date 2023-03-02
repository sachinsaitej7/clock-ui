import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import styled, { ThemeProvider } from "styled-components";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { ConfigProvider, App as AntdApp } from "antd";

import Store from "./store";

import { useCartData } from "buyer/hooks/useCartData";
import { useAuthData } from "buyer/hooks/useAuthData";
import { useOrderData } from "buyer/hooks/useOrderData";

import WithTopAndBottom from "buyer/wrappers/WithTopAndBottom";


const queryClient = new QueryClient();
const searchClient = algoliasearch(
  "UDBAYJ6DQU",
  "dc5a4e9e9349b8a467ee86976e4b9fc2"
);

const Root = styled.div`
  width: 100%;
  font-family: ${(props) => props.theme.fonts.primary};
  background-color: ${(props) => props.theme.bg.default};
  max-width: 768px;
  margin: 0 auto;
  p {
    margin: 0px;
    padding: 0px;
  }
`;

const { ThemeContext, CartContext, AuthContext } = Store;

function App() {
  const cartData = useCartData();
  const authData = useAuthData();
  const orderData = useOrderData(authData.user);


  const theme = useContext(ThemeContext);
  return (
    <QueryClientProvider client={queryClient}>
      <InstantSearch searchClient={searchClient} indexName='products'>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: theme.colors.primary,
              background: theme.bg.default,
              fontFamily: theme.fonts.primary,
            },
          }}
        >
          <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{ ...authData, ...orderData }}>
              <CartContext.Provider value={{ ...cartData }}>
                <AntdApp>
                  <WithTopAndBottom>
                    <Root>
                      <Outlet />
                    </Root>
                  </WithTopAndBottom>
                </AntdApp>
              </CartContext.Provider>
            </AuthContext.Provider>
          </ThemeProvider>
        </ConfigProvider>
      </InstantSearch>
    </QueryClientProvider>
  );
}

export default App;
