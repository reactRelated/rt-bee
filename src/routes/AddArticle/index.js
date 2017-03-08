import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path : 'AddArticle',
    /*  异步调用 getComponent 获取组件   */
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            /*  依赖注入   */
            const AddArticle = require('./AddArticleContainer').default
            const reducer = require('./AddArticleModule').default
            /*  添加一个 有key  的 reducer  */
            injectReducer(store, { key: 'AddArticle', reducer })

            /* 回调返回组件 getComponent   */
            cb(null, AddArticle);

            /* Webpack 构建包的名字 */
        }, 'AddArticle')
    }
})
