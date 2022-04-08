// import React, {Component} from "react";
//
//
// import "../resourses/css/calendar.css";
// import {connect} from "react-redux";
// import {refresh,addEvent} from "../redux/actions/event";
// import {selectEvents} from "../redux/actions/currentEvents";
// import {Button, Card, Form, FormControl, InputGroup, ListGroup, Table} from "react-bootstrap";
//
//
// const year = new Date().getFullYear()
//
// const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
// const monthsOfTheYear = [
//     {number: 0, month: "Январь"},
//     {number: 1, month: "Февраль"},
//     {number: 2, month: "Март"},
//     {number: 3, month: "Апрель"},
//     {number: 4, month: "Май"},
//     {number: 5, month: "Июнь"},
//     {number: 6, month: "Июль"},
//     {number: 7, month: "Август"},
//     {number: 8, month: "Сентябрь"},
//     {number: 9, month: "Октябрь"},
//     {number: 10, month: "Ноябрь"},
//     {number: 11, month: "Декабрь"}
// ]
//
// const onlyMonthsOfTheYear = [
//     "Января",
//     "Февраля",
//     "Марта",
//     "Апреля",
//     "Мая",
//     "Июня",
//     "Июля",
//     "Августа",
//     "Сентября",
//     "Октября",
//     "Ноября",
//     "Декабря"
// ]
//
// class calendar extends Component {
//     constructor(props) {
//         super(props);
//         this.changeEvent = this.changeEvent.bind(this)
//         this.refresh = this.refresh.bind(this)
//         this.onChangeTextNewEvent = this.onChangeTextNewEvent.bind(this)
//         this.addNewEvent = this.addNewEvent.bind(this)
//         this.editEvent = this.editEvent.bind(this)
//         this.eventEdit = this.eventEdit.bind(this)
//         this.state = {
//             selectedDay: "",
//             textNewEvent: "",
//             loading: false,
//             editEv: false,
//             eventId: 0
//         };
//     }
//
//
//     //рисует дни в таблице
//     paintTable(month) {
//         let events = this.props.events;
//         let enableBegin = false;
//         let enableEnd = false;
//         let enable = false;
//         const startDay = new Date(year, month, 1).getDay() - 1
//         const thisMonth = new Date(year, month)
//         const nextMonth = new Date(year, month + 1)
//         const countDay = (nextMonth - thisMonth) / (1000 * 3600 * 24)
//         const countColumn = 7
//         const countRows = Math.ceil((startDay + countDay) / 7)
//         let table = [], tr;
//         let day = 0;
//         let id;
//         for (let i = 0; i < countRows; i++) {
//             tr = []
//             for (let j = 0; j < countColumn; j++) {
//                 if (((i === 0) && (j < startDay)) || (day >= countDay)) {
//                     tr.push(<td key={Math.random()}></td>)
//                 } else {
//                     day++;
//                     enableBegin = false;
//                     enableEnd = false;
//                     enable = false
//                     if (events !== undefined) {
//                         let thisDay = new Date(year, month, day)
//                         for (id = 0; id < events.length; id++) {
//                             let dateBegin = new Date(events[id].dateBegin)
//                             let dateEnd = new Date(events[id].dateEnd)
//                             if (!enableBegin) {
//                                 enableBegin = this.sameDay(dateBegin, thisDay)
//                             }
//                             if (!enableEnd) {
//                                 enableEnd = this.sameDay(dateEnd, thisDay)
//                             }
//                             if ((enableEnd) && (enableBegin)) {
//                                 enable = true
//                                 break
//                             }
//                         }
//                     }
//                     let thisDay = new Date(year, month, day)
//                     if (enable) {
//                         tr.push(<td key={Math.random()}><Button variant="warning" value={thisDay}
//                                                                 onClick={this.changeEvent}
//                                                                 key={Math.random()}>{day}</Button>
//                         </td>)
//                     } else if (enableBegin) {
//                         tr.push(<td key={Math.random()}><Button variant="danger" value={thisDay}
//                                                                 onClick={this.changeEvent}
//                                                                 key={Math.random()}>{day}</Button>
//                         </td>)
//                     } else if (enableEnd) {
//                         tr.push(<td key={Math.random()}><Button variant="success" value={thisDay}
//                                                                 onClick={this.changeEvent}
//                                                                 key={Math.random()}>{day}</Button>
//                         </td>)
//                     } else {
//                         tr.push(<td key={Math.random()}><Button variant="primary" value={thisDay}
//                                                                 onClick={this.changeEvent}
//                                                                 key={Math.random()}>{day}</Button>
//                         </td>)
//                     }
//                 }
//             }
//             table.push(<tr key={Math.random()}>{tr}</tr>)
//         }
//         return table;
//     }
//
//
//     //шапка таблицы с днями недели
//     table(month) {
//         return (
//             <Table striped bordered hover size="sm" key={Math.random()}>
//                 <thead key={Math.random()}>
//                 <tr key={Math.random()}>
//                     {daysOfWeek.map(day => (<th scope="col" key={Math.random()}>{day}</th>))}
//                 </tr>
//                 </thead>
//                 <tbody key={Math.random()}>
//                 {this.paintTable(month)}
//                 </tbody>
//             </Table>
//         );
//     }
//
//
//     //вызывает месяцы для рисования
//     tables() {
//         return (
//             <div className="MyTable" key={Math.random()}>
//                 {monthsOfTheYear.map((obj) => (
//                     <div key={Math.random()}>
//                         <h3 key={Math.random()}>{obj.month}</h3>
//                         {this.table(obj.number)}
//                     </div>
//                 ))}
//             </div>
//         );
//     }
//
//     cards(arr) {
//         return (
//             <Card style={{width: '30rem'}}>
//                 <ListGroup variant="flush">
//                     {arr.map(x => {
//                         return (<ListGroup.Item>{x.text}<Button variant="primary" onClick={this.editEvent} value = {x.id}>Редактировать</Button></ListGroup.Item>)
//                     })}
//                 </ListGroup>
//             </Card>
//         )
//     }
//
//     events() {
//         let StringDay = ""
//         if (this.state.selectedDay !== "") {
//             let thisDay = new Date(this.state.selectedDay)
//             StringDay = thisDay.getDate() + " " + onlyMonthsOfTheYear[thisDay.getMonth()] + " " + thisDay.getFullYear()
//         }
//         let arr = []
//         if (this.props.currentEvents !== undefined) {
//             arr = this.props.currentEvents;
//         }
//         return (
//             <div className="MyEvents">
//                 <div className="fixed">
//                     {StringDay && (
//                         <div className="obertka">
//                             <h4>{StringDay}</h4>
//                             {this.addEvent()}
//                             <div>
//                                 {this.cards(arr)}
//                             </div>
//                         </div>)}
//                 </div>
//             </div>
//         )
//     }
//
//     editEvent(e){
//         debugger
//         this.setState({
//             editEv: true,
//             eventId: e.target.value
//         })
//     }
//
//
//     sameDay(d, d1) {
//         return d1.getFullYear() === d.getFullYear()
//             && d1.getDate() === d.getDate()
//             && d1.getMonth() === d.getMonth();
//     }
//
//     refresh() {
//         const {dispatch} = this.props;
//         dispatch(refresh())
//     }
//
//     componentDidMount() {
//         this.refresh()
//     }
//
//     onChangeTextNewEvent(e){
//         this.setState({
//             textNewEvent: e.target.value
//         })
//     }
//
//     addNewEvent(e){
//         e.preventDefault();
//         this.setState({
//             textNewEvent: "",
//             message: "",
//             loading: true
//         });
//         const {dispatch} = this.props;
//         dispatch(addEvent(this.state.selectedDay,this.state.textNewEvent))
//             .then(()=>{
//                 let thisDay = new Date(this.state.selectedDay)
//                 this.pureFunc(thisDay,this.props.events)
//                 this.setState({
//                     loading: false
//                 });
//             })
//             .catch(() => {
//             this.setState({
//                 loading: false
//             });
//         })
//
//     }
//
//
//     addEvent() {
//         const { message } = this.props;
//         return (
//             <div className="formControl">
//                 <Form onSubmit={this.addNewEvent}
//                       ref={c => {
//                           this.form = c;
//                       }} >
//                     <Form.Group controlId="formBasicText">
//                         <Form.Label>Добавить событие</Form.Label>
//                         <Form.Control type="text" placeholder="Введите событие"
//                                       value={this.state.textNewEvent}
//                                       onChange={this.onChangeTextNewEvent}/>
//                     </Form.Group>
//                     <Button variant="primary" type="submit" disabled={this.state.loading}>
//                         {this.state.loading && (
//                             <span className="spinner-border spinner-border-sm"></span>
//                         )}
//                         Добавить
//                     </Button>
//                     {message && (
//                         <div className="form-group">
//                             <div className="alert alert-danger" role="alert">
//                                 {message}
//                             </div>
//                         </div>
//                     )}
//                 </Form>
//             </div>
//         )
//     }
//
//     pureFunc(thisDay,events){
//         if (events!==undefined) {
//             let arr = []
//             for (let i = 0; i < events.length; i++) {
//                 let eventDateBegin = new Date(events[i].dateBegin)
//                 if (this.sameDay(eventDateBegin, thisDay)) {
//                     arr.push(events[i])
//                 }
//                 let eventDateEnd = new Date(events[i].dateEnd)
//                 if (this.sameDay(eventDateEnd, thisDay)) {
//                     arr.push(events[i])
//                 }
//             }
//             const {dispatch} = this.props;
//             dispatch(selectEvents(arr))
//         }
//     }
//
//     eventEdit(id){
//         let thisElement = {}
//         let events = this.props.events;
//         for(let i = 0;i<events.length;i++ ){
//             if (events[i].id == id){
//                 thisElement = events[i]
//                 break
//             }
//         }
//         debugger
//         return(
//             <div>
//                 <InputGroup className="mb-3">
//                     <InputGroup.Prepend>
//                         <InputGroup.Text id="basic-addon1">Дата начала</InputGroup.Text>
//                     </InputGroup.Prepend>
//                     <FormControl
//                         placeholder={thisElement.dateBegin}
//                         aria-label={thisElement.dateBegin}
//                         aria-describedby="basic-addon1"
//                     />
//                 </InputGroup>
//                 <InputGroup className="mb-3">
//                     <InputGroup.Prepend>
//                         <InputGroup.Text id="basic-addon1">Дата конца</InputGroup.Text>
//                     </InputGroup.Prepend>
//                     <FormControl
//                         placeholder={thisElement.dateEnd}
//                         aria-label={thisElement.dateEnd}
//                         aria-describedby="basic-addon1"
//                     />
//                 </InputGroup>
//                 <InputGroup className="mb-3">
//                     <InputGroup.Prepend>
//                         <InputGroup.Text id="basic-addon1">Событие</InputGroup.Text>
//                     </InputGroup.Prepend>
//                     <FormControl
//                         placeholder={thisElement.text}
//                         aria-label={thisElement.text}
//                         aria-describedby="basic-addon1"
//                     />
//                 </InputGroup>
//                 <Form.Group controlId="exampleForm.SelectCustom">
//                 <Form.Label>Статус</Form.Label>
//                 <Form.Control as="select" custom>
//                     <option>Открыто</option>
//                     <option>Закрыто</option>
//                     <option>Удалено</option>
//                 </Form.Control>
//             </Form.Group>
//             </div>
//         )
//     }
//
//
//     changeEvent(e) {
//         this.setState({
//             selectedDay: e.target.value
//         })
//         let thisDay = new Date(e.target.value)
//         let events = this.props.events;
//         this.pureFunc(thisDay,events)
//     }
//
//     render() {
//         const { editEv, eventId} = this.state
//         return (
//             <div className="App">
//                 {this.tables()}
//                 {!editEv&&this.events()}
//                 {editEv&&this.eventEdit(eventId)}
//             </div>
//         );
//     }
// }
//
// function mapStateToProps(state) {
//     const {events} = state.events;
//     const {currentEvents} = state.currentEvents;
//     const {message} = state.message;
//     return {
//         events,
//         currentEvents,
//         message
//     };
// }
//
// export default connect(mapStateToProps)(calendar);
//
