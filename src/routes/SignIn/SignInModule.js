import {fetchMethods,AJAX_START,AJAX_SUCCESS,AJAX_ERROR} from '../../tools/networkFetch'
// ------------------------------------
// Constants
// ------------------------------------
export const SIGNIN_POST = 'SIGNIN_POST'; //登录请求


// ------------------------------------
// Actions
// ------------------------------------

export function  signInPost(user={}) {

    return {
        type : SIGNIN_POST,
        user
    };
}


export function  handleSubmit(values,scb,ecb) {
    return (dispatch,getSeate )=> {
        console.log(getSeate())
        dispatch(signInPost({status:AJAX_START}));
        return fetchMethods.Post({
            url:`${__SERVER_HOST__}/AdminApi/SignIn`,
            body:{
                username:values.username,
                password:values.password
            },
            success: (res) => {
                console.log(res)
                dispatch(signInPost({status:AJAX_SUCCESS,info:res.data}));
                scb(res);
            },
            error: (ex) => {
                dispatch(signInPost({ status: AJAX_ERROR},ex));
                ecb(ex)
            }
        })
    }
}

//统一输入到 props.actions 管道中
export const actions = {
    handleSubmit
};

// ------------------------------------
// Action Handlers
// ------------------------------------
export function signInPostHandler (state = {
    isFetching: false,
    info:{}
    },action){
    console.log(action)
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
                msg:action.msg
            })
    }

}

// ------------------------------------
// Reducer
// ------------------------------------

export default function signInReducer (state = {} , action) {
    console.log(action)
    switch(action.type){
        case SIGNIN_POST:
            return Object.assign({},state,{user:signInPostHandler(state['user'],action.user)})
        default:
            return state
    }
}