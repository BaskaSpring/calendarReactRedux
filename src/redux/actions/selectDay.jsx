import {SELECT_DAY} from "../types";

export const selectDay= (day) => ({
    type: SELECT_DAY,
    payload: day
})