import { uniqBy } from "lodash";

export default function generateFilters(products) {
  const allVariants = products
    .flatMap((product) => product.price_head)
    .flatMap((priceHead) => priceHead.price_line);

  const optionsMap = allVariants.reduce((acc, variant) => {
    if (acc[variant.variant_type_name]) {
      acc[variant.variant_type_name].push({
        label: variant.variant_name,
        value: variant.variant_id,
      });
    } else {
      acc[variant.variant_type_name] = [
        {
          label: variant.variant_name,
          value: variant.variant_id,
        },
      ];
    }
    return acc;
  }, {});

  const options = Object.keys(optionsMap).map((key) => ({
    label: key.toLowerCase(),
    options: uniqBy(optionsMap[key], (i) => i.value),
  }));

  return [{ label: "sort" }, ...options];
}
