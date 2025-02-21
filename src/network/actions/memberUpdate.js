// actions/someActions.js
import axios from "../api";

import { UPDATE_MEMBER_SUCCESS, UPDATE_MEMBER_FALIURE } from "../action_types";
// Action Creators
export const fetchUpdateMemberSuccess = (data) => ({
  type: UPDATE_MEMBER_SUCCESS,
  payload: data,
});

export const fetchUpdateMemberFailure = (error) => ({
  type: UPDATE_MEMBER_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onMemberUpdate = (memberObject) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/family/member/updateData",
        JSON.stringify(memberObject)
      );
      dispatch(fetchUpdateMemberSuccess(response.data));
    } catch (error) {
      dispatch(fetchUpdateMemberFailure(error));
    }
  };
};
