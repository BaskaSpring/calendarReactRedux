import UserService from "../../services/api";
import {REFRESH_EVENTS, SELECT_EVENTS, SET_MESSAGE} from "../types";

export const refresh = () => (dispatch) => {
    return UserService.getCalendarDate().then(
        (data) => {
            dispatch({
                type: REFRESH_EVENTS,
                payload: data.data.eventList
            });
            return Promise.resolve();
        })
};


export const deleteEvent = (id) => (dispatch) => {
    debugger
    return UserService.deleteEvent(id).then(
        (data) => {
            dispatch({
                type: REFRESH_EVENTS,
                payload: data.data.eventList
            });

            dispatch({
                type: SELECT_EVENTS,
                payload: ""
            });
            return Promise.resolve();
        })
};


export const editEvent = (id,dateBegin,dateEnd,text,status) => (dispatch) => {
    return UserService.editEvent(id,dateBegin,dateEnd,text,status).then(
        (data) => {
            debugger
            dispatch({
                type: REFRESH_EVENTS,
                payload: data.data.eventList,
            });
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        })
};

export const addEvent = (date,text) => (dispatch) => {
    return UserService.addNewEvent(date,text).then(
        (data) => {
            debugger
            dispatch({
                type: REFRESH_EVENTS,
                payload: data.data.eventList,
            });
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        })
};