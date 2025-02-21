// actions/someActions.js
import axios from "../api";

import {
  UPDATE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_FALIURE,
} from "../action_types";
// Action Creators
export const fetchUpdatePropertySuccess = (data) => ({
  type: UPDATE_PROPERTY_SUCCESS,
  payload: data,
});

export const fetchUpdatePropertyFailure = (error) => ({
  type: UPDATE_PROPERTY_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onPropertyUpdate = (propertyObject) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/familyPropertyUpdate",
        JSON.stringify(propertyObject)
      );
      dispatch(fetchUpdatePropertySuccess(response.data));
    } catch (error) {
      dispatch(fetchUpdatePropertyFailure(error));
    }
  };
};
