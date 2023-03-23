import React, { useState } from "react";

import { FilterProvider } from "./FilterProvider";
import FiltersBar from "./FiltersBar";
import FilterDrawer from "./Drawer";

const Filters = ({ filters = [], values = {}, onApply = () => {} }) => {
  const [open, setOpen] = useState(false);

  return (
    <FilterProvider values={values} onApply={onApply}>
      <FiltersBar filters={filters} onClick={() => setOpen(true)} />
      <FilterDrawer open={open} onClose={() => setOpen(false)} />
    </FilterProvider>
  );
};

Filters.Drawer = FilterDrawer;

export default Filters;
