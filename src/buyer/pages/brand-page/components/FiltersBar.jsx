import React, { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Filters } from "@buyer/components";
import { FILTER_MAP, DEFAULT_VALUE } from "@buyer/constants";

import { useSizes } from "../hooks";
import { getParams } from "../utils";

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
  const [sizes] = useSizes();
  const [searchParams, setSearchParams] = useSearchParams();

  const values = useMemo(
    () => ({
      sort: searchParams.get("sort")
        ? searchParams.getAll("sort")
        : DEFAULT_VALUE.sort,
      size: searchParams.get("size") ? searchParams.getAll("size") : undefined,
    }),
    [searchParams]
  );

  const onApply = useCallback(
    (values) => {
      const params = getParams(searchParams);
      setSearchParams({ ...params, ...values });
    },
    [searchParams, setSearchParams]
  );

  return (
    <Filters
      filters={[FILTER_MAP.sort, getSizeFilter(sizes)]}
      values={values}
      onApply={onApply}
    />
  );
};

export default FiltersBar;
