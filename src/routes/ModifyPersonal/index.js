import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path : 'ModifyPersonal',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const ArticleList = require('./ModifyPersonalContainer').default
            const reducer = require('./ModifyPersonalModule').default

            injectReducer(store, { key: 'SetPersonal', reducer })

            cb(null, ArticleList);

        }, 'ModifyPersonal')
    }
})
