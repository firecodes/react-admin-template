import { RouteObject } from 'react-router-dom'

// 路由源信息接口
export interface RouteMeta {
  key?: string //用于匹配相关路由对象的标识符
  icon?: string //一般用于菜单渲染的图标
  title?: string //一般用于菜单渲染的标题
  activeMenu?: string //当路由是平级时，一般用于展示当前激活的菜单
  isHide?: boolean //用于判断是否动态渲染菜单项
}

// 路由对象类型
export type RouteItemType = Omit<RouteObject, 'children'> & {
  path?: string //路由的路径
  redirect?: string //路由重定向的路径
  meta?: RouteMeta //传递给路由loader的数据
  children?: RouteItemType[] //嵌套路由
}
