import { notification } from 'antd'
import { setToken } from '@/redux/modules/user.ts'
import { setAuthMenuList } from '@/redux/modules/auth.ts'
import { useDispatch } from '@/redux/index.ts'
import { getMenuListApi } from '@/api/modules/login.ts'
/**
 * @description 初始化用户的菜单权限
 * @returns {Promise<void>}
 */
const usePermissions = () => {
  const dispatch = useDispatch()

  const initPermissions = async (token: string) => {
    if (!token) return

    try {
      // 1.获取菜单权限列表
      const menuRes = await getMenuListApi({ token: token })
      dispatch(setAuthMenuList(menuRes.data))

      // 2.如果用户没有权限
      if (!menuRes.data.length) {
        notification.warning({
          message: '无权限访问',
          description: '当前账号无任何菜单权限，请联系系统管理员！'
        })
        dispatch(setToken(''))
        return Promise.reject('No permission')
      }
    } catch (error) {
      dispatch(setToken(''))
      return Promise.reject(error)
    }
  }

  return { initPermissions }
}

export default usePermissions
