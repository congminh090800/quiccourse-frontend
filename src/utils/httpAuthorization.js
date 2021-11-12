import axios from "axios";
import env from "~/constants/env";
import endpoints from "~/constants/endpoints";
import httpNormal from "./http";
import { REFRESH_ACCESS_TOKEN } from "~/store/auth";
import { store } from "~/store";
const http = axios.create({
  baseURL: env.apiUrl,
  timeout: 60000,
});

http.interceptors.request.use(
  function (config) {
    const token = store.getState()?.auth?.accessToken;
    const tokenType =
      store.getState()?.auth?.user?.authenticationType || "native";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["access-token-type"] = tokenType;
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
    const authData = store.getState().auth;
    const err = (error.response && error.response.data) || error;
    if (error.response && error.response.status) {
      err.status = error.response.status;
    }
    if (err.message === "TokenExpiredError") {
      httpNormal
        .post(endpoints.refreshToken, {
          userId: authData?.user?._id,
          refreshToken: authData?.refreshToken || authData?.user?.refreshToken,
        })
        .then(function (response) {
          store.dispatch(REFRESH_ACCESS_TOKEN(response.data));
          return http.request(error.config);
        })
        .catch(function (error) {
          return Promise.reject(err);
        });
    }
    return Promise.reject(err);
  }
);

export default http;
