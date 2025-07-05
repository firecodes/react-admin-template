/**
 * @description 服务器返回的状态码枚举
 */
export enum ResponseEnum {
  SUCCESS = 1, // 成功并且返回的数据正常
  ERROR = 500, // 失败
  UNAUTHORIZED = 401, // 未授权
  TIMEOUT = 30000, // 超时
  TYPE = 'success' // 成功类型
}

/**
 * @description 媒体类型枚举
 */
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8', // json
  TEXT = 'text/plain;charset=UTF-8', // text
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8', // form
  FORM_DATA = 'multipart/form-data;charset=UTF-8' // form-data
}
