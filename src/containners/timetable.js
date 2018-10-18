import React, { Component } from 'react';
import Headerbar from '.././components/headerbar'
import DropdownQueue from '../components/Dropdown';

import { Statistic } from "semantic-ui-react";
import moment from "moment";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";
import Modal from 'react-responsive-modal';

import axios from "./../lib/axios";
import swal from 'sweetalert'
import { Grid, Button, Form, List, Label, Dropdown, Input, Header, Icon, Divider } from "semantic-ui-react";

import ModalDetailTimetable from "../components/modalDetailTimetable";

BigCalendar.momentLocalizer(moment);
const Calendar = withDragAndDrop(BigCalendar);

class timetable extends Component {
    state = {
        events: [],
        departmentId: 0,
        nurseId: 0,
        Date: new Date(),
        loading: false,
        selectEvent: 0,
        timetable: '',
        openDetail: false,

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
        const appData = data.map(app => {
            return {
                start: new Date(`${app.month} ${app.Date}, ${app.Year} ${app.timeStart}`),
                end: new Date(`${app.month} ${app.Date}, ${app.Year} ${app.timeEnd}`),
                title: app.firstname + ' ' + app.lastname,
                id: app.timetableId,
                doctor: app.doctorId,
                status: app.statusId
            }
        })
        console.log(appData)
        this.setState({
            events: appData,
            loading: false,
            timetable: data
        })
        console.log(this.state.events)
        this.getTimetable()

    }

    getEvents = async () => {
        console.log('เข้า get Eve')
        const date = this.pharseDate();
        const { data } = await axios.post(`/getTimetable`, {
            month: date.month,
            departmentId: this.state.departmentId
        });
        const appData = data.map(app => {
            return {
                start: new Date(`${app.month} ${app.Date}, ${app.Year} ${app.timeStart}`),
                end: new Date(`${app.month} ${app.Date}, ${app.Year} ${app.timeEnd}`),
                title: app.firstname + ' ' + app.lastname,
                id: app.timetableId,
                doctor: app.doctorId,
                status: app.statusId
            }
        })
        this.setState({
            events: appData,
        })
    }

    getTimetable = async () => {
        const date = this.pharseDate();
        var { data } = await axios.post(`/getTimetable`, {
            month: date.month,
            departmentId: this.state.departmentId
        });
        this.setState({
            timetable: data,
        })
        console.log(this.state.timetable)
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

    moveEvent = async ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
        const { events } = this.state;

        const idx = events.indexOf(event);
        let allDay = event.allDay;

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true;
        } else if (event.allDay && !droppedOnAllDaySlot) {
        }

        const updatedEvent = { ...event, start, end, allDay };

        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        this.setState({
            events: nextEvents
        });
        console.log(updatedEvent.start.toString().substr(0, 24))
        // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
        swal("Success!", `HN: ${event.title} was dropped onto ${updatedEvent.start.toString().substr(0, 24)}`, "success");
        var month = new Array(
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        );
        var day = new Array(7);
        day[0] = "Sun";
        day[1] = "Mon";
        day[2] = "Tue";
        day[3] = "Wed";
        day[4] = "Thu";
        day[5] = "Fri";
        day[6] = "Sat";

        var curr_date = updatedEvent.start.getDay();
        var curr_month = updatedEvent.start.getMonth();
        var curr_year = updatedEvent.start.getFullYear();
        var timeStart = moment(updatedEvent.start, "HH:mm").format("HH:mm");
        var timeEnd = moment(updatedEvent.end, "HH:mm").format("HH:mm");

        console.log(updatedEvent)
        console.log(curr_date, curr_month, curr_year, timeStart, timeEnd)

