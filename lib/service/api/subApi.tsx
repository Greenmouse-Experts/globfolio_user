import axios from "axios";
import * as ENDPOINT from '../constant'
import { getToken } from "../helpers";
import { UpgradeSubInput, VerifyUpgradeSubInput, VerifyUserSubInput } from "@/lib/contracts/subs";

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
        localStorage.clear()
      return (window.location.href = "/auth/login");
    }
    return Promise.reject(error);
  }
);

export const fetchAllSubs = async () => {
  return axios
    .get(`${ENDPOINT.GET_SUBSCRIPTIONS}`)
    .then((response) => response.data);
};

export const fetchSingleSubs = async (payload:string) => {
  return axios
    .get(`${ENDPOINT.GET_SUBSCRIPTIONS}/${payload}`)
    .then((response) => response.data);
};

export const verifySubPayment = async (payload:VerifyUserSubInput) => {
  return axios
    .post(`${ENDPOINT.VERIFY_SUB_PAYMENT}`, payload)
    .then((response) => response.data);
};


export const verifyUpgradeSub = async (payload:VerifyUpgradeSubInput) => {
  return axios
    .post(`${ENDPOINT.VERIFY_UPGRADE_SUB}`, payload)
    .then((response) => response.data);
};

export const upgradeSub = async (payload:UpgradeSubInput) => {
  return axios
    .post(`${ENDPOINT.UPGRADE_SUB}`, payload)
    .then((response) => response.data);
};
