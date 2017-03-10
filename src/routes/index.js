// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import SignInRoute from './SignIn'
import AddArticleRoute from './AddArticle'
import ArticleListRoute from './ArticleList'
import AddClassifyRoute from './AddClassify'
import ModifyPersonalRoute from './ModifyPersonal'

/*  Note: 使用react-router PlainRoute 对象建立路由的定义。   */
export const createRoutes = (store) => ({
        path: '/',
        component: CoreLayout,
        indexRoute: Home,
        childRoutes: [
            SignInRoute(store),
            AddArticleRoute(store),
            ArticleListRoute(store),
            AddClassifyRoute(store),
            ModifyPersonalRoute(store)
        ]
    });

/*  Note: childRoutes可以分块或编程加载用getChildRoutes以下签名:

 getChildRoutes (location, cb) {
     require.ensure([], (require) => {
         cb(null, [
         // Remove imports!
         require('./Counter').default(store)
         ])
     })
 }

 然而,这是没有必要的代码分隔!它只是提供了异步路由定义的API。您的代码应该发生分裂在路线getComponent函数,因为它只是调用当存在和火柴的路线.
 */

export default createRoutes
