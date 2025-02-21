// reducers/someReducer.js
import { UPDATE_FAMILY_SUCCESS, UPDATE_FAMILY_FALIURE } from "../action_types";

const initialState = {
  data: [],
  error: null,
};

const saveFamily = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FAMILY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case UPDATE_FAMILY_FALIURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default saveFamily;
