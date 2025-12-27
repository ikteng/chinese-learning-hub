// src/api/UserApi.js
import axios from "axios";
import { REST_HOSTNAME } from "../Config";

const axiosInstance = axios.create({
  baseURL: REST_HOSTNAME,
});

// Add request interceptor to include JWT token
axiosInstance.interceptors.request.use(
  function (config) {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers["x-access-token"] = jwt;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const UserApi = {
  login: function ({ email, password }) {
    return axiosInstance.request({
      method: "POST",
      url: "/api/login",
      data: { email, password },
    });
  },

  signup: function ({ username, email, password }) {
    return axiosInstance.request({
      method: "POST",
      url: "/api/signup",
      data: { username, email, password },
    });
  },

};
