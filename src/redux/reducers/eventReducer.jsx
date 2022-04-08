import { REFRESH_EVENTS} from "../types";

const initialState = []

export default function eventReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case REFRESH_EVENTS:
            return {
                ...state,
                events: payload,
            };
        default:
            return state;
    }
}
