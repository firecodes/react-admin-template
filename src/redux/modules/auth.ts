import { createSlice } from '@reduxjs/toolkit'
import { AuthState } from '../types/index.ts'

// 定义auth的初始状态
const authState: AuthState = {
  authMenuList: []
}

// 定义auth的slice
const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setAuthMenuList: (state, action) => {
      state.authMenuList = action.payload
    }
  }
})

// 导出同步actionCreates
export const { setAuthMenuList } = authSlice.actions
// 导出异步actionCreates
// export const fetchMenuList = () => {
//   return (dispath: any) => {
//     setTimeout(() => {
//       dispath(setMenuList(['menu1', 'menu2', 'menu3']))
//     }, 1000)
//   }
// }

// 导出authReducer
export default authSlice.reducer
