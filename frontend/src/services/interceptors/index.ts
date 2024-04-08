/**
 * @description axios拦截器统一拦截接口请求响应
 * 注意直接使用axios.get或者axios.post，当前拦截器并不会生效，必须使用当前实例service.get或者service.post才会生效
 * @author maicFir
 */
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

import { message as Message } from "@/components/global/message";
interface ResponseData {
  code: number;
  message: string;
  data: any;
  // 其他属性...
}
import { storageUtils } from "@utils/index";
export const service: AxiosInstance = axios.create({
  baseURL: "", // url = base url + request url
  timeout: 30000, // request timeout
}) as any;

const IsNotWebSite = (url: string) => {
  return url.startsWith("/");
};
// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig & any) => {
    // 排出其他非本站域名，不添加请求头防止跨域问题
    if (IsNotWebSite(config.url)) {
      if (config.headers) {
        // 请求头添加authorToken,以及公用请求头
        const { access_token: authToken } = { access_token: "" };
        const resetHeaders = authToken
          ? {
              ["x-token"]: authToken,
            }
          : {};
        config.headers = Object.assign(resetHeaders, config.headers);
      }
    }
    return config;
  },
  (error: any) => {
    // 对请求错误做些什么
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res: ResponseData = response.data;
    // 如果响应状态码不是 200，就抛出一个错误
    if (response.status !== 200) {
      return Promise.reject(res);
    } else {
      const {
        code,
        message: msg = "The request is abnormal, please try again later",
        data,
      } = res;
      if (code === 200) {
        // responseAll 返回全部
        if (response.config.headers.responseAll) {
          return Promise.resolve(res);
        }
        return Promise.resolve(data);
      } else {
        if (response.config.headers.responseAll) {
          return Promise.resolve(res);
        }
        if (!response.config.headers.message) {
          if (code === 403) {
            Message.alert({
              msg: "Your login has expired. Please relink your wallet and log in again.",
              type: "error",
            });
          } else {
            // window.alert(msg);
            Message.alert({
              msg,
              type: "error",
            });
          }
        }
        return Promise.reject(data);
      }
    }
  },
  (error: any) => {
    // 对响应错误做点什么
    console.log("err" + error); // for debug
    console.log(error);
    if (error.type === "error") {
      return Promise.reject(error);
    }
    if (error.code === "ERR_NETWORK") {
      return Promise.reject(error);
    }
    const { message = "Network Error", response } = error ?? {};

    const { status, config } = response ?? {};

    // 401  没有权限
    if ([401, 403].includes(status)) {
      return Promise.resolve(error.response);
    }
    // 登录过期
    if (status === 403) {
      Message.alert({
        type: "error",
        msg: message,
      });
    }
    return Promise.reject(error);
  }
);
