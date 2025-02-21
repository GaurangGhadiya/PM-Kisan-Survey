// actions/someActions.js
import axios from "../api";

import { OCCUPATION_SUCCESS, OCCUPATION_FALIURE } from "../action_types";
// Action Creators
export const fetchOccupationSuccess = (data) => ({
  type: OCCUPATION_SUCCESS,
  payload: data,
});

export const fetchOccupationFailure = (error) => ({
  type: OCCUPATION_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onOccupationList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/getOccupations`, {});
      dispatch(fetchOccupationSuccess(response.data));
    } catch (error) {
      dispatch(fetchOccupationFailure(error));
    }
  };
};
