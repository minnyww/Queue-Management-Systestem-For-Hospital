import React, { Component } from "react";
import * as R from 'ramda'
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
  Label,
  Divider, Dimmer, Loader
} from "semantic-ui-react";
import Modal from "react-responsive-modal";

const showCurrentQueue = props => {
  let tmp = "";
  if (props.userType === 1 || props.userType === 2) {
    tmp = (
      <Segment.Group style={{ width: "80%", height: '600px', }} >
        <Segment attached='bottom' color='teal' style={{ padding: '13px', height: '600px', }}>
          <Header as="h2" style={{ borderBottom: '1px solid #dededf', padding: '1%' }}>
            Current Queue
          </Header>
          {/* <Dimmer.Dimmable as={Segment} dimmed={R.isEmpty(props.currentQueue) ? true : false}>
            <Dimmer active={R.isEmpty(props.currentQueue) ? true : false} inverted>
              <Loader>Loading</Loader>
            </Dimmer> */}
          {props.getPatientName()}
          {/* </Dimmer.Dimmable> */}
        </Segment>
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
        <Segment inverted color="teal" >
          <Header  >
            Waiting List
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

const Queue = props => {
  const setField = props.setField;
  return (
    <div>
      <div id="app" />
      <Grid>
        <Grid.Row style={{ paddingLeft: "3%", paddingRight: "3%" }}>
          <Grid.Column width={6}>
            {/* ----------------------- Queue Box -------------------- */}
            <Segment.Group id="box">
              <Segment color="teal">
                <Label color='teal' style={{ fontWeight: 100, fontSize: '14px' }}>Queue</Label>
              </Segment>
              {/* <Dimmer.Dimmable dimmed={R.isEmpty(props.queues) ? true : false}>
                <Dimmer active={R.isEmpty(props.queues) ? true : false} inverted>
                  <Loader>Loading</Loader>
                </Dimmer> */}
              {props.showPatient()}
              {/* </Dimmer.Dimmable> */}
              {props.renderModal()}
            </Segment.Group>
            <center>
              <Button color="teal" onClick={() => setField("modalIsOpen", true)}
                style={{ marginBottom: '2%', backgroudColor: 'white' }}>
                Add Patient
            </Button>
            </center>
            {/* ----------------------- Queue Box -------------------- */}
            {/* ----------------------- Lab and Absent Box -------------------- */}
            <Segment.Group id="boxLab">
              <Segment color="teal">
                <Menu secondary >
                  <Menu.Item
                    active={props.activeBox === 1 ? true : false}
                    onClick={() => {
                      props.setField('activeBox', 1);
                    }}>
                    Waiting List
                </Menu.Item>
                  <Menu.Item
                    active={props.activeBox === 2 ? true : false}
                    onClick={() => {
                      props.setField('activeBox', 2);
                    }}>
                    Absent
                </Menu.Item>
                </Menu>
              </Segment>
              {props.activeBox === 1 ? props.showPatientLabQueue() : props.showAbsent()}
            </Segment.Group>
            {/* ----------------------- Lab and Absent Box -------------------- */}
            {/* ----------------------- Modal Add Patient  -------------------- */}
            <center>
              <Modal
                open={props.modalIsOpen}
                onClose={() => setField("modalIsOpen", false)}
                styles={{ modal: { width: 400, top: "30%", borderRadius: '5px' } }}
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
                        <List.Content style={{ fontSize: '16px' }}>
                          Name: {props.namePatient}
                          {props.lastNamePatient}
                        </List.Content>
                      </List.Item>
                    </List>
                    <br />
                    <br />
                    <Button type="submit" basic color="teal">
                      Add
                  </Button>
                  </center>
                </Form>
              </Modal>
            </center>
            {/* ----------------------- Modal Add Patient  -------------------- */}
          </Grid.Column>

          <Grid.Column width={10}
          // style={{ marginTop: "3%" }}
          >
            {/* ------------------------- Current Queue Box ----------------------------- */}
            <center>
              {showCurrentQueue(props)}

              {/* ------------------------- Current Queue Box ----------------------------- */}
              {/* ------------------------- Button Group Under Current Queue Box ---------- */}
              <Button.Group>
                <Button color='teal'
                  onClick={() => {
                    props.callPatient()
                  }} >
                  {props.currentQueue.firstName === undefined ? 'Call' : 'Call Next'}
                </Button>
                <Button.Or />

                <Button positive
                  disabled={props.currentQueue.firstName === undefined ? true : false}
                  onClick={() =>
                    forward(props)}>Forward
                </Button>
                <Button.Or />
                <Button color='orange'
                  disabled={props.currentQueue.firstName === undefined}
                  onClick={() => { props.absent() }}>
                  Absent
                  </Button>
              </Button.Group>
              {/* ------------------------- Button Group Under Current Queue Box ---------- */}
              {/*  ---------------------- Modal Forwad ------------------------- */}
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
                    header='Need more help ? '
                    list={['Please press + icon in the column Edit or Delete instead of select dropdown', 'หากต้องการให้คนไข้กลับมาที่ห้องเดิม กรุณาเพิ่มแผนกตัวเองอีกครั้ง']}
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
                <center>
                  <Divider horizontal>Or</Divider>
                  <Button color="blue" onClick={() => props.forward()}
                    disabled={
                      R.isEmpty(props.forwardDepartments)
                        || (!R.isEmpty(props.forwardDepartments)
                          && props.forwardDepartments.filter(data => (data.addStatus) === true).length < 1)
                        ? true : false
                    }
                  >
                    Forward
                  </Button>
                </center>
              </Modal>
              {/*  ---------------------- Modal Forwad ------------------------- */}
            </center>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div >
  );
};



export default Queue;

