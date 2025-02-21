// actions/someActions.js
import axios from "../api";

import { FAMILIES_LIST_SUCCESS, FAMILIES_LIST_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchFamiliesListSuccess = (data) => ({
  type: FAMILIES_LIST_SUCCESS,
  payload: data,
});

export const fetchFamiliesListFailure = (error) => ({
  type: FAMILIES_LIST_FALIURE,
  payload: error,
});

export const onFamiliesList = (body) => {
  return async (dispatch) => {
    // debugger
    try {
      let url =  `/farmer/summaryList`
      if(body?.size){
        url = url +  `?size=${encryptDataGet(JSON.stringify(body?.size))}`
      }
      if(body?.page){
        url = url +  `&page=${encryptDataGet(JSON.stringify(body?.page))}`
      }
     
      if(body?.districtCode){
        url = url +  `&districtCode=${encryptDataGet(JSON.stringify(body?.districtCode))}`
      }
      if(body?.blockCode){
        url = url +  `&blockCode=${encryptDataGet(JSON.stringify(body?.blockCode))}`
      }
      if(body?.panchayatCode){
        url = url +  `&panchayatCode=${encryptDataGet(JSON.stringify(body?.panchayatCode))}`
      }
      if(body?.villageCode){
        url = url +  `&villageCode=${encryptDataGet(JSON.stringify(body?.villageCode))}`
      }
      const response = await axios.get(url);

      let resData = decryptData(response?.data?.data)
      dispatch(fetchFamiliesListSuccess(resData));
    } catch (error) {
      dispatch(fetchFamiliesListFailure(error));
    }
  };
};
