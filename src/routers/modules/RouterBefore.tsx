import { useEffect } from 'react'
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom'
import { RouteMeta } from '../types/index.ts'
import { useSelector } from '@/redux/index.ts'
import { WHITE_LIST, LOGIN_PATH, HOME_PATH } from '@/config/index.ts'

/**
 * @description 设置路由守卫
 */
interface RouterGuardProps {
  children: React.ReactNode
}
const RouterGuard: React.FC<RouterGuardProps> = (props) => {
  const loader = useLoaderData() //此钩子用于获取路由加载器（laoder）所返回的数据
  const navigate = useNavigate() //此钩子用于编程式路由导航
  const { pathname } = useLocation() //此钩子用于返回location对象

  const token = useSelector((state) => state.user.token) //用户token，用于判断是否登录
  const authMenuList = useSelector((state) => state.auth.authMenuList) //菜单权限，用于判断是否有菜单权限

  useEffect(() => {
    const meta = loader as RouteMeta

    // 设置浏览器标签的标题
    document.title = meta?.title ? meta.title : 'React Admin'

    // 如果是白名单，直接返回
    if (WHITE_LIST.includes(pathname)) return

    // 如果在已登录的情况下，直接访问登录页
    if (token && pathname === LOGIN_PATH) {
      return navigate(HOME_PATH, { replace: true })
    }

    // 如果在未登录的情况下，访问登录页
    if (!token && pathname === LOGIN_PATH) return

    // 如果未登录并且没有菜单权限，重定向到登录页
    if (!token && !authMenuList.length) {
      return navigate(LOGIN_PATH, { replace: true })
    }
  }, [loader])

  // 返回当前组件
  return props.children
}

export default RouterGuard
