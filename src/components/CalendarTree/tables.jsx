import React, {Component} from 'react';
import 'react-day-picker/lib/style.css';
import DayPicker from "react-day-picker";
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import "../../resourses/css/calendar.css";
import {refresh} from "../../redux/actions/event";
import {selectDay} from "../../redux/actions/selectDay";
import {connect} from "react-redux";
import {selectEvent} from "../../redux/actions/currentEvents";

class Tables extends Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.refreshEvents = this.refreshEvents.bind(this);
        this.state = {
            selectedDays: null,
        };
    }

    handleDayClick(day, {selected}) {
        this.setState({
            selectedDays: selected ? undefined : day,
        });
        const {dispatch} = this.props;
        dispatch(selectDay(selected ? undefined : day))
        dispatch(selectEvent(""))
    }

    refreshEvents() {
        const {dispatch} = this.props;
        dispatch(refresh())
    }

    componentDidMount() {
        this.refreshEvents()
    }

    render() {
        const { events } = this.props;
        const selectedDays =[]
        if (events!==undefined){
            for (let i=0;i<events.length;i++) {
                let dateBegin = events[i].dateBegin
                let dateEnd = events[i].dateEnd
                if (dateBegin){
                    let newDay = new Date(dateBegin)
                    let newDayBegin = new Date(newDay.getFullYear(),newDay.getMonth(),newDay.getDate())
                    selectedDays.push(newDayBegin)
                }
                if (dateEnd){
                    let newDay = new Date(dateEnd)
                    let newDayEnd = new Date(newDay.getFullYear(),newDay.getMonth(),newDay.getDate())
                    selectedDays.push(newDayEnd)
                }
            }
        }
        const modifiers = {
            events: selectedDays,
        }
        const modifiersStyles = {
            events: {
                color: 'white',
                backgroundColor: '#ffc107',
            }
        };
        return (
            <div>
                <DayPicker numberOfMonths={12}
                           month={new Date(2021, 0)}
                           onDayClick={this.handleDayClick}
                           modifiers={modifiers}
                           modifiersStyles={modifiersStyles}
                           pagedNavigation
                           fixedWeeks
                           localeUtils={MomentLocaleUtils}
                           locale="ru"
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {events} = state.events;
    return {
        events,
    };
}

export default connect(mapStateToProps)(Tables)