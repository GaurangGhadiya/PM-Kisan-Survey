// reducers/someReducer.js
import { VERIFICATION_SUCCESS, VERIFICATION_FALIURE } from "../action_types";


const initialState = {
  data: [],
  error: null,
};

const verification_reducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFICATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case VERIFICATION_FALIURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default verification_reducer;
