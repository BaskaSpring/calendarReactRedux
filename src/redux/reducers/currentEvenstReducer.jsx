import {SELECT_EVENTS} from "../types";

const initialState = ""

export default function eventReducer (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SELECT_EVENTS:
            return {
                ...state,
                currentEvent: payload,
            };
        default:
            return state;
    }
}
