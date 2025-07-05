import { useSelector as useReduxSelector, useDispatch as useReduxDispatch, TypedUseSelectorHook } from 'react-redux'
import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { thunk } from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import sessionStorage from 'redux-persist/es/storage/session'
import userReducer from './modules/user.ts'
import authReducer from './modules/auth.ts'
import globalReducer from './modules/global.ts'

// 1.配置持久化的useReducer
const userPersistReducer = persistReducer(
  {
    key: 'user', // 储存的key
    storage: storage, //存储方式为：localStorage
    blacklist: [] //无需持久化的当前reducer的state
  },
  userReducer // 需要持久化的reducer
)
const globalPersistReducer = persistReducer({ key: 'global', storage: storage }, globalReducer)
const authPersistReducer = persistReducer({ key: 'auth', storage: sessionStorage }, authReducer)

// 2.合并所有的reducer
const rootReducer = combineReducers({
  user: userPersistReducer,
  auth: authPersistReducer,
  global: globalPersistReducer
})

// 3.配置thunk中间件的以及TS类型
const thunkMiddleware: Middleware[] = [thunk]

// 4.配置根store
export const store = configureStore({
  reducer: rootReducer, // 合并后的reducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunkMiddleware), //添加中间件
  devTools: true // 开启devtools
})

// 5.配置持久化的根store
export const rootPersistorStore = persistStore(store)

// 定义根 State 和 Dispatch 的TS类型，see：https://cn.redux.js.org/tutorials/typescript-quick-start
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// 定义 Hooks 类型，以便在整个应用中的其它地方使用，而不是简单地使用 'useDispatch' 'useSelector'
export const useDispatch: () => AppDispatch = useReduxDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
