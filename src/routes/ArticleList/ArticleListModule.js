import {fetchMethods,AJAX_START,AJAX_SUCCESS,AJAX_ERROR} from '../../tools/networkFetch'
// ------------------------------------
// Constants
// ------------------------------------
export const QUERYLIST_POST = 'QUERYLIST_POST'; //查询列表


// ------------------------------------
// Actions
// ------------------------------------

export function  queryListPost(queryList={}) {

    return {
        type : QUERYLIST_POST,
        queryList
    }
}



export function queryListArticle(body={}){
    return (dispatch)=> {
        dispatch(queryListPost({status:AJAX_START}));
        return fetchMethods.Post({
            url:`${__SERVER_HOST__}/AdminApi/ArticleList`,
            body:body,
            success: (res) => {
                dispatch(queryListPost({status:AJAX_SUCCESS,items:res.data}))
            },
            error: (ex) => {
                return dispatch(queryListPost({
                    status: AJAX_ERROR
                },ex));
            }
        })
    }
}

export const actions = {
    queryListArticle
};

// ------------------------------------
// Action Handlers
// ------------------------------------

//请求文章分类
export function queryListPostHandler (state = {
    isFetching: false,
    items:[]},action){
    switch (action.status){
        case AJAX_START:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case AJAX_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items:action.items
            });
        case AJAX_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
            })
    }

}


// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {};

export default function queryListReducer (state = initialState , action) {
    switch(action.type){
        case QUERYLIST_POST:
            return Object.assign({},state, {"queryList":queryListPostHandler(state['queryList'],action.queryList)})
        default:
            return state
    }
}
