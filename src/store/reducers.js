import { combineReducers } from 'redux'
import locationReducer from './location'
// ======================================================
// 合并 Reducer
// ======================================================
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    ...asyncReducers
  })
}

// ======================================================
// 注入 Reducer
// ======================================================
export const injectReducer = (store, { key, reducer }) => {
  //如果 这个异步 reducer 已经存在就 直接退出
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  //如果 异步是初次注入 则注入
  store.asyncReducers[key] = reducer
    //store.replaceReducer 【官方】 替换原来store 的 Reducer ,注入
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
