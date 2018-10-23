import React, { Component } from "react";
import "./../css/Q.css";

import { Grid, Button, Form, Label, Dropdown, Message, Menu, Input } from "semantic-ui-react";
const formAddAppointment = props => {
  return (
    <div>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column >
            <Menu pointing color='teal' >
              <Menu.Item name='Doctors' active={true} />
              <Menu.Item name='Appointment Remaining' style={{ width: '100%' }} />
            </Menu>
            <Menu vertical fluid>
              {props.listDoctors()}
            </Menu>
          </Grid.Column>
          <Grid.Column>
            <Form style={{ width: "100%" }}>
              <Form.Input
                fluid
                name='HN'
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
              <Form.Group widths='equal' style={{ width: '67%' }}>
                <Form.Input
                  label="Start"
                  type="time"
                  placholder='time start'
                  value={props.startTime}
                  onChange={(e, { value }) => props.setField("startTime", value)}
                />
                <Form.Input
                  label="End"
                  type="time"
                  placholder='time end'
                  value={props.endTime}
                  onChange={(e, { value }) => props.setField("endTime", value)}
                />
              </Form.Group>
            </Form>
            <br />
            <Label color='teal' style={{ marginRight: 10 }}>Choose Doctor :</Label>
            <Dropdown
              placeholder="Doctor"
              options={props.doctors}
              simple
              selection
              item
              onChange={(e, { value }) => props.setField("appointmentDepId", value)}
            />
            <br />
            <br />
            <Button
              size='small'
              color='blue'
              style={{ marginTop: 5, float: 'right' }}
              onClick={() => {
                props.addAppoinment();
              }}
            >
              Add Appointment
                </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div >
  );
};

export default formAddAppointment;
