import {fetchMethods,AJAX_START,AJAX_SUCCESS,AJAX_ERROR} from '../../tools/networkFetch'
// ------------------------------------
// Constants
// ------------------------------------
export const ADDARTICLE_POST = 'ADDARTICLE_POST'; //添加文章
export const SELECTARTICLE_POST = 'SELECTARTICLE_POST'; //请求文章分类


// ------------------------------------
// Actions
// ------------------------------------

export function  addArticlePost(addSubmit={}) {

    return {
        type : ADDARTICLE_POST,
        addSubmit
    }
}

export function  selectArticleClassifyPost(classify={}) {

    return {
        type : SELECTARTICLE_POST,
        classify
    }
}

export function  addArticleSubmit(values,scb) {
    return dispatch=> {
        dispatch(addArticlePost({status:AJAX_START}));
        return fetchMethods.Post({
            url:`${__SERVER_HOST__}/AdminApi/AddArticle`,
            body:{
                title:values.title,
                info:values.info,
                classify:values.classify
            },
            success: (res) => {
                dispatch(addArticlePost({status:AJAX_SUCCESS,msg:res.msg}));
                scb(res.msg)
            },
            error: (ex) => {
                return dispatch(addArticlePost({
                    status: AJAX_ERROR
                },ex));
            }
        })
    }
}

export function selectArticleClassify(){
    return (dispatch)=> {
        dispatch(selectArticleClassifyPost({status:AJAX_START}));
        return fetchMethods.Post({
            url:`${__SERVER_HOST__}/AdminApi/selectArticleClassify`,
            success: (res) => {
                dispatch(selectArticleClassifyPost({status:AJAX_SUCCESS,items:res.data}))
            },
            error: (ex) => {
                return dispatch(selectArticleClassifyPost({
                    status: AJAX_ERROR
                },ex));
            }
        })
    }
}

export const actions = {
    addArticleSubmit,
    selectArticleClassify
};

// ------------------------------------
// Action Handlers
// ------------------------------------

//请求文章分类
export function selectArticlePostHandler (state = {
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
//添加文章
export function addArticlePostHandler (state = {
    isFetching: false},action){
    switch (action.status){
        case AJAX_START:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case AJAX_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                msg:action.msg
            });
        case AJAX_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                msg:action.msg
            })
    }

}


// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {};

export default function addArticleReducer (state = initialState , action) {
    switch(action.type){
        case ADDARTICLE_POST:
            return Object.assign({},state, {"addSubmit":addArticlePostHandler(state['addSubmit'],action.addSubmit)})
        case SELECTARTICLE_POST:
            return Object.assign({},state, {"classify":selectArticlePostHandler(state['classify'],action.classify)})
        default:
            return state
    }
}
