import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Headerbar from "./../components/headerbar";

import DropdownQueue from "./../components/Dropdown";
import Modal from 'react-responsive-modal';
import swal from 'sweetalert'
import { Grid, Button, Form, List, Label, Dropdown, Input, Header, Icon, Divider } from "semantic-ui-react";

import axios from "./../lib/axios";

import moment from "moment";
import "./../css/Q.css";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";

import FormAddAppointment from "../components/formAddAppointment";
import ModalDetailAppointment from "../components/modalDetailAppointment";
import { consolidateStreamedStyles } from "styled-components";

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Appointment extends Component {

  state = {
    events: [],
    prepareEvents: {},
    doctorId: 0,
    doctors: [{ key: "", text: "", value: "" }],
    startTime: "",
    endTime: "",
    Date: new Date(),
    HN: "",
    appointment: [],
    selectEvent: 0,
    errorHN: "",

    departmentId: 0,
    roomId: 0,
    appointmentDepId: 0,

    doctors: [{ key: "", text: "", value: "" }],
    //loading
    loading: false,

    //Modal
    open: false,
    openDetail: false,
    openConfirm: false
  };

  constructor(props) {
    super(props);
    this.moveEvent = this.moveEvent.bind(this);
  }

  componentWillMount = async () => {
    const { empId, departmentId, type } = JSON.parse(localStorage.getItem('userData'))
    this.setState({ loading: true })
    var { data } = await axios.get(`/getAppointment/${departmentId}`)
    const appData = data.map(app => {
      return {
        start: new Date(`${app.month} ${app.date}, ${app.year} ${app.timeStart}`),
        end: new Date(`${app.month} ${app.date}, ${app.year} ${app.timeEnd}`),
        title: app.HN,
        id: app.appointmentId
      }
    })

    this.setState({
      loading: false,
      events: appData,
      appointment: data,
      nurseId: empId,
      departmentId,
      userType: type
    })
    const date = this.pharseDate();
    const doctors = await axios.post(`/getListDoctor`, {
      day: date.day,
      month: date.month,
      year: date.year,
      departmentId: this.state.departmentId
    });

    const doctorsOption = this.dropdownDoctors(doctors);

    this.setState({
      doctors: doctorsOption,
      roomId: doctors.data[0].roomId,
    })
    this.showPatientDescription()
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

    let curr_date = new Date().getDay();
    let curr_month = new Date().getMonth();
    let curr_year = new Date().getFullYear();

    return {
      day: day[curr_date],
      month: month[curr_month],
      year: curr_year,
    }
  }


  dropdownDoctors = doctors => {
    const roomAndDoctorOption = doctors.data.map(roomDoctor => ({
      key: roomDoctor.doctorId,
      text:
        roomDoctor.firstname +
        " " +
        roomDoctor.lastname +
        " (ห้อง " +
        roomDoctor.roomId +
        " ) ",
      value: roomDoctor.doctorId + "/" + roomDoctor.roomId
    }));
    return roomAndDoctorOption;
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

    await axios.post("/updateAppointment", {
      date: updatedEvent.start.getDate(),
      day: day[curr_date],
      month: month[curr_month],
      year: curr_year,
      timeStart: timeStart,
      timeEnd: timeEnd,
      appointmentId: updatedEvent.id

    });
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

  checkTimeFormat = time => {
    if (time.length == 4) {
      var timeHH = time.substring(0, 2);
      var timeMM = time.substring(2, 4);
      var timeNew = timeHH + ":" + timeMM;
      var t = moment(timeNew, "HH:mm").format("HH:mm");
      return t;
    }
  };
  getAppointment = async () => {
    var { data } = await axios.get(`/getAppointment/${this.state.departmentId}`)
    this.setState({
      appointment: data,
    })
    console.log(this.state.appointment)
  }

  addAppoinment = async () => {

    const date = this.pharseDate();
    const { events, startTime, endTime, doctorId, HN } = this.state
    const currentDate = new Date(this.state.Date)
    const getDayDate = currentDate.getDate();
    let tmp = this.state.appointmentDepId.split("/")

    const data = await axios.post("/addAppointment", {
      date: new Date(this.state.Date).getDate(),
      day: date.day,
      month: date.month,
      year: date.year,
      startTime: this.checkTimeFormat(startTime),
      endTime: this.checkTimeFormat(endTime),
      doctorId: tmp[0],
      roomId: tmp[1],
      HN
    });

    await this.getEvents()
    await this.setState({
      open: false,
      startTime: '',
      endTime: ' ',
      HN: ''

    });
    await this.getAppointment()
    console.log("เข้า DB");
    console.log(this.state.events)
  };

  handleSelect = async ({ start }) => {
    this.setState({
      Date: moment(start).format('YYYY-MM-DD'),
      open: true
    })
  };

  showDetailAppointment = async (e) => {
    this.setState({
      openDetail: true,
      selectEvent: e.id
    })
  };

  showPatientDescription = () => {
    const { appointment, selectEvent } = this.state
    let tmp = ""
    tmp = appointment.filter(data => data.appointmentId === selectEvent)
      .map((data, index) => {
        return <div key={index}>
          <Header as='h4' style={{ marginTop: 5, fontSize: '24px' }}>
            {data.firstName} {data.lastName}
          </Header>
          <Label color="teal" style={{ fontSize: '13px' }}>
            <Icon className='time' />From : {data.timeStart.substr(0, 5)} To {data.timeEnd.substr(0, 5)}
          </Label>
          {console.log(data)}
          <List relaxed style={{ padding: '10px' }}>
            <List.Item>
              <List.Icon name='user' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as="h4">HN : {data.HN}</List.Header>
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
                <List.Header as="h4">Department : {data.department}</List.Header>
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
                  <List.Header onClick={() => this.openConfirm()}>
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

  openConfirm = () => {
    console.log('เข้า Confirm')
    let swl = ''
    swl = swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await this.deleteAppointment()
        }
      });
    return swl
  }
  getEvents = async () => {
    console.log('เข้า get Eve')
    var { data } = await axios.get(`/getAppointment/${this.state.departmentId}`)
    const appData = data.map(app => {
      return {
        start: new Date(`${app.month} ${app.date}, ${app.year} ${app.timeStart}`),
        end: new Date(`${app.month} ${app.date}, ${app.year} ${app.timeEnd}`),
        title: app.HN,
        id: app.appointmentId
      }
    })
    this.setState({
      events: appData,
    })
  }

  deleteAppointment = () => {
    console.log("เข้า ลบ")
    this.setState({
      openDetail: false,
    })
    axios.delete(`/deleteAppointment/${this.state.selectEvent}`)
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


  validateHN = async () => {
    if (this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.setState({
        errorHN: { status: true, message: "Right" }
      });
    } else if (!this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.setState({
        errorHN: { status: true, message: "HN Does not match" }
      });
    }
  };

  render() {

    return (
      <div style={{ width: '100%' }}>
        <Headerbar />
        <DropdownQueue />
        <Modal
          center
          styles={{ modal: { width: 700, top: '10%', borderRadius: '10px' } }}
          open={this.state.open}
          onClose={() => this.setField("open", false)}>
          <FormAddAppointment
            //state
            events={this.state.events}
            Date={this.state.Date}
            doctorId={this.state.doctorId}
            doctors={this.state.doctors}
            currentDate={this.state.currentDate}
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            HN={this.state.HN}
            errorHN={this.state.errorHN}
            //method
            setField={this.setField}
            addAppoinment={this.addAppoinment}
            checkTimeFormat={this.checkTimeFormat}
            validateHN={this.validateHN} />
        </Modal>
        <Modal
          center
          styles={{ modal: { width: 400, top: "20%", borderTop: '6px solid #00b5ad' } }}
          open={this.state.openDetail}
          onClose={() => this.setField("openDetail", false)}>
          <ModalDetailAppointment
            showPatientDescription={this.showPatientDescription} />
        </Modal>
        <center>
          {!this.state.loading &&
            <DragAndDropCalendar
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
              onSelectEvent={e => this.showDetailAppointment(e)}
              onSelectSlot={this.handleSelect}
            />}
        </center>
      </div>
    );
  }
}

// const Calendar = DragDropContext(HTML5Backend)(Appointment);
export default Appointment;
