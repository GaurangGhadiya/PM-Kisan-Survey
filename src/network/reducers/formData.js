// src/reducers/yourReducer.js
import { SET_VALUE } from '../action_types';

const initialState = {
    value: null,
};

const formData = (state = initialState, action) => {
    switch (action.type) {
        case SET_VALUE:
            return {
                ...state,
                value: action.payload,
            };
        default:
            return state;
    }
};

export default formData;
