import React, { Component } from "react";
// import DropdownQueue from "./Dropdown";

import {
  Grid,
  Button,
  Dropdown,
  Menu,
  Header,
  Form,
  TextArea,
  List,
  Message,
  Radio,
  Segment
} from "semantic-ui-react";
import Modal from "react-modal";

const showCurrentQueue = props => {
  let tmp = "";
  if (props.userType === 1) {
    tmp = (
      <Segment.Group style={{ width: "80%" }}>
        <Segment inverted color="blue">
          <Header as="h1" textAlign="center">
            Current Queue
          </Header>
        </Segment>
        {props.getPatientName()}
      </Segment.Group>
    );
  } else if (props.userType === 2) {
    tmp = (
      <Segment.Group style={{ width: "80%", marginTop: "-5%" }}>
        <Segment inverted color="blue">
          <Header as="h1" textAlign="center">
            Current Queue
          </Header>
        </Segment>
        {props.getPatientName()}
      </Segment.Group>
    );
  }
  return tmp;
};

const listQueue = props => {
  let tmp = "";
  if (props.userType === 1) {
    tmp = (
      <Segment.Group id="boxLab">
        <Segment inverted color="teal">
          <Header Header textAlign="center">
            Lab Wait
          </Header>
        </Segment>
        {props.showPatientLabQueue()}
      </Segment.Group>
    );
  }
  return tmp;
};
const goBack = props => {
  let tmp = "";
  if (props.userType === 2) {
    tmp = (
      <Button
        primary
        onClick={() => {
          props.goBack();
        }}
      >
        Go back
      </Button>
    );
  }
  return tmp;
};

const Queue = props => {
  const setField = props.setField;
  return (
    <div>
      <div id="app" />

      <Grid>
        <Grid.Column width={5} style={{ marginLeft: "3%" }}>
          <Segment.Group id="box">
            <Segment inverted color="teal">
              <Header textAlign="center">Queue</Header>
            </Segment>
            {props.showPatient()}
          </Segment.Group>
          {listQueue(props)}
          {/* <Segment.Group id="boxLab">
            <Segment inverted color="teal">
              <Header Header textAlign="center">
                Lab Wait
              </Header>
            </Segment>
            {props.showPatientLabQueue()}
          </Segment.Group> */}

          <center>
            <Button color="blue" onClick={() => setField("modalIsOpen", true)}>
              Add Patient
            </Button>
            <Modal
              isOpen={props.modalIsOpen}
              onRequestClose={() => setField("modalIsOpen", false)}
              style={customStyles}
            >
              <Form
                onSubmit={e => {
                  props.addQueue(e);
                }}
              >
                <Form.Input
                  onBlur={() => props.validateHN()}
                  icon="search"
                  fluid
                  label="HN"
                  name="HN"
                  placeholder="ex. 1234/61"
                  value={props.HN}
                  onChange={(e, { value }) => setField("HN", value)}
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
                <br />
                <center>
                  <List>
                    <List.Item>
                      <List.Content>
                        Name: {props.namePatient}
                        {props.lastNamePatient}
                      </List.Content>
                    </List.Item>
                  </List>
                </center>
                <br />
                <br />
                <center>
                  <Button type="submit" color="green">
                    Add
                  </Button>
                </center>
              </Form>
            </Modal>
          </center>
        </Grid.Column>

        <Grid.Column width={10} style={{ marginTop: "3%" }}>
          <center>
            {showCurrentQueue(props)}
            {/* <Segment.Group style={{ width: "80%" }}>
              <Segment inverted color="blue">
                <Header as="h1" textAlign="center">
                  คิวปัจจุบัน
                </Header>
              </Segment>
              {props.getPatientName()}
            </Segment.Group> */}
          </center>
          <center>
            <br />

            <Button
              primary
              onClick={() => {
                props.callPatient();
              }}
            >
              Call
            </Button>
            {goBack(props)}

            <Menu vertical>
              <Dropdown text="Option" pointing="down" className="link item">
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <center>
                      <p onClick={() => setField("showModal", true)}>
                        Forward To
                      </p>

                      <Modal
                        style={style}
                        isOpen={props.showModal}
                        onRequestClose={() => setField("showModal", false)}
                        isClose={() => setField("showModal", false)}
                      >
                        <Radio
                          label="Select Department :"
                          name="radioGroup"
                          value="Department"
                          checked={props.typeForward === "Department"}
                          onChange={async (e, { value }) => {
                            props.setField("typeForward", value);
                          }}
                        />
                        <br />
                        <Dropdown
                          disabled={
                            props.typeForward === "Department" ? false : true
                          }
                          fluid
                          search
                          selection
                          placeholder=" Search or Select Department"
                          options={props.allDepartment}
                          onChange={async (e, { value }) => {
                            props.checkDoctorWithRoom(value);
                          }}
                        />

                        <br />

                        <Dropdown
                          disabled={
                            props.forwardDepartmentId > 0 &&
                            props.typeForward === "Department"
                              ? false
                              : true
                          }
                          fluid
                          search
                          selection
                          placeholder="Search or Select Room with doctor"
                          options={props.roomAndDoctors}
                          onChange={async (e, { value }) => {
                            props.setField("forwardId", value);
                          }}
                        />

                        <br />

                        <Radio
                          label="Select Lab :"
                          name="radioGroup"
                          value="Lab"
                          checked={props.typeForward === "Lab"}
                          onChange={async (e, { value }) => {
                            props.setField("typeForward", value);
                          }}
                        />
                        <Dropdown
                          disabled={props.typeForward === "Lab" ? false : true}
                          fluid
                          search
                          selection
                          placeholder="Search or Select Lab"
                          options={props.allLab}
                          onChange={async (e, { value }) => {
                            props.checkDoctorWithRoom(value);
                          }}
                        />
                        <br />
                        <Dropdown
                          disabled={
                            props.forwardDepartmentId > 0 &&
                            props.typeForward === "Lab"
                              ? false
                              : true
                          }
                          fluid
                          search
                          selection
                          placeholder="Search or Select Room "
                          options={props.roomAndDoctors}
                          onChange={async (e, { value }) => {
                            props.setField("forwardId", value);
                          }}
                        />

                        <br />

                        <TextArea
                          style={{ width: "100%", padding: "10px" }}
                          placeholder="Tell us more"
                          onChange={async (e, { value }) => {
                            props.setField("message", value);
                          }}
                        />
                        <center>
                          {/* ทำ fucntion forward ในการอัพเดท */}
                          <Button color="blue" onClick={() => props.forward()}>
                            Forward
                          </Button>
                        </center>
                      </Modal>
                    </center>
                  </Dropdown.Item>
                  <Dropdown.Item>Call Again</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </center>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const style = {
  content: {
    margin: "auto",
    width: "40%",
    height: "500px"
  }
};
const customStyles = {
  content: {
    margin: "auto",
    maxWidth: "450px",
    height: "350px",
    borderRadius: "25px",
    border: "2px solid #1976D2"
  }
};
//dropdown department

export default Queue;
