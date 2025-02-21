// reducers/someReducer.js
import {
  UPDATE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_FALIURE,
} from "../action_types";

const initialState = {
  data: [],
  error: null,
};

const saveProperty = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROPERTY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case UPDATE_PROPERTY_FALIURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default saveProperty;
