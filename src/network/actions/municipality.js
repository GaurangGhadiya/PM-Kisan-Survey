// actions/someActions.js
import axios from "../api";

import { MUNICIPALITY_SUCCESS, MUNICIPALITY_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchMunicipalitySuccess = (data) => ({
  type: MUNICIPALITY_SUCCESS,
  payload: data,
});

export const fetchMunicipalityFailure = (error) => ({
  type: MUNICIPALITY_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onMunicipalityList = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/master-data?status=${encryptDataGet(`true`)}&parentId=${encryptDataGet(JSON.stringify(id))}&masterName=${encryptDataGet("block")}`,
        {}
      );
      let responseData = decryptData(response?.data?.data)
      dispatch(fetchMunicipalitySuccess(responseData));
    } catch (error) {
      dispatch(fetchMunicipalityFailure(error));
    }
  };
};
