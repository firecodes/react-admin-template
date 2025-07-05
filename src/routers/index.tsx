import { useState, useEffect } from 'react'
import { RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'
import { useSelector } from '@/redux/index.ts'
import useMessage from '@/hooks/useMessage.ts'
import { convertingDynamicRoutes } from './modules/DynamicRoutes.tsx'
import usePermissions from '@/hooks/usePermissions.ts'
import useSystemTheme from '@/hooks/useSystemTheme.ts'
import staticRoutes from './modules/StaticRoutes.tsx'
import NotFoundPage from '@/components/Error/notFound.tsx'
import type { RouteItemType } from './types/index.ts'

const RouterProvicer: React.FC = () => {
  useMessage() //消息提示弹窗
  useSystemTheme() //系统主题配置
  const { initPermissions } = usePermissions() //初始化菜单权限

  const token = useSelector((state) => state.user.token)
  const authMenuList = useSelector((state) => state.auth.authMenuList) //菜单权限
  const [allRouteList, setAllRouteList] = useState<RouteItemType[]>(staticRoutes) //所有路由列表

  useEffect(() => {
    // 1.获取用户的菜单权限
    if (!authMenuList.length) {
      initPermissions(token)
      return
    }

    // 2.将菜单权限转换为react-router需要的路由结构
    const dynamicRoutes = convertingDynamicRoutes(authMenuList)

    // 3.合并静态路由和动态路由
    const allRouteList = [...staticRoutes, ...dynamicRoutes] as RouteObject[]

    // 4.此步是等待动态路由更新后，再重新设置其它路由的404页面
    allRouteList.forEach((item) => item.path === '*' && (item.element = <NotFoundPage />))

    // 5.更新state,执行页面渲染
    setAllRouteList(allRouteList)
  }, [authMenuList])

  // 5.创建react-router路由管理对象
  // 注：history模式重定向到登录页时，会发生redux状态丢失，以至于当authMenuList改变时，页面会触发重新渲染，同时会有闪屏的现象。所以暂且使用hash模式）
  const routerMode = createHashRouter(allRouteList as RouteObject[])

  // 5.将路由管理对象传递给RouterProvider组件
  return <RouterProvider router={routerMode}></RouterProvider>
}

export default RouterProvicer
