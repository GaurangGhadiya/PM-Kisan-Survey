// reducers/someReducer.js
import { DASHBOARD_SUCCESS, DASHBOARD_FAILURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case DASHBOARD_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case DASHBOARD_FAILURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default dashboard;
