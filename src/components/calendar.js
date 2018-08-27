import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import BigCalendar from "react-big-calendar";
import moment from "moment";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const BigCalendarView = props => (
  <div>
    <center>
      <BigCalendar
        events={[
          {
            title: "My event",
            allDay: false,
            start: new Date(2018, 0, 1, 10, 0), // 10.00 AM
            end: new Date(2018, 0, 1, 14, 0) // 2.00 PM
          }
        ]}
        date={new Date(2018, 0, 1)}
        style={{
          height: "70vh",
          width: "120vh",
          marginBottom: "5%",
          marginTop: "2%"
        }}
      />
    </center>
  </div>
);

export default BigCalendarView;
