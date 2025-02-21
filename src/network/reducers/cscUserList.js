// reducers/someReducer.js
import { CSCUSER_SUCCESS, CSCUSER_FAILURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const CSCUSER_reducer = (state = initialState, action) => {
    switch (action.type) {
        case CSCUSER_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case CSCUSER_FAILURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default CSCUSER_reducer;
