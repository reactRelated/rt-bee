import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './location'
import createLogger from 'redux-logger'
import DevTools from '../containers/DevTools'
import {persistStore, autoRehydrate} from 'redux-persist'
export default (initialState = {}) => {
  // ======================================================
  // 中间件配置
  // ======================================================
  const middleware = [thunk,createLogger()]

  // ======================================================
  // 存储 增强器 => 强化函数
  // ======================================================
  const enhancers = []

    //Redux 方法 compose() （译者注：compose(funcA, funcB, funcC) 形象为 compose(funcA(funcB(funcC())))）
  let composeEnhancers = compose;

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }

      enhancers.push(DevTools.instrument())
  }
  // ======================================================
  // 存储实例化和HMR设置  HMR == hot module replacement
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  // ======================================================
  // store 里面创建 asyncReducers 集合 存储异步 Reducer
  // ======================================================
  store.asyncReducers = {};

  // 包裹 https://www.npmjs.com/package/history
  // 任何时候 退订,调用“store.unsubscribeHistory()“
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
