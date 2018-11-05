import React, { Component } from "react";
import "./../css/Q.css";

import { Grid, Button, Form, Label, Dropdown, Message, Menu, Input ,List} from "semantic-ui-react";
const formAddAppointment = props => {
  return (
    <div>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column >
            <Menu pointing color='teal' >
              <Menu.Menu position='right' name='Appointment Remaining' style={{ width: '100%', }}>
                <Menu.Item name='Doctors' />
              </Menu.Menu>
              <Menu.Menu>
                <Menu.Item name='Max ' />
              </Menu.Menu>
              <Menu.Menu>
                <Menu.Item name='Remaining ' />
              </Menu.Menu>
            </Menu>
            <Menu vertical fluid attached='top'>
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
              <Message negative hidden={!props.errorHN.status}>
                HN Does not match
                    </Message>
              <Message negative hidden={!props.errorGetName.status}>
                Not have in databse
                    </Message>
              <Message negative hidden={!props.errorAdd.status}>
                Cannot add to Queue
              </Message>
              <List>
                <List.Item>
                  <List.Content style={{ fontSize: '16px' }}>
                    Name: {props.namePatient}
                    {props.lastNamePatient}
                  </List.Content>
                </List.Item>
              </List>
              <Form.Input
                type="date"
                disabled
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
              onChange={(e, { value }) => {
                props.setField("appointmentDepId", value)
                props.checkCount(value)
              }}
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
