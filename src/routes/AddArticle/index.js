import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path : 'AddArticle',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const AddArticle = require('./AddArticleContainer').default
            const reducer = require('./AddArticleModule').default
            injectReducer(store, { key: 'AddArticle', reducer })

            cb(null, AddArticle);

        }, 'AddArticle')
    }
})
