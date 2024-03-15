import axios from "axios";
import * as ENDPOINT from "../constant";
import { getToken } from "../helpers";
import { PicksInput } from "@/lib/contracts/utils";

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

export const fetchFreePick = async (page: number) => {
  return axios
    .get(`${ENDPOINT.GET_FREE_PICKS}?page=${page}`)
    .then((response) => response.data);
};
export const fetchAllPicks = async (page: number) => {
  return axios
    .get(`${ENDPOINT.GET_ALL_PICKS}?page=${page}`)
    .then((response) => response.data);
};

export const fetchSinglePick = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_ALL_PICKS}/${id}`)
    .then((response) => response.data);
};

export const fetchSingleSavePick = async (payload:PicksInput ) => {
  return axios
    .get(`${ENDPOINT.GET_SINGLE_SAVED_PICK}?userId=${payload.userId}&stockAdvisoryId=${payload.stockId}`)
    .then((response) => response.data);
};

export const fetchSavePick = async (id:string) => {
  return axios
    .get(`${ENDPOINT.GET_SAVED_PICK}/${id}`)
    .then((response) => response.data);
};

export const saveUserPick = async (payload:PicksInput) => {
  return axios
    .post(`${ENDPOINT.SAVE_PICK}?userId=${payload.userId}&stockAdvisoryId=${payload.stockId}`)
    .then((response) => response.data);
};

export const deleteUserPick = async (payload:PicksInput) => {
  return axios
    .delete(`${ENDPOINT.DELETE_SAVED_PICK}?userId=${payload.userId}&stockAdvisoryId=${payload.stockId}`)
    .then((response) => response.data);
};
