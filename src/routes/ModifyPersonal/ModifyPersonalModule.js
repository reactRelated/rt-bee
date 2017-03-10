import {fetchMethods,AJAX_START,AJAX_SUCCESS,AJAX_ERROR} from '../../tools/networkFetch'
// ------------------------------------
// Constants
// ------------------------------------
export const PERSONALDETAILS_POST = 'PERSONALDETAILS_POST'; //查询个人信息
export const MODIFYPERSONAL_POST = 'MODIFYPERSONAL_POST'; //修改个人信息


// ------------------------------------
// Actions
// ------------------------------------

export function  personalDetailsPost(personalDetails={}) {

    return {
        type : PERSONALDETAILS_POST,
        personalDetails
    }
}

export function  modifyPersonalPost(modifyPersonal={}) {

    return {
        type : MODIFYPERSONAL_POST,
        modifyPersonal
    }
}

export function  personalDetails(values,scb) {
    console.log(values)
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
export function modifyPersonalSubmit(){
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
    personalDetails,
    modifyPersonalSubmit
};

// ------------------------------------
// Action Handlers
// ------------------------------------

//查询个人信息
export function personalDetailsPostHandler (state = {
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
//修改个人信息提交
export function modifyPersonalSubmitPostHandler (state = {
    isFetching: false},action){
    switch (action.status){
        case AJAX_START:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case AJAX_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
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

export default function ModifyPersonalReducer (state = initialState , action) {
    switch(action.type){
        case PERSONALDETAILS_POST:
            return Object.assign({},state, {"personalDetails":personalDetailsPostHandler(state['personalDetails'],action.personalDetails)})
        case MODIFYPERSONAL_POST:
            return Object.assign({},state, {"modifyPersonal":modifyPersonalSubmitPostHandler(state['modifyPersonal'],action.modifyPersonal)})
        default:
            return state
    }
}
