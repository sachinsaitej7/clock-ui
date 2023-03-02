import axios from "axios";

import { BASE_URL } from "../constants";

const fetchProduct = (id) => {
  return axios.get(`${BASE_URL}product/?product_id=${id}`);
};

export { fetchProduct };
