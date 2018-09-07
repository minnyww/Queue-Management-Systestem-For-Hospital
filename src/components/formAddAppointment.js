import React, { Component } from "react";

import { Grid, Button, Form, Label, Dropdown } from "semantic-ui-react";
const formAddAppointment = props => {
  return (
    <div>
      <center>
        <Form style={{ width: "50%" }}>
          <Form.Input
            fluid
            placeholder="HN"
            value={props.HN}
            onChange={(e, { value }) => props.setField("HN", value)}
            // onChange={async (e, { value }) => props.setField({ HN: value })}
          />
          <Label style={{ marginTop: "-5%" }}>Name : </Label>
          <Form.Input
            type="date"
            fluid
            value={props.Date}
            onChange={(e, { value }) => props.setField("Date", value)}
          />
          <Form.Input
            placeholder="HH:MM"
            fluid
            value={props.startTime}
            onChange={(e, { value }) => props.setField("startTime", value)}
          />
          <Form.Input
            placeholder="HH:MM"
            fluid
            value={props.endTime}
            onChange={(e, { value }) => props.setField("endTime", value)}
          />
        </Form>

        <Dropdown
          placeholder="Doctor"
          options={props.doctors}
          simple
          item
          value={props.doctorId}
          onChange={(e, { value }) => props.setField("doctorId", value)}
        />
        <br />
        <Button
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
