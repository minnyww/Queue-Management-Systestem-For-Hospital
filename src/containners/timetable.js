import React, { Component } from 'react';
import Headerbar from '.././components/headerbar'
import DropdownQueue from '../components/Dropdown';

import { Statistic } from "semantic-ui-react";
import moment from "moment";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";

import axios from "./../lib/axios";

BigCalendar.momentLocalizer(moment);
const Calendar = withDragAndDrop(BigCalendar);

class timetable extends Component {
    state = {
        events: [],
        departmentId: 0,
        nurseId: 0,
        Date: new Date(),
        loading: false,

    }
    componentWillMount = async () => {
        const { empId, departmentId } = JSON.parse(localStorage.getItem('userData'))
        this.setState({
            departmentId: departmentId,
            nurseId: empId
        })
        const date = this.pharseDate();
        const { data } = await axios.post(`/getTimetable`, {
            month: date.month,
            departmentId: departmentId
        });
        console.log(data)
        // const appData = data.map(app => {
        //     return {
        //         start: new Date(`${app.month} ${app.day}, ${app.year} ${app.timeStart}`),
        //         end: new Date(`${app.month} ${app.day}, ${app.year} ${app.timeEnd}`),
        //         title: app.firstname + ' ' + app.lastname,
        //     }
        // })
        // console.log(appData)
        // this.setState({
        //     events: appData,
        //     loading: false
        // })
    }

    pharseDate = () => {
        var month = new Array(
            "jan",
            "feb",
            "mar",
            "apr",
            "may",
            "jun",
            "jul",
            "aug",
            "sep",
            "oct",
            "nov",
            "dec"
        );
        var day = new Array(7);
        day[0] = "sun";
        day[1] = "mon";
        day[2] = "tue";
        day[3] = "wed";
        day[4] = "thu";
        day[5] = "fri";
        day[6] = "sat";

        var curr_date = this.state.Date.getDay();
        var curr_month = this.state.Date.getMonth();
        var curr_year = this.state.Date.getFullYear();
        return {
            day: day[curr_date],
            month: month[curr_month],
            year: curr_year,
        }
    }

    resizeEvent = (resizeType, { event, start, end }) => {
        const { events } = this.state;

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
                ? { ...existingEvent, start, end }
                : existingEvent;
        });
        this.setState({
            events: nextEvents
        });
    };
    setField = (field, value) => {
        this.setState({ [field]: value });
    };

    render() {
        return (
            <div >
                <Headerbar />
                <DropdownQueue />
                <center>
                    {!this.state.loading &&
                        <Calendar
                            events={this.state.events}
                            style={{
                                height: '90vh',
                                width: '95%',
                                marginBottom: "5%",
                                marginTop: "2%"
                            }}
                            selectable
                            events={this.state.events}
                            // onEventDrop={this.moveEvent}
                            resizable
                            onEventResize={this.resizeEvent}
                            defaultView={BigCalendar.Views.WEEK}
                        // defaultDate={this.state.date}
                        // onSelectEvent={e => this.showDetailAppointment(e)}
                        // onSelectSlot={this.handleSelect}
                        />}
                </center>
            </div>
        );
    }
}



export default timetable;