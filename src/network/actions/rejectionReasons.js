// actions/someActions.js
import axios from "../api";

import { REGECTION_REASONS_SUCCESS, REGECTION_REASONS_FAILIURE } from "../action_types";
// Action Creators
export const fetchRejectionSuccess = (data) => ({
  type: REGECTION_REASONS_SUCCESS,
  payload: data,
});

export const fetchRejectionFaliure = (error) => ({
  type: REGECTION_REASONS_FAILIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onRejectionList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/getRejectionReasons`, {});
      dispatch(fetchRejectionSuccess(response.data));
    } catch (error) {
      dispatch(fetchRejectionFaliure(error));
    }
  };
};
