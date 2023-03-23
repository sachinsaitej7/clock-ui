export const SORT_BY_OPTIONS = [
  { label: "Relevance", value: "products" },
  { label: "Price: Low to High", value: "products_current_price_asc" },
  { label: "Price: High to Low", value: "products_current_price_desc" },
];

export const FILTER_MAP = {
  sort: {
    label: "Sort",
    title: "Sort by",
    key: "sort",
    type: "single_select",
    optionType: "radio",
    options: SORT_BY_OPTIONS,
  },

  colour: {
    label: "Colour",
    title: "Colour",
    key: "colour",
    type: "multi_select",
    height: "380px",
    options: [
      {
        label: "Red",
        value: "red",
      },
      {
        label: "Blue",
        value: "blue",
      },
      {
        label: "Green",
        value: "green",
      },
      {
        label: "Yellow",
        value: "yellow",
      },
      {
        label: "Black",
        value: "black",
      },
      {
        label: "White",
        value: "white",
      },
      {
        label: "Orange",
        value: "orange",
      },
    ],
  },
  size: {
    label: "Size",
    title: "Size",
    key: "size",
    type: "multi_select",
    height: "340px",
    options: [
      {
        label: "S",
        value: "s",
      },
      {
        label: "M",
        value: "m",
      },
      {
        label: "L",
        value: "l",
      },
      {
        label: "XL",
        value: "xl",
      },
      {
        label: "XXL",
        value: "xxl",
      },
      {
        label: "XXXL",
        value: "xxxl",
      },
    ],
  },
  price: {
    label: "Price",
    title: "Price",
    key: "price",
    type: "range",
    options: [
      {
        label: "Min",
        value: 0,
      },
      {
        label: "Max",
        value: 1000,
      },
    ],
  },
};
