// reducers/someReducer.js
import { UPDATE_MEMBER_SUCCESS, UPDATE_MEMBER_FALIURE } from "../action_types";

const initialState = {
  data: [],
  error: null,
};

const saveMember = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case UPDATE_MEMBER_FALIURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default saveMember;
