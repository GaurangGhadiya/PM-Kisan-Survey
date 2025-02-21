// reducers/someReducer.js
import { WARD_SUCCESS, WARD_FALIURE, VILLAGE_SUCCESS, VILLAGE_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const village_reducer = (state = initialState, action) => {
    switch (action.type) {
        case VILLAGE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case VILLAGE_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default village_reducer;
