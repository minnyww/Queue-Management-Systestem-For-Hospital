import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Headerbar from "./../components/headerbar";

import DropdownQueue from "./../components/Dropdown";
import Modal from 'react-responsive-modal';
import { Grid, Button, Form, List, Label, Dropdown, Input, Header } from "semantic-ui-react";

import axios from "./../lib/axios";


import moment from "moment";

// import { DatePickerInput } from "rc-datepicker";
// import "rc-datepicker/lib/style.css";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";
import FormAddAppointment from "../components/formAddAppointment";

import ModalDetailAppointment from "../components/modalDetailAppointment";

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
    this.setState({ loading: true })
    var { data } = await axios.get(`/getAppointment`)
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
    })
    console.log(this.state.appointment)
  }

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
    alert(`${event.title} was dropped onto ${updatedEvent.start}`)
    console.log(updatedEvent.start.getDay())

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
      appointmentId : updatedEvent.id

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

  addAppoinment = async () => {
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

    const { events, startTime, endTime, doctorId, HN } = this.state
    const currentDate = new Date(this.state.Date)

    var curr_date = currentDate.getDay();
    var curr_month = currentDate.getMonth();
    var curr_year = currentDate.getFullYear();
    const getDayDate = currentDate.getDate();

    await axios.post("/addAppointment", {
      date: new Date(this.state.Date).getDate(),
      day: day[curr_date],
      month: month[curr_month],
      year: curr_year,
      startTime: this.checkTimeFormat(startTime),
      endTime: this.checkTimeFormat(endTime),
      doctorId,
      HN
    });

    this.setState({
      events: [
        ...events,
        {
          start: new Date(
            `${month[curr_month]} ${getDayDate}, ${curr_year} ${this.checkTimeFormat(startTime)}`),
          end: new Date(
            `${month[curr_month]} ${getDayDate}, ${curr_year} ${this.checkTimeFormat(endTime)}`
          ),
          title: { HN }
        }
      ]
    });
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
    let tmp = ""
    tmp = this.state.appointment.filter(data => data.appointmentId === this.state.selectEvent)
      .map(data => {
        console.log("data", data)
        return <div>
          <Header>HN : {data.HN}</Header>
          <Header>Name : {data.firstName} {data.lastName}</Header>
          <Header>Doctor : {data.firstname} {data.lastname}</Header>
          <Header>From : {data.timeStart.substr(0, 5)} To : {data.timeEnd.substr(0, 5)} </Header>

        </div>
      })
    return tmp
  }

  render() {
    
    return (
      <div style={{ width: '100%' }}>
        <Headerbar />
        <DropdownQueue />

        <Modal
          center
          styles={{ modal: { width: 800 } }}
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
            //method
            setField={this.setField}
            addAppoinment={this.addAppoinment}
            checkTimeFormat={this.checkTimeFormat}
          />
        </Modal>


        <Modal
          center
          styles={{ modal: { width: 500, top: "30%" } }}
          open={this.state.openDetail}
          onClose={() => this.setField("openDetail", false)}>
          <ModalDetailAppointment
            appointment={this.state.appointment}
            showPatientDescription={this.showPatientDescription}

          />


        </Modal>



        <center>
          {!this.state.loading &&
            <DragAndDropCalendar
              events={this.state.events}
              style={{
                height: "80vh",
                width: "120vh",
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
              // onSelectEvent={event => alert(event.title + event.start)}
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
