// utils/axios.js
import axios from "axios";
import { getToken } from "../utils/cookie";

const axiosInstance = axios.create({
  // baseURL: "https://himstaging1.hp.gov.in/pm-kisan-survey-dashboard", // Set your API base URL
  baseURL: "https://himparivarservices.hp.gov.in/pm-kisan-survey-dashboard",
  headers: {
    "Content-Type": "text/plain", // Set the appropriate content type for your data
  },
});

const tokenData = getToken();

axiosInstance.interceptors.request.use((config) => {
  // Get the JWT token from your NextAuth.js session

  // try {
  //   if (JSON.parse(tokenData)) {
  //     const { userName, ulb, token, wardName, districtName } = JSON.parse(tokenData) || {};
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`
  //     }
  //   }

  // }

  // catch (err) {
  //   console.error(err)
  // }

  return config;
});

export default axiosInstance;
