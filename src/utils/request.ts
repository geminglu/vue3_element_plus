import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import { ResultType } from '#/request';
import useUserStore from '@/store/modules/user';
import router from '@/router';

const userStore = useUserStore();

const axiosDefault: AxiosInstance = axios.create({
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  withCredentials: true,
  baseURL: process.env.VUE_APP_BASE_URL,
});

function handelError(error: AxiosError<ResultType>) {
  switch (error.status) {
    case 401:
      router.push({ path: '/signIn', query: { to: router.currentRoute.value.fullPath } });
      userStore.logout();
      break;
    default:
      ElMessage({
        showClose: true,
        message: error.response?.data?.message || error.message,
        type: 'error',
        grouping: true,
      });
      break;
  }
}

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
axiosDefault.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer ' + userStore.access_token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosDefault.interceptors.response.use(
  (response: AxiosResponse<ResultType>) => {
    // removeSource(response.config);
    if (!response.data.success) {
      ElMessage({
        showClose: true,
        message: response.data.message,
        type: 'error',
        grouping: true,
      });
      return Promise.reject(response);
    }
    return Promise.resolve(response);
  },
  (error: AxiosError<ResultType>) => {
    handelError(error);
    return Promise.reject(error);
  }
);

/**
 * request
 * @param config
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function request<T = any>(config: AxiosRequestConfig) {
  return new Promise<ResultType<T>>((resolve, reject) => {
    axiosDefault
      .request<ResultType<T>>(config)
      .then((response: AxiosResponse<ResultType<T>>) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default axiosDefault;
