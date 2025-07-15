import { RouteItemType } from '@/routers/types/index.ts'

// user-modules Reducer 类型
export interface UserState {
  token: string
  userInfo: {
    name: string
    avatar: string
    [key: string]: string
  }
}

// auth-modules Reducer 类型
export interface AuthState {
  authMenuList: RouteItemType[]
}

// global-modules Reducer 类型
export interface GlobalState {
  isCollapse: boolean
  isOpenDrawer: boolean
  isDarkMode: boolean
  themeColor: string
  language: string
  borderRaduis: number
}
