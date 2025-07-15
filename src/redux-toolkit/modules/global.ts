import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { GlobalState } from '@/redux/types/index.ts'

// 1.定义初始状态
const globalState: GlobalState = {
  // 侧边菜单栏的显示与隐藏
  isCollapse: false,
  // 右侧抽屉的显示与隐藏
  isOpenDrawer: false,
  // 当前主题是否为暗黑模式
  isDarkMode: false,
  // 当前主题色
  themeColor: '#ffffff',
  // 语言包切换(默认中文)
  language: 'zhCN',
  // 边框圆角大小
  borderRaduis: 4
}

// 2.定义 reducer
const globalSlice = createSlice({
  name: 'global',
  initialState: globalState,
  reducers: {
    // ObjToKeyValUnion<GlobalState> 表示将 GlobalState中的属性值都变成联合类型，最后通过PayloadAction把类型传递给action
    setGlobalState<T extends keyof GlobalState>(
      state: GlobalState,
      { payload }: PayloadAction<ObjToKeyValUnion<GlobalState>>
    ) {
      state[payload.key as T] = payload.value as GlobalState[T]
    }
  }
})

// 3.导出actionCreator
export const { setGlobalState } = globalSlice.actions
// 4.导出当前模块的reducer
export default globalSlice.reducer
