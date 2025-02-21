// actions/someActions.js
import axios from '../api';

import { ON_ROLES_UPDATE_SUCCESS, ON_ROLES_UPDATE_FALIURE } from '../action_types';
// Action Creators
export const onRolesUpdateSuccess = (data) => ({
    type: ON_ROLES_UPDATE_SUCCESS,
    payload: data,
});

export const onRolesUpdateFailure = (error) => ({
    type: ON_ROLES_UPDATE_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onRolesUpdate = (params) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`/role/update`, params);
            dispatch(onRolesUpdateSuccess(response.data));
        } catch (error) {
            dispatch(onRolesUpdateFailure(error));
        }
    };
};



