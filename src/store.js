// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Use Redux Thunk for async actions
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './network/reducers'; // Create a rootReducer


const middleware = [thunk];
const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
