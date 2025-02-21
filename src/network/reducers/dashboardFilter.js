// reducers/someReducer.js
import {
  DASHBOARD_REPORT_SUCCESS,
  DASHBOARD_REPORT_FALIURE,
} from "../action_types";

const initialState = {
  data: [],
  error: null,
};

const dashboardFilterRedux = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_REPORT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case DASHBOARD_REPORT_FALIURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardFilterRedux;
