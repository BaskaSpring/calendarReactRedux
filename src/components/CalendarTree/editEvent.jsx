import React, {Component} from 'react';
import 'react-day-picker/lib/style.css';
import 'moment/locale/ru';
import "../../resourses/css/calendar.css";
import {connect} from "react-redux";
import {InputGroup, FormControl, Form, Button} from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {selectEvent} from "../../redux/actions/currentEvents";
import {deleteEvent, editEvent} from "../../redux/actions/event";


class EditEvent extends Component {
    constructor(props) {
        super(props);
        this.handleDayChangeBegin = this.handleDayChangeBegin.bind(this);
        this.handleDayChangeEnd = this.handleDayChangeEnd.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChangeText = this.handleChangeText.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.statusSelect = this.statusSelect.bind(this)
        this.state = {
            selectedDayBegin: undefined,
            isEmptyBegin: true,
            isDisabledBegin: false,
            selectedDayEnd: undefined,
            isEmptyEnd: true,
            isDisabledEnd: false,
            text:"",
            status: false,
            statusText: ""
        };
    }


    handleDayChangeBegin(selectedDayBegin, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
            selectedDayBegin: selectedDayBegin,
            isEmptyBegin: !input.value.trim(),
            isDisabledBegin: modifiers.disabled === true,
        });
    }

    handleDayChangeEnd(selectedDayEnd, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
            selectedDayEnd: selectedDayEnd,
            isEmptyEnd: !input.value.trim(),
            isDisabledEnd: modifiers.disabled === true,
        });
    }


    handleCancel(e) {
        const {dispatch} = this.props;
        dispatch(selectEvent(""))
    }
    handleDelete() {
        const currentEventId = this.props.currentEvent
        const {dispatch} = this.props;
        dispatch(deleteEvent(currentEventId))
    }

    handleChangeText(e) {
        const currentEventId = this.props.currentEvent
        const {dispatch} = this.props;
        dispatch(deleteEvent(currentEventId))
    }

    handleEdit(){
        const currentEventId = this.props.currentEvent
        let currentEvent = ""
        const event = this.props.events.events
        let numId = Number(currentEventId)
        for (let  i = 0;i<event.length;i++){
            if (event[i].id===numId){
                currentEvent = event[i];
                break
            }
        }
        let status = ""
        const {dispatch} = this.props;
        debugger
        if (this.state.statusText==="Закрыто"){
            status = "CLOSE"
        } else{
            status = "ACTIVE"
        }
        dispatch(editEvent(
            currentEvent.id,
            this.state.selectedDayBegin,
            this.state.selectedDayEnd,
            this.state.text,
            status
        ))
    }

    componentDidMount() {
        const currentEventId = this.props.currentEvent
        let currentEvent = ""
        const event = this.props.events.events
        let numId = Number(currentEventId)
        for (let  i = 0;i<event.length;i++){
            if (event[i].id===numId){
                currentEvent = event[i];
                break
            }
        }
        let dateBegin = null;
        if (currentEvent.dateBegin!==null) {
            dateBegin = new Date(currentEvent.dateBegin)
            this.setState({
                selectedDayBegin: dateBegin
            })
        }
        let dateEnd = null;
        if (currentEvent.dateEnd!==null) {
            dateEnd = new Date(currentEvent.dateEnd)
            this.setState({
                selectedDayEnd: dateEnd
            })
        }
        if (currentEvent.status === "CLOSE") {
            this.setState({
                text: currentEvent.text,
                status: true,
                statusText: "Закрыто"

            })
        } else{
            this.setState({
                text: currentEvent.text,
                statusText: "Открыто"
            })
        }
    }

    statusSelect(e){
        this.setState({
            statusText: e.target.value
        })
    }

    render() {
        const currentEventId = this.props.currentEvent
        let currentEvent = ""
        const event = this.props.events.events
        let numId = Number(currentEventId)
        for (let  i = 0;i<event.length;i++){
            if (event[i].id===numId){
                currentEvent = event[i];
                break
            }
        }
        const { selectedDayBegin, isDisabledBegin, isEmptyBegin } = this.state;
        const { selectedDayEnd, isDisabledEnd, isEmptyEnd } = this.state;
        return (
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Текст</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        value = {this.state.text}
                        onChange={currentEvent.text}
                        aria-label={currentEvent.text}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Статус</Form.Label>
                        {this.state.status && (
                            <Form.Control  onClick = {this.statusSelect} as="select" custom>
                                <option>Закрыто</option>
                                <option>Открыто</option>
                            </Form.Control>
                        )}
                        {!this.state.status && (
                            <Form.Control onClick = {this.statusSelect} as="select" custom>
                                <option>Открыто</option>
                                <option>Закрыто</option>
                            </Form.Control>
                        )}
                    </Form.Group>
                </Form>
                <div>
                    <h3>Начала события</h3>
                    <DayPickerInput
                        value={selectedDayBegin}
                        onDayChange={this.handleDayChangeBegin}
                        dayPickerProps={{
                            selectedDays: selectedDayBegin,
                        }}
                    />
                    <p>
                        {isEmptyBegin && 'Please type or pick a day'}
                        {!isEmptyBegin && !selectedDayBegin && 'This day is invalid'}
                        {selectedDayBegin && isDisabledBegin && 'This day is disabled'}
                        {selectedDayBegin &&
                        !isDisabledBegin &&
                        `You chose ${selectedDayBegin.toLocaleDateString()}`}
                    </p>
                </div>


                <div>
                    <h3>Конец события</h3>
                    <DayPickerInput
                        value={selectedDayEnd}
                        onDayChange={this.handleDayChangeEnd}
                        dayPickerProps={{
                            selectedDays: selectedDayEnd,
                        }}
                    />
                    <p>
                        {isEmptyEnd && 'Please type or pick a day'}
                        {!isEmptyEnd && !selectedDayEnd && 'This day is invalid'}
                        {selectedDayEnd && isDisabledEnd && 'This day is disabled'}
                        {selectedDayEnd &&
                        !isDisabledEnd &&
                        `You chose ${selectedDayEnd.toLocaleDateString()}`}
                    </p>
                </div>
                <div>
                    <Button variant="primary">Закрыть</Button>
                    <Button onClick={this.handleEdit}variant="success">Изменить</Button>
                    <Button onClick={this.handleCancel} variant="warning">Отмена</Button>
                    <Button onClick={this.handleDelete}variant="danger">Удалить</Button>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const events = state.events;
    const {currentEvent} = state.currentEvent;
    return {
        events,
        currentEvent,
    };
}

export default connect(mapStateToProps)(EditEvent)