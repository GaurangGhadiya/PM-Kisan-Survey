// reducers/someReducer.js
import { RELIGION_SUCCESS, RELIGION_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const religion = (state = initialState, action) => {
    switch (action.type) {
        case RELIGION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case RELIGION_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default religion;
