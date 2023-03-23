import { createContext, useContext, useState, useLayoutEffect } from "react";
import {
  useInstantSearch,
  useInfiniteHits,
} from "react-instantsearch-hooks-web";
import { createInfiniteHitsSessionStorageCache } from "instantsearch.js/es/lib/infiniteHitsCache";

import debounce from "lodash/debounce";

import { logAnalyticsEvent } from "@firebase-app/utils";

const INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME;

const sessionStorageCache = createInfiniteHitsSessionStorageCache();

function googleAnalyticsMiddleware() {
  const sendEventDebounced = debounce((uiState) => {
    const { query, ...rest } = uiState[INDEX_NAME] || {};
    const search_term = query;
    search_term &&
      logAnalyticsEvent("search", {
        search_term,
        ...rest,
      });
  }, 2000);

  return {
    onStateChange({ uiState }) {
      sendEventDebounced(uiState);
    },
    subscribe() {},
    unsubscribe() {},
  };
}

function Middleware() {
  const { use } = useInstantSearch();

  useLayoutEffect(() => {
    return use(googleAnalyticsMiddleware);
  }, []);

  return null;
}

const SearchContext = createContext();

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

export function SearchProvider({ children }) {
  const [searchMode, setSearchMode] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchMode,
        setSearchMode,
      }}
    >
      <Middleware />
      {children}
    </SearchContext.Provider>
  );
}

export function useHitsData() {
  return useInfiniteHits({
    cache: sessionStorageCache,
  });
}
