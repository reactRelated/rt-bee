import fetch from 'isomorphic-fetch'
// ------------------------------------
// Constants
// ------------------------------------
export const SIGNIN_SUBMIT = 'SIGNIN_SUBMIT'; //登录--提交
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

// ------------------------------------
// Actions
// ------------------------------------

export function  signinSubmit(data ={}) {
    return {
        type    : SIGNIN_SUBMIT,
        signin : data
    }
}

//开始获取数据
const requestPosts = () => ({
        type: REQUEST_POSTS
    });

//获取数据成功
const receivePosts = (json) => ({
    type: RECEIVE_POSTS,
    json
})


export function  signinPostSubmit() {
    return dispatch => {
        dispatch(requestPosts());
        return fetch(`${__SERVER_HOST__}/adminApiServer/User/login`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts( json)))
    }
}


export function  handleSubmit(values) {
    console.log('Received values of form OK: ', values);
}

//统一输入到 props.actions 管道中
export const actions = {
   signinSubmit,
   signinPostSubmit,
    handleSubmit
}

// ------------------------------------
// Action Handlers
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------

export default function signInReducer (state = {} , action) {
    switch(action.type){
        case SIGNIN_SUBMIT:
            console.log("登陆操作")
            return state;
        case REQUEST_POSTS:
            console.log("开始请求")
            return state;
        case RECEIVE_POSTS:
            console.log("获得响应")
            return state;
        default:
            return state
    }
}