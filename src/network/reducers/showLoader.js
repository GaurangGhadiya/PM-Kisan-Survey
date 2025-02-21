// reducers/someReducer.js
import { SHOW_LOADER_SUCCESS, SHOW_LOADER_FALIURE } from "../action_types";


const initialState = {
    data: {},
    error: null,
};

const showLoader = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case SHOW_LOADER_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default showLoader;
