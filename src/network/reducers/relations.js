// reducers/someReducer.js
import { RELATION_SUCCESS, RELATION_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const relations = (state = initialState, action) => {
    switch (action.type) {
        case RELATION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case RELATION_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default relations;
