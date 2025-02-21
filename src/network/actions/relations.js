// actions/someActions.js
import axios from "../api";

import { RELATION_SUCCESS, RELATION_FALIURE } from "../action_types";
// Action Creators
export const fetchRelationSuccess = (data) => ({
  type: RELATION_SUCCESS,
  payload: data,
});

export const fetchRelationFailure = (error) => ({
  type: RELATION_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onRelationList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/getRelations`, {});
      dispatch(fetchRelationSuccess(response.data));
    } catch (error) {
      dispatch(fetchRelationFailure(error));
    }
  };
};
