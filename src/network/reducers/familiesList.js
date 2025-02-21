// reducers/someReducer.js
import { FAMILIES_LIST_SUCCESS, FAMILIES_LIST_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const familiesList = (state = initialState, action) => {
    switch (action.type) {
        case FAMILIES_LIST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case FAMILIES_LIST_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default familiesList;
