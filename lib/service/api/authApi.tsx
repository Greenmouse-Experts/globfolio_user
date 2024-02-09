import axios from "axios";
import * as ENDPOINT from '../constant'
import { getToken } from "../helpers";

axios.defaults.baseURL = ENDPOINT.BASE_URL;
axios.defaults.headers.common["Authorization"] = getToken();
axios.interceptors.request.use(
  function(config) {
    const token = getToken(); 
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
      //   localStorage.clear()
      // return (window.location.href = "/auth/login");
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

export const googleSignup = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.REGISTER_WITH_GOOGLE}`, payload)
    .then((response) => response.data);
};

export const googleSignin = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.LOGIN_WITH_GOOGLE}`, payload)
    .then((response) => response.data);
};

export const updateProfilePhoto = async (payload:FormData) => {
  return axios
    .post(`${ENDPOINT.UPDATE_AVATAR}`, payload)
    .then((response) => response.data);
};

export const updateProfile = async (payload:any) => {
  return axios
    .patch(`${ENDPOINT.UPDATE_PROFILE}`, payload)
    .then((response) => response.data);
};

export const updatePassword = async (payload:any) => {
  return axios
    .patch(`${ENDPOINT.UPDATE_PASSWORD}`, payload)
    .then((response) => response.data);
};