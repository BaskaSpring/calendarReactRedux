import React, {Component} from 'react';
import 'react-day-picker/lib/style.css';
import 'moment/locale/ru';
import "../../resourses/css/calendar.css";
import {connect} from "react-redux";
import {Button, Card, ListGroup} from "react-bootstrap";
import {selectEvent} from "../../redux/actions/currentEvents";

class CardsEvent extends Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this)
    }


    handleEdit(e) {
        const idEvent = e.target.value;
        const {dispatch} = this.props;
        dispatch(selectEvent(idEvent))
    }


    sameDay(d, d1) {
        return d1.getFullYear() === d.getFullYear()
            && d1.getDate() === d.getDate()
            && d1.getMonth() === d.getMonth();
    }

    render() {
        const arr = []
        const events = this.props.events
        const currentDay = this.props.currentDay
        for (let i=0; i<events.length; i++){
            let add = false
            const dateBegin = new Date(events[i].dateBegin)
            const dateEnd = new Date(events[i].dateEnd)
            if(this.sameDay(dateBegin,currentDay)){
                arr.push(events[i])
                add = true
            }
            if(this.sameDay(dateEnd,currentDay)){
                if (!add) {
                    arr.push(events[i])
                }
            }
        }

        return (
            <div>
                {(arr.length>0)&&(<Card style={{ width: '18rem' }}>
                    <ListGroup variant="flush">
                        {arr.map(x=>(<ListGroup.Item>{x.text}<Button onClick={this.handleEdit} value={x.id} variant="primary">Редактировать</Button></ListGroup.Item>))}
                    </ListGroup>
                </Card>)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {events} = state.events;
    const {currentDay} = state.currentDay;
    return {
        events,
        currentDay,
    };
}

export default connect(mapStateToProps)(CardsEvent)