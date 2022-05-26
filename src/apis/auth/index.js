import axios from "axios";
import { BASE_URL } from "../constants";


const verifyToken = (token) => { 
    return axios.get(`${BASE_URL}api/customer/login/?id_token=${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
};

export {
    verifyToken,
}