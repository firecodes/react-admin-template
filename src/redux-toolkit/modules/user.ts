import { createSlice } from '@reduxjs/toolkit'
import type { UserState } from '@/redux/types/index.ts'

// 定义初始化state
const userState: UserState = {
  token: '',
  userInfo: {
    name: '',
    avatar: ''
  }
}

const userSlice = createSlice({
  name: 'user-token',
  initialState: userState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    }
  }
})

// 导出同步actionCreate
export const { setToken, setUserInfo } = userSlice.actions
// 导出user模块的reducer
export default userSlice.reducer
