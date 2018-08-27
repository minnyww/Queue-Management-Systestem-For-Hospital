import React, { Component } from "react";
import { Dropdown, Menu, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Headerbar from "./../components/headerbar";
import DropdownQueue from "./../components/Dropdown";
import BigCalendarView from "./../components/calendar";
import moment from "moment";
class Appointment extends Component {
  state = {
    events: [
      {
        title: "My event",
        allDay: false,
        start: new Date(2018, 0, 1, 10, 0), // 10.00 AM
        end: new Date(2018, 0, 1, 14, 0) // 2.00 PM
      }
    ]
  };
  render() {
    return (
      <div>
        <Headerbar />
        <DropdownQueue />
        <BigCalendarView events={this.state.events} />
      </div>
    );
  }
}

export default Appointment;
