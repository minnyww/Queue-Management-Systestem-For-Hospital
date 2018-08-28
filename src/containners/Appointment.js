import React, { Component } from "react";
import { Dropdown, Menu, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Headerbar from "./../components/headerbar";
import DropdownQueue from "./../components/Dropdown";

import BigCalendarView from "./../components/calendar";
import moment from "moment";

import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";


class Appointment extends Component {
  state = {
    events: [
      {
        title: "My event",
        allDay: false,
        start: new Date(2018, 0, 1, 10, 0), // 10.00 AM
        end: new Date(2018, 0, 1, 14, 0) // 2.00 PM
      }
    ],
    date: new Date()
  };
  
  onChange = date => this.setState({ date });

  render() {
    
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
        </center>
        <BigCalendarView events={this.state.events} />
      </div>
    );
  }
}

export default Appointment;
