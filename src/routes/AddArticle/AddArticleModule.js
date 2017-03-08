import {fetchMethods} from '../../tools/networkFetch'
// ------------------------------------
// Constants
// ------------------------------------
export const ADDARTICLE_POST = 'ADDARTICLE_POST'; //添加文章
export const SELECTARTICLE_POST = 'SELECTARTICLE_POST'; //请求文章分类


// ------------------------------------
// Actions
// ------------------------------------

export function  addArticlePost(data={}) {

    let ant = Object.assign({ type : ADDARTICLE_POST },data);
    return ant;
}

export function  selectArticleTypePost(data={}) {

    let ant = Object.assign({ type : SELECTARTICLE_POST },data);
    return ant;
}

export function  addArticleSubmit(values,cb) {
    console.log(values)
    return (dispatch,getSeate )=> {
        dispatch(addArticlePost());
        return fetchMethods.Post({
            url:`${__SERVER_HOST__}/AdminApi/AddArticle`,
            body:{ },
            success: (res) => {
                dispatch(addArticlePost({status:'success'},res));
            },
            error: (ex) => {
                return dispatch(addArticlePost({
                    status: 'error'
                },ex));
            }
        })
    }
}

export function selectArticleType(){
    return (dispatch,getSeate )=> {
        dispatch(selectArticleTypePost());
        return fetchMethods.Post({
            url:`${__SERVER_HOST__}/AdminApi/AddArticle`,
            body:{ },
            success: (res) => {
                dispatch(selectArticleTypePost({status:'success'},res));
            },
            error: (ex) => {
                return dispatch(selectArticleTypePost({
                    status: 'error'
                },ex));
            }
        })
    }
}

export const actions = {
    addArticleSubmit,
    selectArticleType
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

export default function addArticleReducer (state = initialState , action) {
    switch(action.type){
        case ADDARTICLE_POST:
            if(action.status == 'success'){

                state = Object.assign({},state,{
                    isFetching: false
                });

                return state
            }else if(action.status == 'error') {
                state = Object.assign({},state,{
                    isFetching: false
                });
                return state
            }else {
                state = Object.assign({},state,{
                    isFetching: true
                });
                return state
            }
        case SELECTARTICLE_POST:
            if(action.status == 'success'){

                state = Object.assign({},state,{
                    isFetching: false
                });

                return state
            }else if(action.status == 'error') {
                state = Object.assign({},state,{
                    isFetching: false
                });
                return state
            }else {
                state = Object.assign({},state,{
                    isFetching: true
                });
                return state
            }
        default:
            return state
    }
}