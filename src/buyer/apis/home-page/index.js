import axios from "axios";

import { BASE_URL } from "../constants";

const fetchMalls = () => {
  return axios.get(`${BASE_URL}malls/`);
};

const fetchBrands = () => {
  return axios.get(`${BASE_URL}brand/`);
};

const fetchProducts = (params = {}) => {
  return axios.get(`${BASE_URL}product/`, { params });
};

export { fetchMalls, fetchBrands, fetchProducts };
