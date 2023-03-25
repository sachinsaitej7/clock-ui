import React, { useState, useCallback } from "react";
import { useSortBy, useSearchBox } from "react-instantsearch-hooks-web";

import { SORT_BY_OPTIONS, FILTER_MAP } from "@buyer/constants";
import { Filters } from "@buyer/components";
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

const FiltersBar = () => {
  const { query } = useSearchBox();
  const { refine, currentRefinement } = useSortBy({
    items: SORT_BY_OPTIONS,
  });
  const [values, setValues] = useState({ sort: [currentRefinement] });
  const [sizes] = useSizes();

  const onApply = useCallback(
    (values, { key }) => {
      if (key === "sort") refine(values[key][0]);
      setValues(values);
    },
    [refine]
  );

  if (!query) return null;

  return (
    <Filters
      filters={[FILTER_MAP.sort, getSizeFilter(sizes)]}
      values={values}
      onApply={onApply}
    />
  );
};

export default FiltersBar;
