import axios from "axios";

import { BASE_URL } from "../constants";

export const fetchRazorpayOrder = (payload) => {
  return axios.post(`${BASE_URL}razorpay/order/`, payload);
};
