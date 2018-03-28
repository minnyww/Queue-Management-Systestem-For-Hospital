import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './../css/Q.css';
import nine from './nine.jpg';
import { Card, Icon, Image, Button, Form, Segment, Header, Table } from 'semantic-ui-react'
class profile extends Component {

  // Modal
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {

    return (
      <div>
        <center>
          <Card>
            <img src={nine} class="ui small centered image" />
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

                <Button primary onClick={this.handleOpenModal}>ดูบัตรนัด</Button>
                <Modal style={style}
                  isOpen={this.state.showModal}
                  contentLabel="Minimal Modal Example" >
                  <i class="large window close icon" onClick={this.handleCloseModal}
                    style={{ float: 'right', marginBottom: '5%', color: 'red' }}></i>
                  
                  
                  <Table celled style={{ width:'40' }}>
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
            <Header size='huge'>7</Header>
        </center>




      </div >
    );
  }
}
const style = {
  content: {
    margin: 'auto',
    width: '80%',
    height: '80%',


  }
};

export default profile;



