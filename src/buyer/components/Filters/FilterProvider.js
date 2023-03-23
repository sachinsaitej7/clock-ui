import { createContext, useState, useContext } from "react";

export const FilterContext = createContext();

export const useFilterContext = () => {
  const result = useContext(FilterContext);
  if (result === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return result;
};

export const FilterProvider = ({ children, values, onApply }) => {
  const [selectedFilter, setSelectedFilter] = useState({});
  const [filterValues, setFilterValues] = useState(values);

  return (
    <FilterContext.Provider
      value={{
        filterValues,
        setFilterValues,
        selectedFilter,
        setSelectedFilter,
        values,
        onApply,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
