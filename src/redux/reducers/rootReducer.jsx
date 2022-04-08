import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import eventReducer from "./eventReducer";
import currentEventsReducer from "./currentEvenstReducer";
import selectDayReducer from "./selectDayReducer";

export default combineReducers({
    auth: authReducer,
    message: messageReducer,
    events: eventReducer,
    currentEvent: currentEventsReducer,
    currentDay: selectDayReducer
});
