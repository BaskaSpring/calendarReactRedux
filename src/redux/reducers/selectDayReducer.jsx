import {SELECT_DAY} from "../types";

const initialState = ""

export default function eventReducer (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SELECT_DAY:
            return {
                ...state,
                currentDay: payload,
            };
        default:
            return state;
    }
}