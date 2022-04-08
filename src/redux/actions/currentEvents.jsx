

import {SELECT_EVENTS} from "../types";

export const selectEvent = (eventId) => ({
    type: SELECT_EVENTS,
    payload: eventId
})