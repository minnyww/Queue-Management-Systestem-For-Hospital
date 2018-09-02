import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Headerbar from "./../components/headerbar";

import DropdownQueue from "./../components/Dropdown";
import Modal from "react-modal";
import { Grid, Button, Form, List, Label, Dropdown } from "semantic-ui-react";
import swal from "sweetalert";
import axios from "./../lib/axios";

import BigCalendarView from "./../components/calendar";
import moment from "moment";

import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";
import FormAddAppointment from "../components/formAddAppointment";

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Appointment extends Component {
  state = {
    events: [
      {
        title: "Today",
        start: new Date(new Date()),
        end: new Date()
      }
    ],
    // date: new Date(),
    doctorId: 0,
    doctors: [{ key: 1, text: 1001, value: 1001 }],
    currentDate: {
      day: "",
      month: "",
      year: ""
    },
    startTime: "",
    endTime: "",
    Date: new Date(),
    HN: ""
  };
  constructor(props) {
    super(props);
    this.moveEvent = this.moveEvent.bind(this);
  }
  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, start, end, allDay };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
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

    var curr_date = new Date(this.state.Date).getDate();
    var curr_month = new Date(this.state.Date).getMonth();
    var curr_year = new Date(this.state.Date).getFullYear();
    await axios.post("/addAppointment", {
      date: new Date(this.state.Date).getDate(),
      day: day[curr_date],
      month: month[curr_month],
      year: curr_year,
      startTime: this.checkTimeFormat(this.state.startTime),
      endTime: this.checkTimeFormat(this.state.endTime),
      doctorId: this.state.doctorId,
      HN: this.state.HN
    });
    console.log("เข้า DB");
  };

  render() {
    console.log(this.state.events);
    console.log("HN" + this.state.HN);
    console.log("startTime" + this.state.startTime);
    console.log("endTime" + this.state.endTime);
    console.log("Date" + this.state.Date);
    console.log("doctorId" + this.state.doctorId);

    return (
      <div>
        <Headerbar />
        <DropdownQueue />
        <center>
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

          <DragAndDropCalendar
            events={this.state.events}
            style={{
              height: "80vh",
              width: "120vh",
              marginBottom: "5%",
              marginTop: "2%"
            }}
            selectable
            localizer={this.props.localizer}
            events={this.state.events}
            onEventDrop={this.moveEvent}
            resizable
            onEventResize={this.resizeEvent}
            onSelectSlot={this.newEvent}
            defaultView={BigCalendar.Views.MONTH}
            defaultDate={this.state.date}
          />
        </center>
      </div>
    );
  }
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "30%"
  }
};
// const Calendar = DragDropContext(HTML5Backend)(Appointment);
export default Appointment;
