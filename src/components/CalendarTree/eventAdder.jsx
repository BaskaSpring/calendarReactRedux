import React, {Component} from 'react';
import 'react-day-picker/lib/style.css';
import 'moment/locale/ru';
import "../../resourses/css/calendar.css";
import {addEvent} from "../../redux/actions/event";
import {connect} from "react-redux";
import {Button, Form} from "react-bootstrap";

const onlyMonthsOfTheYear = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
]

class EventAdder extends Component {
    constructor(props) {
        super(props);
        this.onChangeTextNewEvent = this.onChangeTextNewEvent.bind(this)
        this.addNewEvent = this.addNewEvent.bind(this)
        this.state = {
            textNewEvent:"",
            loading: false
        };
    }

    onChangeTextNewEvent(e) {
        this.setState({
            textNewEvent: e.target.value,
        });
    }

    addNewEvent(e){
        e.preventDefault();
        this.setState({
            textNewEvent: "",
            message: "",
            loading: true
        });
        const {dispatch} = this.props
        const currentDay = this.props.currentDay
        dispatch(addEvent(currentDay,this.state.textNewEvent))
            .then(()=>{
                this.setState({
                    loading: false
                });
            })
            .catch(() => {
                this.setState({
                    loading: false
                });
            })
    }

    render() {
        const message = this.props.message;
        const currentDay = this.props.currentDay
        const newDate = currentDay.getDate()+" "+onlyMonthsOfTheYear[currentDay.getMonth()]+" "+ currentDay.getFullYear()
        return (
            <div>
                <Form onSubmit={this.addNewEvent}
                      ref={c => {
                          this.form = c;
                      }} >
                    <h3>{newDate}</h3>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Добавить событие</Form.Label>
                        <Form.Control type="text" placeholder="Введите событие"
                                      value={this.state.textNewEvent}
                                      onChange={this.onChangeTextNewEvent}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={this.state.loading}>
                        {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        Добавить
                    </Button>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {currentDay} = state.currentDay;
    const {message} = state.message;
    return {
        currentDay,
        message
    };
}

export default connect(mapStateToProps)(EventAdder)