// reducers/someReducer.js
import { FAMILIES_DETAIL_SUCCESS, FAMILIES_DETAIL_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const familiesDetail = (state = initialState, action) => {
    switch (action.type) {
        case FAMILIES_DETAIL_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case FAMILIES_DETAIL_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default familiesDetail;
