import {combineReducers} from "redux";
import unitReducer from "./unitReducer";

const rootReducer = combineReducers({unit: unitReducer});

export default rootReducer;