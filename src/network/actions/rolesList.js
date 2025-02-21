// actions/someActions.js
import axios from '../api';

import { ON_ROLES_SUCCESS, ON_ROLES_FALIURE } from '../action_types';
// Action Creators
export const onRolesSuccess = (data) => ({
    type: ON_ROLES_SUCCESS,
    payload: data,
});

export const onRolesFailure = (error) => ({
    type: ON_ROLES_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onRolesList = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/role/list`, {});
            dispatch(onRolesSuccess(response.data));
        } catch (error) {
            dispatch(onRolesFailure(error));
        }
    };
};



