// src/reducers/yourReducer.js
import { FAMILY_DETAIL_SUCCESS, FAMILY_DETAIL_FALIURE } from '../action_types';

const initialState = {
    value: null,
};

const familyDetail = (state = initialState, action) => {
    switch (action.type) {
        case FAMILY_DETAIL_SUCCESS:
            return {
                ...state,
                value: action.payload,
            };
        default:
            return state;
    }
};

export default familyDetail;
