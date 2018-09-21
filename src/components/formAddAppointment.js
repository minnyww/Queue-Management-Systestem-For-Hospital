import React, { Component } from "react";

import { Grid, Button, Form, Label, Dropdown, Message } from "semantic-ui-react";
const formAddAppointment = props => {
  return (
    <div>
      <center>
        <Form style={{ width: "50%" }}>
          <Form.Input
            fluid
            placeholder="Enter HN"
            value={props.HN}
            onChange={(e, { value }) => props.setField("HN", value)}
            onBlur={() => props.validateHN()}

          />
          <Message positive hidden={!props.errorHN.status}>
            {props.errorHN.message}
          </Message>
          <Form.Input
            type="date"
            fluid
            value={props.Date}
            onChange={(e, { value }) => props.setField("Date", value)}
          />
          <Form.Input
            placeholder="Enter Start Time HH:MM"
            fluid
            value={props.startTime}
            onChange={(e, { value }) => props.setField("startTime", value)}
          />
          <Form.Input
            placeholder="Enter End Time HH:MM"
            fluid
            value={props.endTime}
            onChange={(e, { value }) => props.setField("endTime", value)}
          />
        </Form>
        <br />
        <Label style={{ marginRight: 10 }}>Choose Doctor :</Label>
        <Dropdown
          placeholder="Doctor"
          options={props.doctors}
          simple
          selection
          item
          value={props.doctorId}
          onChange={(e, { value }) => props.setField("doctorId", value)}
        />
        <br />
        <Button
          style={{ marginTop: 5 }}
          onClick={() => {
            props.addAppoinment();
          }}
        >
          Add Appointment
        </Button>
      </center>
    </div>
  );
};

export default formAddAppointment;
