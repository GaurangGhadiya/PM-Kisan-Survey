// reducers/someReducer.js
import { DISTRICT_SUCCESS, DISTRICT_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const district_reducer = (state = initialState, action) => {
    switch (action.type) {
        case DISTRICT_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case DISTRICT_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default district_reducer;
