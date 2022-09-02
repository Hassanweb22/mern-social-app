import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";
import profileReducer from "./reducers/profileReducer";

export default combineReducers({
    authReducer,
    alertReducer,
    profileReducer
})