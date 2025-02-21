// actions/someActions.js
import axios from "../api";

import {
  SUMMARY_REPORT_SUCCESS,
  SUMMARY_REPORT_FALIURE,
} from "../action_types";
// Action Creators
export const fetchSummaryReportSuccess = (data) => ({
  type: SUMMARY_REPORT_SUCCESS,
  payload: data,
});

export const fetchSummaryReportFaliure = (error) => ({
  type: SUMMARY_REPORT_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onSummaryReport = (queryParams) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/report/survey/summary`, {
        params: queryParams,
      });
      dispatch(fetchSummaryReportSuccess(response.data));
    } catch (error) {
      dispatch(fetchSummaryReportFaliure(error));
    }
  };
};
