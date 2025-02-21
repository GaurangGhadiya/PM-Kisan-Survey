// actions/someActions.js
import axios from "../api";

import { CSC_SURVEY_REPORT_SUCCESS,CSC_SURVEY_REPORT_FAILURE } from "../action_types";
// Action Creators
export const fetchCSCListSuccess = (data) => ({
  type: CSC_SURVEY_REPORT_SUCCESS,
  payload: data,
});

export const fetchCSCListFailure = (error) => ({
  type: CSC_SURVEY_REPORT_FAILURE,
  payload: error,
});

export const onCSCSurveyList = (queryParams) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/report/survey/csc`, {
        params: queryParams,
      });
      
      dispatch(fetchCSCListSuccess(response.data));
    } catch (error) {
      dispatch(fetchCSCListFailure(error));
    }
  };
};
