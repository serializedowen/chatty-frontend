import axios from "axios";
import CONFIG from "./index";
// import EventEmitter from "../utils/eventEmitter";
import cookie from "../utils/cookie";

const { EventEmitter } = window;

const instance = axios.create({
  baseURL: `http://${CONFIG.HOST}:${CONFIG.PORT}`,
  timeout: 5000,
  withCredentials: true
});

instance.eventEmitter = new EventEmitter();

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = cookie.getCookie("chattytoken");
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  resolve => resolve,
  err => {
    instance.eventEmitter.emit("network error", "an error");
    return Promise.reject(err);
  }
);

export default instance;
// export
