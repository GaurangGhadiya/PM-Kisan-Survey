// actions/someActions.js
import axios from "../api";

import { CSCUSER_SUCCESS, CSCUSER_FAILURE } from "../action_types";
// Action Creators
export const fetchCSCUserSuccess = (data) => ({
  type: CSCUSER_SUCCESS,
  payload: data,
});

export const fetchCSCUserFailure = (error) => ({
  type: CSCUSER_FAILURE,
  payload: error,
});

// Async Action to Fetch Data
export const onCSCUserListSurveyor = (districtid,ward_id,municipalid) => {
  return async (dispatch) => {

    try {
      const response = await axios.get(`/user/getCSCUsers?districtCode=${districtid?.code?districtid?.code:""}&wardId=${ward_id?ward_id:""}&municipalId=${municipalid.value?municipalid.value:""}`, {});
      dispatch(fetchCSCUserSuccess(response.data));
    } catch (error) {
      dispatch(fetchCSCUserFailure(error));
    }
  };
};
