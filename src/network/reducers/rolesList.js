// reducers/someReducer.js
import { ON_ROLES_SUCCESS, ON_ROLES_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const rolesList = (state = initialState, action) => {
    switch (action.type) {
        case ON_ROLES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case ON_ROLES_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default rolesList;
