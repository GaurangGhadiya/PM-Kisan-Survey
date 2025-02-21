// reducers/someReducer.js
import { QUALIFICATION_SUCCESS, QUALIFICATION_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const qualifications = (state = initialState, action) => {
    switch (action.type) {
        case QUALIFICATION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case QUALIFICATION_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default qualifications;
