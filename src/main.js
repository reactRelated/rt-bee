import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import 'antd/dist/antd.css';

// ========================================================
// Store  实例化
// ========================================================
let initialState = window.___INITIAL_STATE__ || {}
//默认树
/*let defaultState ={
    layout:{
        layoutResize:document.documentElement.clientHeight
    }
};
initialState =  Object.assign({},initialState,defaultState);*/
console.log(initialState)
const store = createStore(initialState)
// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes}  />,
    MOUNT_NODE
  )
};
/*
console.log(__SERVER_HOST__)
console.log(__DEV__)
*/


//这段代码是排除在生产包
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
