// actions/someActions.js
import axios from '../api';

import { SET_VALUE, SET_VALUE_ERROR } from '../action_types';
// Action Creators
export const fetchformSuccess = (data) => ({
    type: SET_VALUE,
    payload: data,
});

export const fetchformFailure = (error) => ({
    type: SET_VALUE_ERROR,
    payload: error,
});

// Async Action to Fetch Data
export const onFormData = (data) => {
    return async (dispatch) => {
        try {
            dispatch(fetchformSuccess(data));

        } catch (error) {
            dispatch(fetchformFailure(error));
        }
    };
};




