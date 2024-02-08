import axios from "axios";
import * as ENDPOINT from '../constant'
import { getBearerToken, getToken } from "../helpers";

axios.defaults.baseURL = ENDPOINT.BASE_URL;
axios.defaults.headers.common["Authorization"] = getBearerToken();
axios.interceptors.request.use(
  function(config) {
    const token = getBearerToken(); 
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
        localStorage.clear()
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);
export const registerUser = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.REGISTER_USER}`, payload)
    .then((response) => response.data);
};

export const loginUser = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.LOGIN_USER}`, payload)
    .then((response) => response.data);
};

export const verifyUser = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.VERIFY_MAIL}`, payload)
    .then((response) => response.data);
};

export const resendCode = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.RESEND_VERIFY_MAIL}`, payload)
    .then((response) => response.data);
};

export const forgetPass = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.FORGET_PASSWORD}`, payload)
    .then((response) => response.data);
};

export const resetPass = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.RESET_PASSWORD}`, payload)
    .then((response) => response.data);
};