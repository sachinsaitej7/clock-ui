import { uniq } from "lodash";

export default function generateFilters(products) {
  const allVariants = products;

  const optionsMap = allVariants.reduce((acc, variant) => {
    if (variant["color"])
      acc["colour"] = [...(acc["colour"] || []), variant["color"].name];
    if (variant["size"])
      acc["size"] = [...(acc["size"] || []), variant["size"].values];
    return acc;
  }, {});

  const options = Object.keys(optionsMap).map((key) => ({
    label: key.toLowerCase(),
    options: uniq(optionsMap[key]).map((value) => ({
      label: value,
      value,
    })),
  }));

  return [{ label: "sort" }, ...options];
}
