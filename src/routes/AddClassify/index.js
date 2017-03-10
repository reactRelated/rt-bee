import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path : 'AddClassify',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const AddArticle = require('./AddClassifyContainer').default
            const reducer = require('./AddClassifyModule').default
            injectReducer(store, { key: 'AddClassify', reducer })

            cb(null, AddArticle);

        }, 'AddClassify')
    }
})
