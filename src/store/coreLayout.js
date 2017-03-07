// ------------------------------------
// Constants
// ------------------------------------
//LayoutResize 监听高度
export const CORELAYOUT_RESIZE = 'CORELAYOUT_RESIZE';
// ------------------------------------
// Actions
// ------------------------------------

export function layoutResize (minheight = document.documentElement.clientHeight) {
    console.log(minheight)
    return {
        type  : CORELAYOUT_RESIZE,
        minheight : minheight
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    minheight: document.documentElement.clientHeight
};
export default function layoutReducer (state = initialState, action) {
    console.log(state);
    console.log(action);
    return action.type === CORELAYOUT_RESIZE
        ? Object.assign({},state,{
            minheight:action.minheight
        })
        : state
}
