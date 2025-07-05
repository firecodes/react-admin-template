import { RouteItemType } from '@/routers/types/index.ts'

/**
 * @description 菜单扁平化，将多维数组扁平化为一维数组，一般用于动态添加路由
 * @param {Array} menuList 菜单列表，一般指用户的菜单权限
 * @returns {Array} 扁平化后的菜单列表
 */
export function getFlatMenuList(menuList: RouteItemType[]): RouteItemType[] {
  let copyMenuList: RouteItemType[] = JSON.parse(JSON.stringify(menuList))

  let result = copyMenuList.flatMap((item) => {
    if (item.children) return [item, ...getFlatMenuList(item.children)]
    else return [item]
  })
  return result
}

/**
 * @description 将权限列表转换为动态展示的菜单列表
 * @param {Array} menuList 菜单列表，一般指用户的菜单权限
 * @returns {Array} 动态展示的菜单列表
 */
export function getShowMenuList(menuList: RouteItemType[]): RouteItemType[] {
  let copyMenuList: RouteItemType[] = JSON.parse(JSON.stringify(menuList))

  let result = copyMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.isHide
  })
  return result
}

/**
 * @description 根据当前的路由路径转换成当前要展开的openkeys
 * @param {String} path 当前的路由路径
 * @returns {Array} 当前展开的openKeys
 */
export function getCurOpenKeys(path: string): string[] {
  const openKeys: string[] = []
  const pathArr = path.split('/').map((item: string) => '/' + item)
  pathArr.splice(0, 1)
  pathArr.reduce((acc: string, cur: string) => {
    const curPath = acc + cur
    openKeys.push(curPath)
    return curPath
  }, '')
  return openKeys
}
