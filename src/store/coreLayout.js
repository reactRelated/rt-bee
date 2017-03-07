// ------------------------------------
// Constants
// ------------------------------------
//LayoutResize 监听高度
export const CORELAYOUT_RESIZE = 'CORELAYOUT_RESIZE';
// ------------------------------------
// Actions
// ------------------------------------

export function layoutResize (resize = document.documentElement.clientHeight) {

    return {
        type  : CORELAYOUT_RESIZE,
        resize : resize
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    resize: document.documentElement.clientHeight
};
export default function layoutResizeReducer (state = initialState, action) {
    console.log(state);
    console.log(action);
    return action.type === CORELAYOUT_RESIZE
        ? action.resize
        : state
}
