import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './../css/Q.css';
import nine from './../img/nine.jpg';
import { Card, Icon, Image, Button, Form, Segment, Header, Table, Statistic } from 'semantic-ui-react'


const profile = (props) => {
  const { setField, showIsModal } = props
  

  return (
    <div>
      <center>
        <Card style={{ height: '30%' }}>
          <Image src={nine} size="big" style={{ height: '250px' }} />
          <Card.Content>
            <Card.Header>
              Eric cantona
              </Card.Header>
            <Card.Meta>
              <span className='date'>
                HN : 12345/61
              </span>
            </Card.Meta>
            <Card.Description>

              <Button color="blue" onClick={() => setField('showIsModal', true)}>  ดูบัตรนัด </Button>
              <Modal
                isOpen={props.showIsModal}
                style={style}>
                <i class="large window close icon"
                  onClick={() => setField('showIsModal', false)}
                  style={{
                    float: 'right',
                    marginBottom: '5%',
                    color: 'red'
                  }}>
                </i>


                <Table celled style={{ width: '40' }}>
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
          </Card.Content> </Card>
        <Header size='medium'>คิวของท่าน</Header>
        <Statistic size='huge'>
          <Statistic.Value>7</Statistic.Value>
        </Statistic>
      </center>
    </div >
  );
}

const style = {
  content: {
    margin: 'auto',
    width: '80%',
    height: '80%',


  }
};

export default profile;



