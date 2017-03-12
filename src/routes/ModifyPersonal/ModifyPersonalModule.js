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

export function  personalDetails(values) {
    return dispatch=> {
        dispatch(personalDetailsPost({status:AJAX_START}));
        return fetchMethods.Post({
            url:`${__SERVER_HOST__}/AdminApi/GetUserInfo`,
            success: (res) => {
                dispatch(personalDetailsPost({status:AJAX_SUCCESS,info:res.data}));
            },
            error: (ex) => {
                return dispatch(personalDetailsPost({
                    status: AJAX_ERROR
                },ex));
            }
        })
    }
}

export function modifyPersonalSubmit(values,scb,ecb){
    return (dispatch)=> {
        dispatch(modifyPersonalPost({status:AJAX_START}));
        return fetchMethods.Post({
            url:`${__SERVER_HOST__}/AdminApi/EditUserInfo`,
            body:values,
            success: (res) => {
                dispatch(modifyPersonalPost({status:AJAX_SUCCESS}))
                scb(res.msg)
            },
            error: (ex) => {
                 dispatch(modifyPersonalPost({
                    status: AJAX_ERROR
                },ex));
                ecb(ex.msg)
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
    info:{}},action){
    switch (action.status){
        case AJAX_START:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case AJAX_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                info:action.info
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
