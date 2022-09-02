import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './combineReducer'
// import { persistStore } from "redux-persist";
import { composeWithDevTools } from 'redux-devtools-extension'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const middleware = [thunk]

// let store = createStore(rootReducer, {}, composeWithDevTools(
//     applyMiddleware(...middleware)
// ));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;