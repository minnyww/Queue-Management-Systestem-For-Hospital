import React, { Component } from "react";

import {
  Grid,
  Button,
  Dropdown,
  Menu,
  Header,
  Form,
  List,
  Message,
  Segment,
  Table,
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

const forward = (props) => {
  props.setField("showModal", true)
  props.forwardList(props.currentQueue)
}
// const goBack = props => {
//   let tmp = "";
//   if (props.userType === 2) {
//     tmp = (
//       <Button primary onClick={() => { props.goBack(); }} >
//         Go back
//       </Button>
//     );
//   }
//   return tmp;
// };

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
            {props.renderModal()}
          </Segment.Group>
          {/* {listQueue(props)} */}
          <Segment.Group id="boxLab">
            <Segment inverted color="teal">
              <Header textAlign="center">
                Lab Wait
              </Header>
            </Segment>
            {props.showPatientLabQueue()}
          </Segment.Group>
          <center>
            <Button color="blue" onClick={() => setField("modalIsOpen", true)}>
              Add Patient
            </Button>
            <Modal
              open={props.modalIsOpen}
              onClose={() => setField("modalIsOpen", false)}
              styles={{ modal: { width: 600, top: "30%" } }}
            >
              <Form onSubmit={e => { props.addQueue(e); }}>
                <br />
                <Form.Input onBlur={() => props.validateHN()}
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
            <Button primary onClick={() => { props.callPatient() }} >
              Call
            </Button>

            <Menu vertical>
              <Dropdown text="Option" className="link item">
                <Dropdown.Menu>
                  <Dropdown.Item disabled={props.currentQueue.firstName === undefined ? true : false}>
                    <center>
                      <p onClick={() =>
                        forward(props)
                      }>
                        Forward To
                      </p>
                      <Modal
                        styles={{ modal: { width: 800, } }}
                        open={props.showModal}
                        onClose={() =>
                          setField("showModal", false)
                        }>
                        <br />
                        <br />
                        {props.currentQueue.step === 1 && props.forwardDepartments.length !== props.forwardDepartments.length + 1 ? ' ' :
                          <Message
                            info
                            attached
                            header='You want to add more Department ? '
                            content='Please press + icon in the column Edit or Delete instead of select dropdown'
                          />}
                        <Table color='teal' >
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>Lab Or Department</Table.HeaderCell>
                              <Table.HeaderCell>Department</Table.HeaderCell>
                              <Table.HeaderCell>Doctor / Room</Table.HeaderCell>
                              <Table.HeaderCell>Message</Table.HeaderCell>
                              <Table.HeaderCell>Edit Or Delete</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {props.showListDepartment()}
                          </Table.Body>
                        </Table>
                        <br />
                        {props.showDropdownDepartment()}
                        <br />
                        <br />
                        <br />
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



export default Queue;

