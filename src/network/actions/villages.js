// actions/someActions.js
import axios from "../api";

import { WARD_SUCCESS, WARD_FALIURE, VILLAGE_SUCCESS, VILLAGE_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchVillageSuccess = (data) => ({
  type: VILLAGE_SUCCESS,
  payload: data,
});

export const fetchillageFailure = (error) => ({
  type: VILLAGE_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onVillageList = (id) => {
  return async (dispatch) => {
    
    try {
      const response = await axios.get(`/master-data?status=${encryptDataGet(`true`)}&parentId=${encryptDataGet(JSON.stringify(id))}&masterName=${encryptDataGet("village")}`, {});
      let responseData = decryptData(response?.data?.data)
      dispatch(fetchVillageSuccess(responseData));
    } catch (error) {
      dispatch(fetchillageFailure(error));
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

      dispatch(fetchVillageSuccess(response.data));
    } catch (error) {
      dispatch(fetchillageFailure(error));
    }
  };
};
