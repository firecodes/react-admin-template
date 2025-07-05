import { Navigate } from 'react-router-dom'
import { RouteItemType } from '@/routers/types/index.ts'
import { HOME_PATH, LOGIN_PATH } from '@/config/index.ts'
import LoginPage from '@/views/login/index.tsx'
import Loading from '@/components/Loading/Loading.tsx'
import NotAuthPage from '@/components/Error/notAuth.tsx'
import NotFoundPage from '@/components/Error/notFound.tsx'
import NotNetworkPage from '@/components/Error/notNetwork.tsx'
import RouterBefore from '@/routers/modules/RouterBefore.tsx'

// 配置静态路由表
const staticRoutes: RouteItemType[] = [
  {
    path: '/',
    element: <Navigate to={HOME_PATH} replace={true}></Navigate>
  },
  {
    path: LOGIN_PATH,
    element: <LoginPage></LoginPage>,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/403',
    element: <NotAuthPage></NotAuthPage>,
    meta: {
      title: '403'
    }
  },
  {
    path: '/404',
    element: <NotFoundPage></NotFoundPage>,
    meta: {
      title: '404'
    }
  },
  {
    path: '/500',
    element: <NotNetworkPage></NotNetworkPage>,
    meta: {
      title: '500'
    }
  },
  // 此处配置loading，为了避免路由刷新时出现404问题
  {
    path: '*',
    element: <Loading></Loading>
  }
]

export const publicRoutes = staticRoutes.map((route) => {
  return {
    ...route,
    element: <RouterBefore>{route.element}</RouterBefore>,
    loader: () => {
      return { ...route.meta }
    }
  }
})

export default publicRoutes
