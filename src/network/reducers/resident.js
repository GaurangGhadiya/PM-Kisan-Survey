// reducers/someReducer.js
import { RESIDENTIAL_FALIURE, RESIDENTIAL_SUCCESS } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const residentList = (state = initialState, action) => {
    switch (action.type) {
        case RESIDENTIAL_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case RESIDENTIAL_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default residentList;
