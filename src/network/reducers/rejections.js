// reducers/someReducer.js
import { REGECTION_REASONS_SUCCESS, REGECTION_REASONS_FAILIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const rejections = (state = initialState, action) => {
    switch (action.type) {
        case REGECTION_REASONS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case REGECTION_REASONS_FAILIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default rejections;
