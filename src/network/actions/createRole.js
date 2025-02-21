// actions/someActions.js
import axios from '../api';

import { ON_ROLES_CREATE_SUCCESS, ON_ROLES_CREATE_FALIURE } from '../action_types';
// Action Creators
export const onRolesCreateSuccess = (data) => ({
    type: ON_ROLES_CREATE_SUCCESS,
    payload: data,
});

export const onRolesCreateFailure = (error) => ({
    type: ON_ROLES_CREATE_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onRolesCreate = (params) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`/role/create`, params);
            dispatch(onRolesCreateSuccess(response.data));
        } catch (error) {
            dispatch(onRolesCreateFailure(error));
        }
    };
};



