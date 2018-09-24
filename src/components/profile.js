import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import ReactDOM from "react-dom";
import Modal from "react-responsive-modal";
import "./../css/Q.css";
import { Card, Button, Header, Table, Statistic, Image } from "semantic-ui-react";

const profile = props => {
  const { setField } = props;
  return (
    <div>
      <center>
        <Card style={{ height: "30%", width: '90%' }} color='blue'>
          <Card.Content>
            {/* <Card.Header></Card.Header> */}
            <Card.Meta>{props.getPatientData()}</Card.Meta>
            <Card.Description>
              <Button color="blue"
                onClick={() => setField("showIsModal", true)}>
                ดูบัตรนัด
              </Button>
              <Modal
                center
                styles={{ modal: { width: 800 } }}
                open={props.showIsModal} style={style}
                onClose={() => setField("showIsModal", false)}
              >

                <Table celled style={{ width: "40", marginTop: '10%' }} color='teal'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan='4'>Appointment Table</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No</Table.HeaderCell>
                      <Table.HeaderCell>Date/Time</Table.HeaderCell>
                      <Table.HeaderCell>แพทย์</Table.HeaderCell>
                      <Table.HeaderCell>แผนก</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  {props.showAppointment()}
                  {/* <Table.Body>
                    <Table.Row>
                      <Table.Cell>1</Table.Cell>
                      <Table.Cell>14 สิงหาคม 2561 10.00-11.00 น.</Table.Cell>
                      <Table.Cell>พรภวิษย ์ ศิริราภา</Table.Cell>
                      <Table.Cell>กุมารเวช</Table.Cell>
                    </Table.Row>
                  </Table.Body> */}
                </Table>
              </Modal>
            </Card.Description>
          </Card.Content>{" "}
        </Card>
      </center>
      {/* <Header size="medium">คิวของท่าน</Header>
        <Statistic size="huge">
          <Statistic.Value>{props.queueData.queueId}</Statistic.Value>
        </Statistic> */}
      <center>
        <Card.Group style={{ marginTop: '3%', height: "30%", marginLeft: '1.5%', marginRight: '1.5%' }} itemsPerRow={2}>
          <Card color='blue'>
            <Card.Content>
              <Card.Header>คิวปัจจุบัน</Card.Header>
              <Card.Description>
                <Statistic size="huge" color='blue'>
                  <Statistic.Value>{props.queueData.currentQueue}</Statistic.Value>
                </Statistic>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Card.Header>คิวที่รอ</Card.Header>
              <Statistic size="mini" >
                <Statistic.Value>
                  {props.queueData.queueId - props.queueData.currentQueue < 0 ? '0' : props.queueData.queueId - props.queueData.currentQueue
                    || props.queueData.queueId - props.queueData.currentQueue === NaN ? '0' : '0'
                  }
                  
                </Statistic.Value>
                <Statistic.Value>
                  Queue
                </Statistic.Value>
              </Statistic>
            </Card.Content>
          </Card>
          <Card color='teal'>
            <Card.Content>
              <Card.Header>คิวของท่าน</Card.Header>
              <Card.Description>
                <Statistic size="huge" color='teal'>
                  <Statistic.Value>{props.queueData.queueId}</Statistic.Value>
                </Statistic>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Card.Header>เวลาที่รอ</Card.Header>
              <Statistic size='mini'>
                <Statistic.Value>
                  {props.queueData.statusId !== 4 ? parseInt(props.queueData.avgtime).toFixed(0) + '' : ''}
                </Statistic.Value>
                <Statistic.Value>
                  Min
                </Statistic.Value>
              </Statistic>
            </Card.Content>
          </Card>
        </Card.Group>
      </center>
    </div >
  );
};

const style = {
  content: {
    margin: "auto",
    width: "80%",
    height: "80%"
  }
};

export default profile;
