export const initialState = {
    user: null
}

export const actionTypes = {
    SET_USER: 'SET_USER',
}

/* 3:27:55 */
const reducer = (state, action) =>{
    console.log(action);

    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default reducer;