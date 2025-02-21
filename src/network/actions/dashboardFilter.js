// actions/someActions.js
import axios from "../api";

import {
  DASHBOARD_REPORT_SUCCESS,
  DASHBOARD_REPORT_FALIURE,
} from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchDashboardSuccess = (data) => ({
  type: DASHBOARD_REPORT_SUCCESS,
  payload: data,
});

export const fetchDashboardFaliure = (error) => ({
  type: DASHBOARD_REPORT_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onDashboarFilters = (body) => {
  return async (dispatch) => {
    try {
      let url =  `/dashboard/report`
      if(body?.districtId){
        url = url +  `?districtCode=${encryptDataGet(JSON.stringify(body?.districtId))}`
      }
      if(body?.municipalId){
        url = url +  `&blockCode=${encryptDataGet(JSON.stringify(body?.municipalId))}`
      }
      if(body?.wardId){
        url = url +  `&panchayatCode=${encryptDataGet(JSON.stringify(body?.wardId))}`
      }
      if(body?.villageId){
        url = url +  `&villageCode=${encryptDataGet(JSON.stringify(body?.villageId))}`
      }
      const response = await axios.get(url);

      let data =  decryptData(response?.data?.data)
      dispatch(fetchDashboardSuccess(data));
    } catch (error) {
      dispatch(fetchDashboardFaliure(error));
    }
  };
};
