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
// import Modal from "react-modal";
import Modal from "react-responsive-modal";

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
          <Header textAlign="center">
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

          <center>
            <Button color="blue" onClick={() => setField("modalIsOpen", true)}>
              Add Patient
            </Button>
            <Modal
              open={props.modalIsOpen}
              onClose={() => setField("modalIsOpen", false)}
              styles={{ modal: { width: 600, top: "30%" } }}
            >
              <Form onSubmit={e => { props.addQueue(e); }}
              >
                <br />

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
              <Dropdown text="Option" className="link item">
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <center>
                      <p onClick={() => setField("showModal", true)}>
                        Forward To
                      </p>

                      <Modal
                        styles={{ modal: { width: 800, top: '30%' } }}
                        open={props.showModal}
                        onClose={() => setField("showModal", false)}

                      >
                        {/* <Radio
                          label="Select Department :"
                          name="radioGroup"
                          value="Department"
                          checked={props.typeForward === "Department"}
                          onChange={async (e, { value }) => {
                            props.setField("typeForward", value);
                          }}
                        /> */}
                        <br />
                        <br />

                        <center>
                          <Button basic color='blue' style={{ marginBottom: "3%" }}
                            onClick={() => props.addMoreForward()}
                          >
                            +
                        </Button>
                        </center>

                        {/* <Menu compact>
                          <Dropdown.Menu>
                            <Dropdown
                              simple
                              item
                              placeholder=" Search or Select Department/Lab"
                              options={labOrDepartment}
                              onChange={async (e, { value }) => {
                                props.setField("typeForward", value);
                              }}

                            />
                            <Dropdown
                              disabled={
                                props.typeForward === "Department" || props.typeForward === "Lab" ? false : true
                              }
                              simple
                              item
                              placeholder=" Search or Select Department or Lab"
                              options={props.typeForward === "Department" ? props.allDepartment : props.allLab}
                              onChange={async (e, { value }) => {
                                props.checkDoctorWithRoom(value);
                              }}
                            />

                            <br />

                            <Dropdown
                              disabled={
                                props.forwardDepartmentId > 0 &&
                                  props.typeForward === "Department" || props.typeForward === "Lab"
                                  ? false
                                  : true
                              }
                              simple
                              item
                              placeholder="Search or Select Room with doctor"
                              options={props.roomAndDoctors}
                              onChange={async (e, { value }) => {
                                props.setField("forwardId", value);
                              }}
                            />
                          </Dropdown.Menu>
                          <br />
                          
                         </Menu> */}
                         {props.showListDepartment()}
                        <br />
                        <br />

                        <center>
                          <TextArea
                            style={{ width: "50%", padding: "10px" }}
                            placeholder="Tell us more"
                            onChange={async (e, { value }) => {
                              props.setField("message", value);
                            }}
                          />
                        </center>
                        <center>

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
    width: "75%",
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
const labOrDepartment = [
  {
    key: 1,
    text: "Lab",
    value: "Lab"
  },
  {
    key: 2,
    text: "Department",
    value: "Department"
  },

];
