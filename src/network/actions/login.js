// actions/someActions.js
import axios from "../api";
import CryptoJS from 'crypto-js';

import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../action_types";
import {  decryptData, encryptDataPost } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchLoginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const fetchLoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});



// Async Action to Fetch Data
export const onLogin = (username, password) => {
  return async (dispatch) => {
// debugger
    let data = {username, password}
    try {
   
      const response = await axios.post(
        "/login",
        encryptDataPost(JSON.stringify(data))
      );

      let originalText = decryptData(response?.data?.data)
      dispatch(fetchLoginSuccess(originalText));
    } catch (error) {
      dispatch(fetchLoginFailure(error));
    }
  };
};
