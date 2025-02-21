import { SHOW_LOADER_SUCCESS, SHOW_LOADER_FALIURE } from '../action_types';
// Action Creators
export const showLoaderSuccess = (data) => ({
    type: SHOW_LOADER_SUCCESS,
    payload: data,
});

export const showLoaderFailure = (error) => ({
    type: SHOW_LOADER_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onShowLoader = (loaderBoolean) => {
    return async (dispatch) => {
        try {
            dispatch(showLoaderSuccess(loaderBoolean));
        } catch (error) {
            dispatch(showLoaderFailure(false));
        }
    };
};



