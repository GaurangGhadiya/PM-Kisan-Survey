// reducers/someReducer.js
import { RATION_SUCCESS, RATION_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const rationDetails = (state = initialState, action) => {
    switch (action.type) {
        case RATION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case RATION_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default rationDetails;
