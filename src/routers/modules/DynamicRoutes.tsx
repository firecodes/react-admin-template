import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { RouteItemType } from '../types/index.ts'
import { getFlatMenuList } from '@/utils/index.ts'
import RouterBefore from './RouterBefore.tsx'
import LayoutIndex from '@/layouts/index.tsx'
import Loading from '@/components/Loading/Loading.tsx'

// 导入所有的页面视图文件
const modules = import.meta.glob('@/views/**/*.tsx') as Record<string, Parameters<typeof lazy>[number]>
// console.log('（路由组件）：', modules)

// 路由懒加载
const lazyLoad = (ElementNode: React.LazyExoticComponent<React.ComponentType>) => {
  return (
    <Suspense fallback={<Loading />}>
      <ElementNode />
    </Suspense>
  )
}

/**
 * @description 获取并注册动态路由
 * @param {Array} authMenuList 用户所拥有的菜单权限列表
 * @returns {Array} 经过转换后的动态路由列表
 */
export const convertingDynamicRoutes = (authMenuList: RouteItemType[]) => {
  // 1.将多维菜单列表转换为一维数组
  const flatMenuList = getFlatMenuList(authMenuList)
  // 2.根据菜单列表转换为react路由列表格式
  const RouteComponents = flatMenuList.map((item) => {
    // 删除子级路由，防止路由重复
    item.children && delete item.children
    // 判断当前组件是否为重定向组件
    if (item.redirect) item.element = <Navigate to={item.redirect} />
    // 转换为符合react格式的路由组件
    if (item.element && typeof item.element === 'string') {
      // 添加路由懒加载
      const Component = lazyLoad(lazy(modules['/src/views' + item.element + '.tsx']))
      // 添加路由守卫
      item.element = <RouterBefore>{Component}</RouterBefore>
    }
    // 设置路由加载器
    item.loader = () => ({ ...item.meta, redirect: !!item.redirect })
    return item
  })

  // 3.添加动态路由，将所有路由组件作为布局组件的子路由
  const dynamicRoutes: RouteItemType[] = [{ element: <LayoutIndex />, children: [...RouteComponents] }]

  return dynamicRoutes
}
