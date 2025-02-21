// reducers/someReducer.js
import {
  SUMMARY_REPORT_SUCCESS,
  SUMMARY_REPORT_FALIURE,
} from "../action_types";

const initialState = {
  data: [],
  error: null,
};

const surveySummaryRedux = (state = initialState, action) => {
  switch (action.type) {
    case SUMMARY_REPORT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case SUMMARY_REPORT_FALIURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default surveySummaryRedux;
