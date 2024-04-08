import { AxiosRequestConfig } from "axios";
import { service as axios } from "@src/services/interceptors";
export function Api(url: string) {
  return {
    get<T = any>(config?: AxiosRequestConfig): Promise<T> {
      return axios.get(url, {
        headers: config?.headers,
        params: config?.params,
      });
    },
    put<T = any>(body: any, config?: AxiosRequestConfig): Promise<T> {
      return axios({ method: "PUT", url, data: body });
    },
    post<T = any>(body: any, config?: AxiosRequestConfig): Promise<T> {
      return axios({
        method: "POST",
        url,
        data: body,
        headers: config?.headers,
      });
    },
    delete<T = any>(body: any, config?: AxiosRequestConfig): Promise<T> {
      return axios({ method: "DELETE", url, data: body });
    },
  };
}
