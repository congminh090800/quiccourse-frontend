import axios from "axios";
import env from "~/constants/env";
import { store } from "~/store";
const http = axios.create({
  baseURL: env.apiUrl,
  timeout: 60000,
});

http.interceptors.request.use(
  function (config) {
    const token = store.getState()?.auth?.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // Return JSON data
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const err = (error.response && error.response.data) || error;
    if (error.response && error.response.status) {
      err.status = error.response.status;
    }

    return Promise.reject(err);
  }
);

export default http;
