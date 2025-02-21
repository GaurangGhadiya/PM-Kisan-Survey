// actions/someActions.js
import axios from "../api";

import { CSC_REPORT_DOWNLOAD_SUCCESS, CSC_REPORT_DOWNLOAD_FALIURE } from "../action_types";
// Action Creators
export const fetchDownloadSuccess = (data) => ({
  type: CSC_REPORT_DOWNLOAD_SUCCESS,
  payload: data,
});

export const fetchDownloadFailure = (error) => ({
  type: CSC_REPORT_DOWNLOAD_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onSummaryReportDownload = (wardId, muncipalId, districtId) => {
  return async (dispatch) => {
    try {

      let param=``;

      if(districtId>0){
        param+=`districtId=${districtId}`;
      }
      if(muncipalId>0){
        param+=`&municipalId=${muncipalId}`;
      }
     
      if(wardId>0){
        param+=`&wardId=${wardId}`;
      }

    


      const response = await axios.get(`/download/excel/survey/summary?${param}`, {
        responseType: 'blob',
      });


      const url = window.URL.createObjectURL(new Blob([response.data])); // Create a temporary URL for the blob

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
          "download",
          `SummaryReport.csv`
      ); // Set the filename for the download

      // Append the link to the body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Cleanup: remove the link and revoke the URL
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      dispatch(fetchDownloadSuccess(response.data));
    } catch (error) {
      dispatch(fetchDownloadFailure(error));
    }
  };
};
