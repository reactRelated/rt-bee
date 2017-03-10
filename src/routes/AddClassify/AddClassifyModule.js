import {fetchMethods,AJAX_START,AJAX_SUCCESS,AJAX_ERROR} from '../../tools/networkFetch'
// ------------------------------------
// Constants
// ------------------------------------
export const ADDCLASSIFY_POST = 'ADDCLASSIFY_POST'; //添加分类


// ------------------------------------
// Actions
// ------------------------------------

export function  addClassifyPost(addClassifySubmit={}) {

    return {
        type : ADDCLASSIFY_POST,
        addClassifySubmit
    }
}



export function  addClassifySubmit(values,scb) {
    console.log(values)
    return dispatch=> {
        dispatch(addClassifyPost({status:AJAX_START}));
        return fetchMethods.Post({
            url:`${__SERVER_HOST__}/AdminApi//AddArticleClassify`,
            body:{
                classifyname:values.classifyname
            },
            success: (res) => {
                dispatch(addClassifyPost({status:AJAX_SUCCESS,msg:res.msg}));
                scb(res.msg)
            },
            error: (ex) => {
                return dispatch(addClassifyPost({
                    status: AJAX_ERROR
                },ex));
            }
        })
    }
}



export const actions = {
    addClassifySubmit
};

// ------------------------------------
// Action Handlers
// ------------------------------------


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

export default function addClassifyReducer (state ={} , action) {
    switch(action.type){
        case ADDCLASSIFY_POST:
            return Object.assign({},state, {"addClassifySubmit":addArticlePostHandler(state['addClassifySubmit'],action.addClassifySubmit)})
        default:
            return state
    }
}
