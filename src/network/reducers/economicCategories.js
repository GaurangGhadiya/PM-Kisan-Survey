// reducers/someReducer.js
import { ECONOMIC_CATEGORIES_SUCCESS, ECONOMIC_CATEGORIES_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const economicCategories = (state = initialState, action) => {
    switch (action.type) {
        case ECONOMIC_CATEGORIES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case ECONOMIC_CATEGORIES_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default economicCategories;
