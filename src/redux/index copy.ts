import { useSelector as useReduxSelector, useDispatch as useReduxDispatch, TypedUseSelectorHook } from 'react-redux'
import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { thunk } from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import userReducer from './modules/user.ts'
import authReducer from './modules/auth.ts'

// 1.合并所有的子reducer
const allReducer = combineReducers({ user: userReducer, auth: authReducer })

// 2.配置持久化存储配置项
const persistConfig = {
  key: 'store-root', //持久化存储的键名
  storage: storage, //持久化存储的方式
  whitelist: ['user', 'auth'] //需要持久化存储的名单,默认全部
  // blacklist: [] //不需要持久化存储的名单
}

// 3.创建持久化存储的reducer
const persistAllReducer = persistReducer(persistConfig, allReducer)

// 4.配置thunk中间件的TS类型
const thunkMiddleware: Middleware[] = [thunk]

// 4.配置并创建根store，see：https://cn.redux.js.org/tutorials/fundamentals/part-4-store
export const store = configureStore({
  reducer: persistAllReducer, // 合并后的reducer
  middleware: function (getDefaultMiddleware) {
    //配置中间件，值为一个中间件的数组（别想太多,getDefaultMiddleware只是一个回调），或许你也可以使用箭头函数
    const middlewareList = getDefaultMiddleware({
      serializableCheck: false // 关闭redux-persist的序列化检查
    })

    return middlewareList.concat(thunkMiddleware) //添加thunk中间件
  },
  devTools: true // 开启devtools
})

// 5.创建持久化的根store
export const persistorRootStore = persistStore(store)

// 定义根 State 和 Dispatch 的TS类型，see：https://cn.redux.js.org/tutorials/typescript-quick-start
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// 定义 Hooks 类型，以便在整个应用中的其它地方使用，而不是简单地使用 'useDispatch' 'useSelector'
export const useDispatch: () => AppDispatch = useReduxDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
