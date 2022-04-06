import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const request = axios.create({
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  withCredentials: true,
});

const CancelToken = axios.CancelToken;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sources: Array<{ umet: string; cancel: any }> = []; // 定义数组用于存储每个ajax请求的取消函数及对应标识

/**
 * 请求防抖当一个url地址被请求多次就会取消前一次请求
 * @method removeSource
 */
function removeSource(config: AxiosRequestConfig) {
  for (const source in sources) {
    // 当多次请求相同时，取消之前的请求
    if (sources[source].umet === config.url + '&' + config.method) {
      sources[source].cancel('取消请求');
      sources.splice(Number(source), 1);
    }
  }
}

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removeSource(config);
    config.cancelToken = new CancelToken((c: unknown) => {
      // 将取消函数存起来
      sources.push({ umet: config.url + '&' + config.method, cancel: c });
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    removeSource(response.config);
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
