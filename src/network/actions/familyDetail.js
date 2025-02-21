// actions/someActions.js
import axios from '../api';

import { FAMILY_DETAIL_SUCCESS, FAMILY_DETAIL_FALIURE } from '../action_types';
// Action Creators
export const fetchfamilyDetailSuccess = (data) => ({
    type: FAMILY_DETAIL_SUCCESS,
    payload: data,
});

export const fetchfamilyDetailFailure = (error) => ({
    type: FAMILY_DETAIL_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onFamilyData = (data) => {
    return async (dispatch) => {
        try {
            dispatch(fetchfamilyDetailSuccess(data));

        } catch (error) {
            dispatch(fetchfamilyDetailFailure(error));
        }
    };
};




