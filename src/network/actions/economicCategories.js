// actions/someActions.js
import axios from "../api";

import {
  ECONOMIC_CATEGORIES_SUCCESS,
  ECONOMIC_CATEGORIES_FALIURE,
} from "../action_types";
// Action Creators
export const fetchEconomicCategoriesSuccess = (data) => ({
  type: ECONOMIC_CATEGORIES_SUCCESS,
  payload: data,
});

export const fetchEconomicCategoriesFailure = (error) => ({
  type: ECONOMIC_CATEGORIES_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onEconomicCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/getEconomicCategories`, {});
      dispatch(fetchEconomicCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(fetchEconomicCategoriesFailure(error));
    }
  };
};
