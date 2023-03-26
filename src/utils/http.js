import axios from 'axios'
import { getToken } from "./token";
import { history } from "./history";

// 创建axios实例，并配置baseURL
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
  // Do something before request is sent
  // if not login add token 请求拦截器注入token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // 处理token失效---当token失效时调接口，后端会返回一个401的状态码，此时需要跳回到登录页
  console.dir(error)
  if (error.response.status === 401) {
    // 此时需要跳回登录页面
    history.push('/login')
  }

  return Promise.reject(error);
});

export { http }