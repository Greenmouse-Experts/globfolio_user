import axios from "axios";
import * as ENDPOINT from "../constant";
import { getToken } from "../helpers";

axios.defaults.baseURL = ENDPOINT.BASE_URL;
axios.defaults.headers.common["Authorization"] = getToken();
axios.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      return (window.location.href = "/auth/login");
    }
    return Promise.reject(error);
  }
);

export const getMyNotify = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_NOTIFY}/${id}`)
    .then((response) => response.data);
};

export const markNotify = async (id: string) => {
  return axios
    .patch(`${ENDPOINT.MARK_READ}/${id}`)
    .then((response) => response.data);
};

export const deleteNotify = async (id: string) => {
  return axios
    .delete(`${ENDPOINT.DELETE_NOTIFY}/${id}`)
    .then((response) => response.data);
};

export const getChart = async () => {
  return axios
    .get(`${ENDPOINT.GET_CHARTS}`)
    .then((response) => response.data);
};
