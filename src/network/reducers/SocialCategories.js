// reducers/someReducer.js
import { SOCIAL_CAT_SUCCESS, SOCIAL_CAT_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const social_categories = (state = initialState, action) => {
    switch (action.type) {
        case SOCIAL_CAT_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case SOCIAL_CAT_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default social_categories;
