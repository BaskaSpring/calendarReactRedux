import React, {Component} from 'react';

import 'react-day-picker/lib/style.css';
import 'moment/locale/ru';
import "../../resourses/css/calendar.css";
import {connect} from "react-redux";
import Chart from "react-google-charts";



class Calendar2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const data = [[
            {type: 'string', label: 'Task ID'},
            {type: 'string', label: 'Task Name'},
            {type: 'string', label: 'Resource' },
            {type: 'date', label: 'Start Date'},
            {type: 'date', label: 'End Date'},
            {type: 'number', label: 'Duration'},
            {type: 'number', label: 'Percent Complete'},
            {type: 'string', label: 'Dependencies'}
        ]]
        const event = this.props.events.events
        for (let i = 0; i < event.length; i++) {
            if (event[i].status === "ACTIVE") {
                let dateEnd  = new Date(2021,11,31)
                const dateBegin = new Date(event[i].dateBegin)
                if (event[i].dateEnd!==null) {
                    dateEnd = new Date(event[i].dateEnd)
                }
                let mas = [event[i].text, event[i].text, event[i].text,dateBegin,dateEnd,null,100,null]
                data.push(mas)
            }
        }
        debugger
        return (
            <Chart
                width={'100%'}
                height={'400px'}
                chartType="Gantt"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    height: 400,
                    gantt: {
                        trackHeight: 30,
                    },
                }}
                rootProps={{ 'data-testid': '2' }}
            />
        )
    }
}

function mapStateToProps(state) {
    const events = state.events;
    return {
        events,
    };
}

export default connect(mapStateToProps)(Calendar2)