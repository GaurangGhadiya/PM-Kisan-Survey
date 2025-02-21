// actions/someActions.js
import axios from "../api";

import { WARD_SUCCESS, WARD_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchWardSuccess = (data) => ({
  type: WARD_SUCCESS,
  payload: data,
});

export const fetchWardFailure = (error) => ({
  type: WARD_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onWardList = (id) => {
  return async (dispatch) => {
    
    try {
      const response = await axios.get(`/master-data?status=${encryptDataGet(`true`)}&parentId=${encryptDataGet(JSON.stringify(id))}&masterName=${encryptDataGet("panchayat")}`, {});
      let responseData = decryptData(response?.data?.data)
      dispatch(fetchWardSuccess(responseData));
    } catch (error) {
      dispatch(fetchWardFailure(error));
    }
  };
};

export const onWardListSurveyor = (municipalityID, userName) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `getWards?municipalId=${municipalityID}&userName=${userName}`,
        {}
      );

      dispatch(fetchWardSuccess(response.data));
    } catch (error) {
      dispatch(fetchWardFailure(error));
    }
  };
};
