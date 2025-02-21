// reducers/someReducer.js
import { ON_ROLES_CREATE_SUCCESS, ON_ROLES_CREATE_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const createRoles = (state = initialState, action) => {
    switch (action.type) {
        case ON_ROLES_CREATE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case ON_ROLES_CREATE_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default createRoles;
