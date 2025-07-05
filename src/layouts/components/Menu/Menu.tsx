import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation, useMatches } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import { Icon } from '@/components/Icons/Icons.tsx'
import { useSelector, type RootState } from '@/redux/index.ts'
import { getShowMenuList, getCurOpenKeys } from '@/utils/index.ts'
import type { MenuProps } from 'antd'
import type { RouteItemType, RouteMeta } from '@/routers/types/index.ts'

type MenuItem = Required<MenuProps>['items'][number]

const { Sider } = Layout

const LayoutMenu: React.FC = () => {
  const navigate = useNavigate()
  const matches = useMatches()
  const { pathname } = useLocation()

  const menuList = useSelector((state) => state.auth.authMenuList) || []
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse)

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([])

  useEffect(() => {
    const meta = matches[matches.length - 1].data as RouteMeta
    // 设置当前高亮的菜单项
    const path = meta.activeMenu || pathname
    setSelectedKeys([path])

    // 设置当前展开的菜单项
    const openKeys = getCurOpenKeys(path)
    setStateOpenKeys(openKeys)
  }, [matches])

  // 更新并处理成antd的菜单菜单组件列表格式
  const antdMenuList = useMemo(() => handleAntdMenuList(menuList), [menuList])
  function handleAntdMenuList(list: RouteItemType[]): MenuItem[] {
    const showList = getShowMenuList(list) // 筛选动态渲染的菜单

    const mapMenuList = showList.map((item) => {
      if (item.children?.length) {
        return {
          key: item.path,
          label: item.meta?.title,
          icon: <Icon name={item.meta?.icon} />,
          children: handleAntdMenuList(item.children)
        }
      }

      return {
        key: item.path,
        label: item.meta?.title,
        icon: <Icon name={item.meta?.icon}></Icon>
      }
    })
    return mapMenuList as MenuItem[]
  }

  // 当前展开的菜单项
  const handleOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    if (openKeys.length <= 1) {
      setStateOpenKeys(openKeys)
    }
    if (openKeys.length >= 2) {
      const firstOpenKey = openKeys[0]
      const lastOpenKey = openKeys[openKeys.length - 1]
      lastOpenKey.includes(firstOpenKey) ? setStateOpenKeys(openKeys) : setStateOpenKeys([lastOpenKey])
    }
  }

  // 路由跳转
  const handleClickMenu: MenuProps['onClick'] = (menuParams) => {
    const { key, keyPath } = menuParams
    if (keyPath.length === 1) setStateOpenKeys([])
    navigate(key)
  }

  return (
    <>
      <Sider className="layout-sider" width={220} collapsed={isCollapse}>
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          items={antdMenuList}
          selectedKeys={selectedKeys}
          openKeys={stateOpenKeys}
          onClick={handleClickMenu}
          onOpenChange={handleOpenChange}
        />
      </Sider>
    </>
  )
}

export default LayoutMenu
