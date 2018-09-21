import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import ReactDOM from "react-dom";
import Modal from "react-responsive-modal";
import "./../css/Q.css";
import { Card, Button, Header, Table, Statistic } from "semantic-ui-react";

const profile = props => {
  const { setField } = props;
    return (
    <div>
      <center>
        <Card style={{ height: "30%" }}>
          <Card.Content>
            {/* <Card.Header></Card.Header> */}
            <Card.Meta>{props.getPatientData()}</Card.Meta>
            <Card.Description>
              <Button
                color="blue"
                onClick={() => setField("showIsModal", true)}
              >
                ดูบัตรนัด
              </Button>
              <Modal
                center
                styles={{ modal: { width: 800 } }}
                open={props.showIsModal} style={style}
                onClose={() => setField("showIsModal", false)}
              >


                <Header as='h3'>Appointment Table</Header>

                <Table celled style={{ width: "40", marginTop: '5%' }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No</Table.HeaderCell>
                      <Table.HeaderCell>Date/Time</Table.HeaderCell>
                      <Table.HeaderCell>แพทย์</Table.HeaderCell>
                      <Table.HeaderCell>แผนก</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>1</Table.Cell>
                      <Table.Cell>14 สิงหาคม 2561 10.00-11.00 น.</Table.Cell>
                      <Table.Cell>พรภวิษย ์ ศิริราภา</Table.Cell>
                      <Table.Cell>กุมารเวช</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>2</Table.Cell>
                      <Table.Cell>15 สิงหาคม 2561 10.00-11.00 น.</Table.Cell>
                      <Table.Cell>พรภวิษย์ ศิริราภา</Table.Cell>
                      <Table.Cell>กุมารเวช</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Modal>
            </Card.Description>
          </Card.Content>{" "}
        </Card>
        <Header size="medium">คิวของท่าน</Header>
        <Statistic size="huge">
          <Statistic.Value>{props.queueData.queueId}</Statistic.Value>
        </Statistic>
      </center>
    </div>
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
