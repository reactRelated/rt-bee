import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path : 'ArticleList',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const ArticleList = require('./ArticleListContainer').default
            const reducer = require('./ArticleListModule').default

            injectReducer(store, { key: 'ArticleList', reducer })

            cb(null, ArticleList);

        }, 'ArticleList')
    }
})
