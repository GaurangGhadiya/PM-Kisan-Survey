// reducers/someReducer.js
import { ON_ROLES_UPDATE_SUCCESS, ON_ROLES_UPDATE_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const updateRoles = (state = initialState, action) => {
    switch (action.type) {
        case ON_ROLES_UPDATE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case ON_ROLES_UPDATE_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default updateRoles;
