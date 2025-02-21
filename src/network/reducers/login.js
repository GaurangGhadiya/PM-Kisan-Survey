// reducers/someReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../action_types";


const initialState = {
  data: {},
  error: null,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default login;
