import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Headerbar from "./../components/headerbar";

import DropdownQueue from "./../components/Dropdown";
import Modal from 'react-responsive-modal';
import { Grid, Button, Form, List, Label, Dropdown, Input } from "semantic-ui-react";
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
      // {
      //   id: 1,
      //   title: "Today",
      //   start: new Date(),
      //   end: new Date()
      // }
    ],
    prepareEvents: {},
    doctorId: 0,
    doctors: [{ key: 1, text: 1001, value: 1001 }],
    startTime: "",
    endTime: "",
    Date: new Date(),
    HN: "",
    loading: false,
    open: false,
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
        end: new Date(`${app.month} ${app.date}, ${app.year} ${app.timeStart}`),
        title: 'Hi'
      }
    })
    this.setState({
      loading: false,
      events: appData
    })
  }

  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
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
          title: 'HI'
        }
      ]
    });
    console.log("เข้า DB");
    console.log(this.state.events)
  };



  handleSelect = async ({ start }) => {
    this.setField("open", true)
    console.log(moment(start).format('YYYY-MM-DD'))
    this.setState({ Date: moment(start).format('YYYY-MM-DD') })
  };

  render() {
    // console.log("HN " + this.state.HN);
    // console.log("startTime " + this.state.startTime);
    // console.log("endTime " + this.state.endTime);
    // console.log("Date " + this.state.Date);
    // console.log("doctorId " + this.state.doctorId);

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
              onSelectEvent={event => alert(event.title)}
              onSelectSlot={this.handleSelect}
            />}
        </center>
      </div>
    );
  }
}

// const Calendar = DragDropContext(HTML5Backend)(Appointment);
export default Appointment;
