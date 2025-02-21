// reducers/someReducer.js
import { CSC_REPORT_DOWNLOAD_SUCCESS, CSC_REPORT_DOWNLOAD_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const cscReportDownload = (state = initialState, action) => {
    switch (action.type) {
        case CSC_REPORT_DOWNLOAD_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case CSC_REPORT_DOWNLOAD_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default cscReportDownload;
