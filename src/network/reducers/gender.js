// reducers/someReducer.js
import { GENDER_SUCCESS, GENDER_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const gender = (state = initialState, action) => {
    switch (action.type) {
        case GENDER_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case GENDER_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default gender;
