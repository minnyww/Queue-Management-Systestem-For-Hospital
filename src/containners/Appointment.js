import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Headerbar from "./../components/headerbar";
import DropdownQueue from "./../components/Dropdown";

import BigCalendarView from "./../components/calendar";
import moment from "moment";

import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Appointment extends Component {
  state = {
    events: [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2018, 29, 29),
        end: new Date(2018, 8, 29)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2015, 3, 7),
        end: new Date(2015, 3, 10)
      },

      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0)
      },

      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0)
      },

      {
        id: 4,
        title: "Some Event",
        start: new Date(2015, 3, 9, 0, 0, 0),
        end: new Date(2015, 3, 9, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2015, 3, 11),
        end: new Date(2015, 3, 13),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2015, 3, 12, 10, 30, 0, 0),
        end: new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2015, 3, 12, 12, 0, 0, 0),
        end: new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2015, 3, 12, 14, 0, 0, 0),
        end: new Date(2015, 3, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2015, 3, 12, 17, 0, 0, 0),
        end: new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2015, 3, 12, 20, 0, 0, 0),
        end: new Date(2015, 3, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2015, 3, 13, 7, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 18, 2, 0, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2015, 3, 20, 19, 30, 0),
        end: new Date(2015, 3, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date()),
        end: new Date()
      }
    ],
    date : new Date()
    
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

  onChange = date => this.setState({ date });
  
  render() {
    console.log(this.state.events)
    return (
     
      
      <div>
        <Headerbar />
        <DropdownQueue />
        <center>
          <DatePickerInput
            value={this.state.date}
            onChange={this.onChange}
            onClick={this.onChange}
          />

          <DragAndDropCalendar
            events={this.state.events}
            style={{
              height: "80vh",
              width: "120vh",
              marginBottom: "5%",
              marginTop: "2%"
            }}
            popup
            selectable
            localizer={this.props.localizer}
            events={this.state.events}
            onEventDrop={this.moveEvent}
            resizable
            onEventResize={this.resizeEvent}
            onSelectSlot={this.newEvent}
            defaultView={BigCalendar.Views.MONTH}
            defaultDate = {this.state.date}
          />
        </center>
      </div>
    );
  }
}
// const Calendar = DragDropContext(HTML5Backend)(Appointment);
export default Appointment;
