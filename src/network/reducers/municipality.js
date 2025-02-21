// reducers/someReducer.js
import { MUNICIPALITY_SUCCESS, MUNICIPALITY_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const municipality_reducer = (state = initialState, action) => {
    switch (action.type) {
        case MUNICIPALITY_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case MUNICIPALITY_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default municipality_reducer;
