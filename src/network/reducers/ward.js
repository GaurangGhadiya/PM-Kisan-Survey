// reducers/someReducer.js
import { WARD_SUCCESS, WARD_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const ward_reducer = (state = initialState, action) => {
    switch (action.type) {
        case WARD_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case WARD_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default ward_reducer;
