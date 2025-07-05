import axios from 'axios'
import { ResponseEnum } from './types/httpEnum.ts'
import { checkStatus } from './helper/checkStatus.ts'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

const defaultConfig = {
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  timeout: 50000,
  withCredentials: false
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    // 请求拦截器
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 请求前应该做些什么...
        this.requestLog(config)
        return config
      },
      (error: AxiosError) => {
        // 请求错误应该做些什么...
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        // 客户端收到请求后（状态码在200的范围内）应该做些什么...
        const { data } = response
        this.responseLog(response)
        if (data.code === ResponseEnum.UNAUTHORIZED) {
          checkStatus(401)
          return Promise.reject(data)
        }
        if (data.code !== ResponseEnum.SUCCESS) {
          checkStatus(NaN, data.message)
          return Promise.reject(data)
        }
        return data
      },
      (error: AxiosError) => {
        // 客户端收到请求后（状态码不在200的范围内）应该做些什么...
        const { response } = error
        //请求超时网络异常等其他原因，服务器没作出回应
        if (error.message.indexOf('timeout') !== -1) checkStatus(NaN, '请求超时,请稍后重试！')
        if (error.message.indexOf('Network Error') !== -1) checkStatus(NaN, '网络异常，请稍后重试！')
        // 请求已发出，并且服务器也做出了回应
        if (response) checkStatus(response.status)
        return Promise.reject(error)
      }
    )
  }

  // 请求方式
  get(url: string, params?: object, _config = {}) {
    return this.service.get(url, { params, ..._config })
  }
  post<T>(url: string, params?: object, _config = {}): Promise<T> {
    return this.service.post(url, params, _config)
  }
  put(url: string, params?: object, _config = {}) {
    return this.service.put(url, params, _config)
  }
  delete(url: string, params?: object, _config = {}) {
    return this.service.delete(url, { params, ..._config })
  }

  // 日志输出
  requestLog(config: AxiosRequestConfig) {
    if (import.meta.env.MODE === 'development') {
      const { url, params, method } = config
      const logInfoData = {
        ['路径']: url,
        ['方式']: method,
        ['参数']: params
      }

      // 下面进入整活阶段
      const logInfoStyle = `
       font-family:"华文彩云";
		   font-size:14px;
       color:#1677ff;
		   font-weight:bolder;`
      console.log('%c请求信息：', logInfoStyle, logInfoData)
    }
  }
  responseLog(config: AxiosResponse) {
    if (import.meta.env.MODE === 'development') {
      const logInfoStyle = `
       font-family:"华文彩云";
		   font-size:14px;
       color:#52c41a;
		   font-weight:bolder;`
      console.log('%c响应信息：', logInfoStyle, config.data)
    }
  }
}

export default new RequestHttp(defaultConfig)
