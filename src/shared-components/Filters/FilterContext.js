import { createContext } from "react";

export const FilterContext = createContext({
  filterValues: null,
  setFilterValues: () => {},
  selectedFilter: null,
  values: null,
  handleApply: () => {},
});
