import * as ProductQuery from "./products";
import * as CategoryQuery from "./categories";

const Query = {
  ...ProductQuery,
  ...CategoryQuery,
};

console.log(Query);

export default Query;
