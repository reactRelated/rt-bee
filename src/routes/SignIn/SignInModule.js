import {fetchMethods} from '../../tools/networkFetch'
// ------------------------------------
// Constants
// ------------------------------------
export const SIGNIN_POST = 'SIGNIN_POST'; //登录请求


// ------------------------------------
// Actions
// ------------------------------------

export function  signInPost(data={}) {

   let ant = Object.assign({ type : SIGNIN_POST },data);
    return ant;
}
/*export function  handleSubmit(values) {
    console.log('Received values of form OK: ', values);
    return dispatch => {
        dispatch(signInPost());
        return fetch(`${__SERVER_HOST__}/AdminApi/SignIn`,{
            method:'POST',
            credentials: 'include',
            headers: {
                'cookie':'XDEBUG_SESSION=PHPSTORM',
                'content-type':'application/x-www-form-urlencoded'
            },
            body:queryString.stringify({
                username:values.username,
                password:values.password
            })
        }).then(response => response.json())
            .then(json => dispatch(signInPost({status:'success'},json)))
            .catch(json => dispatch(signInPost({
                status: 'error'
            },json)))
    }
}*/

export function  handleSubmit(values,cb) {
    return (dispatch,getSeate )=> {
        console.log(getSeate())
        dispatch(signInPost());
        return fetchMethods.Post({
            url:`${__SERVER_HOST__}/AdminApi/SignIn`,
            body:{
                username:values.username,
                password:values.password
            },
            success: (res) => {
                console.log(res)

                dispatch(signInPost({status:'success'},res));
                cb();
            },
            error: (ex) => {
                console.log(ex)
                return dispatch(signInPost({
                    status: 'error'
                },ex));
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

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
    isFetching: false
};

export default function signInReducer (state = initialState , action) {
    switch(action.type){
        case SIGNIN_POST:
              if(action.status == 'success'){
                  console.log('成功请求')
                  state = Object.assign({},state,{
                      isFetching: false
                  });

                  return state
              }else if(action.status == 'error') {
                  console.log('请求失败')
                  state = Object.assign({},state,{
                      isFetching: false
                  });
                  return state
              }else {
                  console.log('请求开始')
                  state = Object.assign({},state,{
                      isFetching: true
                  });
                  return state
              }
            return state;
        default:
            return state
    }
}