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
  Label
} from "semantic-ui-react";
import Modal from "react-responsive-modal";

const showCurrentQueue = props => {
  let tmp = "";
  if (props.userType === 1) {
    tmp = (
      <Segment.Group style={{ width: "80%", }}>
        <Segment attached='bottom' color='teal' style={{ padding: '13px' }}>
          <Header as="h2" >
            Current Queue
          </Header>
          {props.getPatientName()}
        </Segment>
        {/* <Segment> */}
        {/* </Segment> */}
      </Segment.Group>
    );
  } else if (props.userType === 2) {
    tmp = (
      <Segment.Group style={{ width: "80%", marginTop: "-5%" }}>
        <Segment color="blue">
          <Header as="h2" >
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
        <Segment inverted color="teal" >
          <Header textAlign="center" >
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

const Queue = props => {
  const setField = props.setField;
  return (
    <div>
      <div id="app" />
      <Grid>
        <Grid.Column width={5} style={{ marginLeft: "3%" }}>
          <Segment.Group id="box">
            <Segment color="teal">
              <Label color='teal' style={{ fontWeight: 100, fontSize: '14px' }}>Queue</Label>
            </Segment>
            {props.showPatient()}
            {props.renderModal()}
          </Segment.Group>
          {/* {listQueue(props)} */}
          <center>
            <Button color="teal" onClick={() => setField("modalIsOpen", true)}
              style={{ marginBottom: '2%', backgroudColor: 'white' }}>
              Add Patient
            </Button>
          </center>
          <Segment.Group id="boxLab">
            <Segment color="teal">
              <Menu secondary divider>
                <Menu.Item
                  active={props.activeBox === 1 ? true : false}
                  onClick={() => {
                    props.setField('activeBox', 1);
                  }}>
                  Lab Wait
                </Menu.Item>
                <Menu.Item
                  active={props.activeBox === 2 ? true : false}
                  onClick={() => {
                    props.setField('activeBox', 2);
                  }}>
                  Absent
                </Menu.Item>
              </Menu>
              {/* <Header textAlign="center">
                Lab Wait
              </Header> */}
            </Segment>
            {props.activeBox === 1 ? props.showPatientLabQueue() : props.showAbsent()}
          </Segment.Group>
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
                </center>
                <br />
                <br />
                <center>
                  <Button type="submit" basic color="teal">
                    Add
                  </Button>
                </center>
              </Form>
            </Modal>
          </center>
        </Grid.Column>

        <Grid.Column width={10}
        // style={{ marginTop: "3%" }}
        >
          <center>
            {showCurrentQueue(props)}
          </center>
          <center>
            <br />
            <Button color='teal' onClick={() => { props.callPatient() }} >
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
                            header='Need more help ? '
                            list={['Please press + icon in the column Edit or Delete instead of select dropdown', 'หากต้องการให้คนไข้กลับมาที่ห้องเดิม กรุณาเพิ่มแผนกตัวเองอีกครั้ง']}
                          />}
                        {/* <Label color='teal' style={{ marginRight: '2%' }}>หากต้องการให้คนไข้กลับมาที่ห้องเดิม กรุณาเพิ่มแผนกตัวเองอีกครั้ง</Label> */}
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
                  <Dropdown.Item onClick={() =>
                    props.absent()}>Absent</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </center>
        </Grid.Column>
      </Grid>
    </div >
  );
};



export default Queue;

