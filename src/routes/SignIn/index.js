import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path : 'signin',
    /*  异步调用 getComponent 获取组件   */
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            /*  依赖注入   */
            const Signin = require('./containers/SigninContainer').default
            const reducer = require('./modules/signin').default

            /*  添加一个 有key  的 reducer  */
            injectReducer(store, { key: 'signin', reducer })

            /* 回调返回组件 getComponent   */
            cb(null, Signin);

            /* Webpack 构建包的名字 */
        }, 'signin')
    }
})
