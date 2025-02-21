// reducers/someReducer.js
import { OCCUPATION_FALIURE, OCCUPATION_SUCCESS } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const occupations = (state = initialState, action) => {
    switch (action.type) {
        case OCCUPATION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case OCCUPATION_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default occupations;
