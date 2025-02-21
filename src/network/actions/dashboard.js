// actions/someActions.js
import axios from '../api';

import { DASHBOARD_SUCCESS, DASHBOARD_FAILURE } from '../action_types';
// Action Creators
export const fetchDashboardSuccess = (data) => ({
    type: DASHBOARD_SUCCESS,
    payload: data,
});

export const fetchDashboardFailure = (error) => ({
    type: DASHBOARD_FAILURE,
    payload: error,
});

// Async Action to Fetch Data
export const onDashboard = (wardNo) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/survey/report/count?wardId=${wardNo}`, {});
            dispatch(fetchDashboardSuccess(response.data));
        } catch (error) {
            dispatch(fetchDashboardFailure(error));
        }
    };
};



