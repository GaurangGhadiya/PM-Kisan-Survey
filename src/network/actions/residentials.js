// actions/someActions.js
import axios from '../api';

import { RESIDENTIAL_SUCCESS, RESIDENTIAL_FALIURE } from '../action_types';
// Action Creators
export const fetchResidentSuccess = (data) => ({
    type: RESIDENTIAL_SUCCESS,
    payload: data,
});

export const fetchResidentFailure = (error) => ({
    type: RESIDENTIAL_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onResidentList = (wardNo) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/getResidentStatuses`, {});
            dispatch(fetchResidentSuccess(response.data));
        } catch (error) {
            dispatch(fetchResidentFailure(error));
        }
    };
};



