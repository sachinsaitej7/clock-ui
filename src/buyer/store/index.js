import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks-web";
import WithTopAndBottom from "@buyer/hoc/WithTopAndBottom";

import { CartProvider } from "./CartProvider";
import { LoginProvider } from "./LoginProvider";

export * from "./CartProvider";
export * from "./LoginProvider";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);

export const AllProviders = ({ children }) => {
  return (
    <InstantSearch
      searchClient={{
        ...searchClient,
        search(requests) {
          if (requests.every(({ params }) => !params.query)) {
            return Promise.resolve({
              results: requests.map(() => ({
                hits: [],
                nbHits: 0,
                nbPages: 0,
                page: 0,
                processingTimeMS: 0,
                hitsPerPage: 0,
                exhaustiveNbHits: false,
                query: "",
                params: "",
              })),
            });
          }
          return searchClient.search(requests);
        },
      }}
      indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
    >
      <LoginProvider>
        <CartProvider>
          <WithTopAndBottom>{children}</WithTopAndBottom>
        </CartProvider>
      </LoginProvider>
    </InstantSearch>
  );
};
