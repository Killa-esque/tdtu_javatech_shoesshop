import axios from "axios";
import { USER_TOKEN, getStore } from "../utils/config";
export const BASE_URL = "http://localhost:8080";

export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: `Bearer ${getStore(USER_TOKEN)}`
  },
});

// khi gọi api
// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // console.log("start");
    // store_toolkit.dispatch(setLoadingOn());
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// khi api từ server về
// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // console.log("end");
    // store_toolkit.dispatch(setLoadingOff());
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
