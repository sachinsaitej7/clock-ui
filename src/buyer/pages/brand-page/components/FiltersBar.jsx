import React, { useCallback } from "react";

import { Filters } from "@buyer/components";
import { FILTER_MAP } from "@buyer/constants";

import { useSizes } from "../hooks";

const getSizeFilter = (sizes) => {
  if (!sizes) return {};
  return {
    ...FILTER_MAP.size,
    options: sizes.reduce((acc, size) => {
      const options = size.values.map((value) => ({ label: value, value }));
      return acc.concat(options);
    }, []),
  };
};

const FiltersBar = ({ filterValues, setFilterValues }) => {
  const [sizes] = useSizes();

  const onApply = useCallback(
    (values) => {
      setFilterValues(values);
    },
    [setFilterValues]
  );

  return (
    <Filters
      filters={[FILTER_MAP.sort, getSizeFilter(sizes)]}
      values={filterValues}
      onApply={onApply}
    />
  );
};

export default FiltersBar;
