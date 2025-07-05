import http from '@/api/index.ts'
import { ReqLogin, ResLogin, ReqMenu, ResMenu } from '@/api/types/login.ts'

// 登录接口
export const loginApi = (params: ReqLogin) => {
  return http.post<ResLogin>('/api/login', params)
}

// 获取菜单列表接口
export const getMenuListApi = (params: ReqMenu) => {
  return http.post<ResMenu>('/api/user/menus', params)
}
