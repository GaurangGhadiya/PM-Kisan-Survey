// actions/someActions.js
import axios from "../api";

import { RATION_SUCCESS, RATION_FALIURE } from "../action_types";
// Action Creators
export const fetchRationDetailSuccess = (data) => ({
  type: RATION_SUCCESS,
  payload: data,
});

export const fetchRationDetailFailure = (error) => ({
  type: RATION_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onRationDetails = (rationNumber) => {
  return async (dispatch) => {
    try {
      let params = { rationCardNo: rationNumber };
      const response = await axios.get(`/fetch-ration-details`, {
        params: params,
      });
      dispatch(fetchRationDetailSuccess(response.data));
    } catch (error) {
      dispatch(fetchRationDetailFailure(error));
    }
  };
};
