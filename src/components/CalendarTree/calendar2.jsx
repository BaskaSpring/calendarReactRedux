import React, {Component} from 'react';

import 'react-day-picker/lib/style.css';
import 'moment/locale/ru';
import "../../resourses/css/calendar.css";
import Tables from "./tables";
import EventAdder from "./eventAdder";
import {connect} from "react-redux";
import CardsEvent from "./cardsEvent";
import EditEvent from "./editEvent";


class Calendar2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const currentDay = this.props.currentDay;
        const currentEvent = this.props.currentEvent;
        return (
            <div className="App">
                <Tables/>
                {!currentEvent && currentDay && (
                    <div>
                        <EventAdder/>
                        <div>
                        <CardsEvent/>
                        </div>
                    </div>
                )}
                {currentEvent && (
                    <EditEvent/>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {currentDay} = state.currentDay;
    const {currentEvent} = state.currentEvent;
    return {
        currentDay,
        currentEvent,
    };
}

export default connect(mapStateToProps)(Calendar2)