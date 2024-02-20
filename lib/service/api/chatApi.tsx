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
        localStorage.clear()
      return (window.location.href = "/auth/login");
    }
    return Promise.reject(error);
  }
);
export const getGroups = async () => {
  return axios
    .get(`${ENDPOINT.GET_MY_GROUPS}`)
    .then((response) => response.data);
};
export const getChatHistory = async (payload:any) => {
    return axios
      .get(`${ENDPOINT.GET_CHAT_HISTORY}`)
      .then((response) => response.data);
  };