        await axios.post("/updateDoctorTimetable", {
            date: updatedEvent.start.getDate(),
            day: day[curr_date].toLowerCase(),
            month: month[curr_month].toLowerCase(),
            year: curr_year,
            timeStart: timeStart,
            timeEnd: timeEnd,
            timetableId: updatedEvent.id
        });
    }

    handleSelect = async ({ start }) => {
        this.setState({
            Date: moment(start).format('YYYY-MM-DD'),
            open: true
        })
    }

    showDetailTimetable = async (e) => {
        this.setState({
            openDetail: true,
            selectEvent: e.id
        })
    }

    openConfirm = (index) => {
        console.log('เข้า Confirm')
        let swl = ''
        swl = swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                console.log(this.state.events[index])
                if (willDelete) {
                    await this.deleteTimetable(index)
                }
            });
        return swl
    }

    deleteTimetable = (index) => {
        console.log("เข้า ลบ")
        this.setState({
            openDetail: false,
        })
        console.log(this.state.events[index])
        if (this.state.events[index].status === 3 || this.state.events[index].status === 1) {
            swal("Cannot Delete this doctor because has patient in room with this Doctor", {
                icon: "warning",
            });
        }
        else {
            axios.delete(`/deleteTimetable/${this.state.selectEvent}`)
            .then(resp => {
                console.log('success')
                this.getEvents()
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            }).catch(err => {
                console.log('error')
            })
        }
    }

    showDetailTimetableDescription = () => {
        const { timetable, selectEvent } = this.state
        let tmp = ""
        tmp = timetable.filter(data => data.timetableId === selectEvent)
            .map((data, index) => {
                return <div key={index}>
                    {/* <Header as='h4' style={{ marginTop: 5, fontSize: '24px' }}>
                        {data.firstName} {data.lastName}
                    </Header> */}
                    <Label color="teal" style={{ fontSize: '14px', fontWeight: 'lighter' }}>
                        <Icon className='time' />Date : {data.Date} {data.day} {data.month} {data.Year}
                    </Label>
                    {console.log(data)}
                    <List relaxed style={{ padding: '10px' }}>
                        <List.Item>
                            <List.Icon name='user' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as="h4">Time : {data.timeStart.toString().substr(0, 5)} To {data.timeEnd.toString().substr(0, 5)} </List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='doctor' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as="h4">Doctor : {data.firstname} {data.lastname}  </List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='building' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as="h4">Room : {data.roomId}</List.Header>
                            </List.Content>
                        </List.Item>
                    </List>
                    <Divider />
                    <center>
                        <List horizontal divided relaxed='very'>
                            <List.Item >
                                <List.Content >
                                    <List.Header  >
                                        <Icon name="pencil" size='small' style={{ fontSize: '16px' }}></Icon>
                                        Edit
                                    </List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item >
                                <List.Content>
                                    <List.Header
                                        onClick={() => this.openConfirm(index)}
                                    >
                                        <Icon name="trash" size='small' style={{ fontSize: '16px' }}></Icon>
                                        delete
                                    </List.Header>
                                </List.Content>
                            </List.Item>
                        </List>
                    </center>
                </div>
            })

        return tmp
    }


    setField = (field, value) => {
        this.setState({ [field]: value });
    };

    render() {
        return (
            <div >
                <Headerbar />
                <DropdownQueue />
                <Modal
                    center
                    styles={{ modal: { width: 400, top: "20%", borderTop: '6px solid #00b5ad' } }}
                    open={this.state.openDetail}
                    onClose={() => this.setField("openDetail", false)}>
                    <ModalDetailTimetable
                        showDetailTimetableDescription={this.showDetailTimetableDescription} />
                </Modal>
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
                            onEventDrop={this.moveEvent}
                            resizable
                            onEventResize={this.resizeEvent}
                            defaultView={BigCalendar.Views.MONTH}
                            defaultDate={this.state.date}
                            onSelectEvent={e => this.showDetailTimetable(e)}
                            onSelectSlot={this.handleSelect}
                        />}
                </center>
            </div>
        );
    }
}



export default timetable;