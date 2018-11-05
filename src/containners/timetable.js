import React, { Component } from 'react';
import Headerbar from '.././components/headerbar'
import DropdownQueue from '../components/Dropdown';

import moment from "moment";

import "./../css/Q.css";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";
import Modal from 'react-responsive-modal';
import * as R from 'ramda'

import axios from "./../lib/axios";
import swal from 'sweetalert'
import { Button, Form, List, Label, Dropdown, Header, Icon, Divider } from "semantic-ui-react";

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
        open: false,
        timeStart: '',
        timeEnd: '',
        doctors: [{ key: "", text: "", value: "" }],
        rooms: [{ key: "", text: "", value: "" }],
        doctorId: 0,
        roomValue: 0,
        roomId: 0,
        editStatus: false,
        doctorSelect: [{ key: "", text: "", value: "" }],
        loginName: ''

    }
    componentWillMount = async () => {
        const { empId, departmentId } = JSON.parse(localStorage.getItem('userData'))
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.setState({
            departmentId: departmentId,
            nurseId: empId,

        })
        const date = this.pharseDate();
        const { data } = await axios.post(`/getTimetable`, {
            month: date.month,
            departmentId: departmentId
        });
        const appData = data.map(app => {
            return {
                start: new Date(`${app.month} ${app.Date}, ${app.Year} ${app.timeStart}`),
                end: new Date(`${app.month} ${app.Date}, ${app.Year} ${app.timeEnd}`),
                title: app.firstname + ' ' + app.lastname,
                id: app.timetableId,
                doctor: app.doctorId,
                status: app.statusId,
                roomId: app.roomId
            }
        })

        const doctors = await axios.post(`/getDoctors`, {
            // day: date.day,
            // month: date.month,
            // year: date.year,
            departmentId: this.state.departmentId
        });

        const rooms = await axios.post(`/getListRoom`, {
            departmentId: this.state.departmentId
        });

        let doctorsOption = this.dropdownDoctors(doctors);
        doctorsOption.push({
            key: '',
            text: 'All',
            value: 0
        })
        console.log(doctorsOption)
        let doctorsOptionNoAll = this.dropdownDoctors(doctors);

        const roomsOption = this.dropdownRooms(rooms);
        this.setState({
            events: appData,
            loading: false,
            timetable: data,
            doctors: doctorsOption,
            rooms: roomsOption,
            doctorSelect: doctorsOptionNoAll,
            roomId: doctors.data[0].roomId,
            loginName: userData
        })
        console.log(this.state.loginName)
        // this.getTimetable()getTimetable
    }

    dropdownDoctors = doctors => {
        const roomAndDoctorOption = doctors.data.map(roomDoctor => ({
            key: roomDoctor.doctorId,
            text:
                roomDoctor.firstname +
                " " +
                roomDoctor.lastname,
            value: roomDoctor.empId
        }));
        return roomAndDoctorOption;
    };

    dropdownRooms = rooms => {
        const roomAndDoctorOption = rooms.data.map(roomDoctor => ({
            key: roomDoctor.roomId,
            text: roomDoctor.roomId,
            value: roomDoctor.roomId
        }));
        return roomAndDoctorOption;
    };

    getEvents = async () => {
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
                status: app.statusId,
                roomId: app.roomId
            }
        })
        this.setState({
            events: appData,
        })
        console.log(this.state.events)
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

        var curr_date = new Date(this.state.Date).getDay();
        var curr_month = new Date(this.state.Date).getMonth();
        var curr_year = new Date(this.state.Date).getFullYear();
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

        console.log(this.state.events[idx])
        let result = this.state.events
            .filter(event => event.start.getDate() == updatedEvent.start.getDate()
                && event.start.getMonth() == updatedEvent.start.getMonth()
                && event.start.getHours() == updatedEvent.start.getHours()
                && event.doctor === updatedEvent.doctor)
        console.log("result", result)
        // debugger
        // const checkDate = curr_year + '-' + (+curr_month + 1) + '-' + this.state.events[idx].start.getDate() + ' '

        const checkStatus = await axios.post("/checkStatusDoctor", {
            doctorId: updatedEvent.doctor,
            // date: checkDate
        })
        debugger
        console.log(checkStatus.data)
        if (!checkStatus.data) {
            if (result.length == 0 && (checkStatus.data[0].statusId !== 1 || checkStatus.data[0].statusId !== 3)) {
                // if (updatedEvent.status !== 1 && updatedEvent.status !== 3) {
                console.log("UDATE Q")
                nextEvents.splice(idx, 1, updatedEvent);
                swal("Success!", `Doctor: ${event.title} was dropped onto ${updatedEvent.start.toString().substr(0, 24)}`, "success");
                this.setState({
                    events: nextEvents
                });
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
        }
        else if (checkStatus.data.length == []) {
            console.log("UDATE Q")
            nextEvents.splice(idx, 1, updatedEvent);
            swal("Success!", `Doctor: ${event.title} was dropped onto ${updatedEvent.start.toString().substr(0, 24)}`, "success");
            this.setState({
                events: nextEvents
            });
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
        else {
            swal("Cannot !",
                `Doctor: ${event.title} cannot move to ${updatedEvent.start.toString().substr(0, 24)} 
                because doctor cant recieve more patient`,
                "warning");
        }
    }


    handleSelect = async ({ start }) => {
        this.setState({
            Date: moment(start).format('YYYY-MM-DD'),
            // open: true
        })
        debugger
        console.log(new Date(this.state.Date).getMonth(), new Date().getMonth())
        if (new Date(this.state.Date).getDate() >= new Date().getDate()
            || new Date(this.state.Date).getMonth() > new Date().getMonth()
        ) {
            this.setField("open", true)
        }
        else {
            this.setField("open", false)
            swal("Cannot !",
                `Cannot add timetable before Today`,
                "warning");
        }
        console.log(this.state.Date)
    }

    FormAddTimetable = () => {
        // if(this.state.doctors.length > 2){
        //     this.state.doctors.pop()
        // }
        // console.log(this.state.doctors)
        let tmp = ''
        tmp = <center>
            <Header as='h4'>Add Doctor to Timetable</Header>
            <Form>
                <Form.Input
                    style={{ width: '65%' }}
                    disabled
                    type="date"
                    value={this.state.Date}
                    onChange={(e, { value }) => this.setField("Date", value)}
                />
                <Form.Group widths='equal' style={{ width: '67%' }}>
                    <Form.Input
                        label="Start"
                        type="time"
                        placholder='time start'
                        value={this.state.timeStart}
                        onChange={(e, { value }) => this.setField("timeStart", value)}
                    />
                    <Form.Input
                        label="End"
                        type="time"
                        placholder='time end'
                        value={this.state.timeEnd}
                        onChange={(e, { value }) => this.setField("timeEnd", value)}
                    />
                </Form.Group>
            </Form>
            <Dropdown
                placeholder="Doctor"
                options={this.state.doctorSelect}
                simple
                selection
                item
                onChange={(e, { value }) => this.setField("doctorId", value)}
            />
            <Dropdown
                placeholder="Room"
                options={this.state.rooms}
                simple
                selection
                item
                onChange={(e, { value }) => this.setField("roomValue", value)}
            />
            <br />
            <Button
                color='blue'
                style={{ marginTop: 5 }}
                onClick={() => {
                    this.addTimetable();
                }}>
                Add
            </Button>
        </center >
        return tmp
    }

    addTimetable = async () => {
        // roomId: tmp[1],
        const { events, timeStart, timeEnd, doctorId, roomValue } = this.state
        // let tmp = doctorId.split("/")
        const currentDate = new Date(this.state.Date)
        const getDayDate = currentDate.getDate();
        const date = this.pharseDate();
        console.log(timeStart)

        if (timeStart === '' || timeEnd === '' || doctorId === '' || roomValue === '') {
            swal("Cannot add Doctor to Timetable", {
                icon: "warning",
            });
        }
        else {
            let result = events.filter(data => data.doctor == doctorId
                && data.roomId == roomValue
                && data.start.getDate() === new Date(this.state.Date).getDate()
                // && data.start.getMonth() === new Date(this.state.Date).getMonth()
                && moment(data.start, "HH:mm").format("HH:mm") == timeStart
            )
            if (result.length == 0) {
                const data = await axios.post("/addTimetable", {
                    Date: new Date(this.state.Date).getDate(),
                    day: date.day,
                    month: date.month,
                    Year: date.year,
                    timeStart: timeStart,
                    timeEnd: timeEnd,
                    doctorId: doctorId,
                    roomId: roomValue,
                });
                await this.setState({
                    open: false,
                    startTime: '',
                    endTime: ' ',
                    HN: '',
                    Date: new Date(this.state.Date)
                });
            }

            else {
                swal("Cannot add Doctor to Timetable", {
                    icon: "warning",
                });
            }
        }
        await this.getEvents()
        await this.getTimetable()
        console.log("เข้า DB");
    }

    checkTimeFormat = time => {
        if (time.length == 4) {
            var timeHH = time.substring(0, 2);
            var timeMM = time.substring(2, 4);
            var timeNew = timeHH + ":" + timeMM;
            var t = moment(timeNew, "HH:mm").format("HH:mm");
            return t;
        }
    };

    setField = (field, value) => {
        this.setState({ [field]: value });
    };

    showDetailTimetable = (e) => {
        // console.log(e.id)
        this.setState({
            openDetail: true,
            selectEvent: e.id,
        })
    }

    openConfirm = (index) => {
        console.log('เข้า Confirm')
        let id = this.state.selectEvent
        console.log(id)
        console.log(this.state.events[index])
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

    deleteTimetable = async (index) => {
        console.log("เข้า ลบ")
        this.setState({
            openDetail: false,
        })
        let result = this.state.events.filter(data => data.id == this.state.selectEvent)
        console.log(result[0])

        const checkStatus = await axios.post("/checkStatusDoctor", {
            doctorId: result[0].doctor,
        })
        console.log(checkStatus.data)

        if (result[0].start.getDate() >= new Date().getDate() && !R.isEmpty(checkStatus.data)) {
            console.log('เข้า')
            debugger
            if (checkStatus.data[0].statusId !== 1 || checkStatus.data[0].statusId !== 3) {
                console.log('เข้าใน')
                swal("Cannot Delete this doctor because has patient in room with this Doctor", {
                    icon: "warning",
                });
            } else {
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
                if (!this.state.editStatus) {
                    return <div key={index}>
                        {/* <Header as='h4' style={{ marginTop: 5, fontSize: '24px' }}>
                        {data.firstName} {data.lastName}
                    </Header> */}
                        <Label color="teal" style={{ fontSize: '14px', fontWeight: 'lighter' }}>
                            <Icon className='time' />Date : {data.Date} {data.day} {data.month} {data.Year}
                        </Label>
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
                                        <List.Header
                                            onClick={() => this.setField("editStatus", true)}>
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
                } else {
                    return <div key={index} >
                        <Header as='h4'>Edit Timetable</Header>
                        <Form>
                            <Form.Input
                                style={{ width: '65%' }}
                                type="date"
                                value={this.state.Date}
                                onChange={(e, { value }) => this.setField("Date", value)}
                            />
                            <Form.Group widths='equal' style={{ width: '67%' }}>
                                <Form.Input
                                    label="Start"
                                    type="time"
                                    placholder='time start'
                                    value={this.state.timeStart}
                                    onChange={(e, { value }) => this.setField("timeStart", value)}
                                />
                                <Form.Input
                                    label="End"
                                    type="time"
                                    placholder='time end'
                                    value={this.state.timeEnd}
                                    onChange={(e, { value }) => this.setField("timeEnd", value)}
                                />
                            </Form.Group>
                            <Form.Group widths='equal' style={{ width: '67%', marginLeft: '0px' }} >
                                <Dropdown
                                    style={{ marginRight: '5px' }}
                                    placeholder="Doctor"
                                    options={this.state.doctorSelect}
                                    simple
                                    selection
                                    onChange={(e, { value }) => this.setField("doctorId", value)}
                                />
                                <Dropdown
                                    placeholder="Room"
                                    options={this.state.rooms}
                                    simple
                                    selection
                                    onChange={(e, { value }) => this.setField("roomValue", value)}
                                />
                                <br />
                            </Form.Group>
                        </Form>
                        <Button
                            color='blue'
                            style={{ marginTop: 5, float: "right" }}
                            onClick={() => {
                                this.updateTimetable();
                                this.setField('editStatus', false)
                                this.setField('openDetail', false)
                            }}>
                            Update
                    </Button>
                    </div>
                }
            })

        return tmp
    }

    updateTimetable = async () => {
        console.log('timtableId ', this.state.selectEvent)
        console.log('doctorId ', this.state.doctorId)
        console.log('timeStart : ', this.state.timeStart, 'timeEnd : ', this.state.timeEnd)
        console.log('Date : ', this.state.Date)
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

        var curr_date = new Date(this.state.Date).getDay();
        var curr_month = new Date(this.state.Date).getMonth();
        var curr_year = new Date(this.state.Date).getFullYear();

        this.getEvents()
        this.getTimetable()
        console.log('เข้า up')
        // let getDoctor = this.state.doctorId.split('/')

        await axios.post("/updateDoctorTimetable", {
            date: new Date(this.state.Date).getDate(),
            day: day[curr_date].toLowerCase(),
            month: month[curr_month].toLowerCase(),
            year: curr_year,
            timeStart: this.state.timeStart,
            timeEnd: this.state.timeEnd,
            timetableId: this.state.selectEvent,
            roomId: this.state.roomValue,
            doctorId: this.state.doctorId
        });
    }

    setField = (field, value) => {
        this.setState({ [field]: value });
    };

    chooseDoctor = async value => {
        console.log(value)
        await this.getEvents()
        if (value === 0) {
            this.setState({
                events: this.state.events,
            });
        }
        else {
            const filterEvents = this.state.events.filter(data => (data.doctor == value))
            this.setState({
                events: filterEvents,
                doctorId: value
            });
        }
    };

    logOut = () => {
        localStorage.removeItem('userData');
    }

    render() {
        return (
            <div >
                <Headerbar
                    logOut={this.logOut}
                    loginName={this.state.loginName}
                />
                <DropdownQueue
                    doctors={this.state.doctors}
                    // departmentId = {this.state.departmentId}
                    chooseDoctor={this.chooseDoctor}
                />

                <Modal
                    center
                    styles={{ modal: { width: 450, top: '10%', borderRadius: '10px' } }}
                    open={this.state.open}
                    onClose={() => this.setField("open", false)}>
                    {this.FormAddTimetable()}
                </Modal>

                <Modal
                    center
                    styles={{ modal: { width: 500, top: "20%", borderTop: '6px solid #00b5ad' } }}
                    open={this.state.openDetail}
                    onClose={() => { this.setField("openDetail", false), this.setField('editStatus', false) }}>
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