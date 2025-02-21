// actions/someActions.js
import axios from '../api';

import { ON_ROLES_DETAILS_SUCCESS, ON_ROLES_DETAILS_FALIURE } from '../action_types';
// Action Creators
export const onRolesDetailsSuccess = (data) => ({
    type: ON_ROLES_DETAILS_SUCCESS,
    payload: data,
});

export const onRolesDetailsFailure = (error) => ({
    type: ON_ROLES_DETAILS_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onRolesDetails = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/role/getById?id=${id}`, {});
            dispatch(onRolesDetailsSuccess(response.data));
        } catch (error) {
            dispatch(onRolesDetailsFailure(error));
        }
    };
};



