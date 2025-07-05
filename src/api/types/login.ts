// 登录接口类型
export interface ReqLogin {
  username: string
  password: string
}
export interface ResLogin {
  code: number
  message: string
  token: string
}

// 用户菜单列表
export interface ReqMenu {
  token: string
}
export interface ResMenu {
  code: number
  message: string
  data: any[]
}
