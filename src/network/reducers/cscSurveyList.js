// reducers/someReducer.js
import { CSC_SURVEY_REPORT_SUCCESS, CSC_SURVEY_REPORT_FAILURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const cscSurveyList = (state = initialState, action) => {
    switch (action.type) {
        case CSC_SURVEY_REPORT_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case CSC_SURVEY_REPORT_FAILURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default cscSurveyList;
