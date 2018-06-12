import React, { Component } from 'react';
import DropdownQueue from './Dropdown'
import Rail, { Segment, Container } from 'semantic-ui-react'
import {
    Grid, Button, Dropdown, Menu, Icon, Dimmer,
    Header, Label, Item, Form, Input, TextArea, List, Table, Image,
    Message, Confirm, Card, Radio
} from 'semantic-ui-react'
import Modal from 'react-modal';
import axios from './../lib/axios'
import * as moment from 'moment';
import _ from 'underscore'
import swal from 'sweetalert'
const Queue = (props) => {

    const setField = props.setField

    return (

        <div>

            <div id="app"></div>

            < Grid >
                <Grid.Column width={5} style={{ marginLeft: '3%' }} >
                    <Segment.Group id="box" >
                        <Segment inverted color='teal'><Header textAlign='center'>Queue</Header></Segment>

                        {props.showPatient()}


                    </Segment.Group>
                    <Segment.Group id="boxLab" >
                        <Segment inverted color='teal'><Header Header textAlign='center'>Lab Wait</Header></Segment>

                        <Segment > Nested Top
                                    <Label circular color='orange' style={{ float: 'Right' }}></Label>
                        </Segment >
                        <Segment >Nested Middle
                                    <Label circular color='green' style={{ float: 'Right' }}></Label>
                        </Segment >
                        <Segment >Nested Bottom
                                    <Label circular color='green' style={{ float: 'Right' }}></Label>
                        </Segment>

                    </Segment.Group>

                    <center>
                        <Button color='blue' onClick={() => setField('modalIsOpen', true)}>
                            Add Patient
                        </Button>
                        <Modal
                            isOpen={props.modalIsOpen}
                            onRequestClose={() => setField('modalIsOpen', false)}
                            style={customStyles}>

                            <Form onSubmit={(e) => {
                                props.addQueue(e)
                            }}>
                                <Form.Input
                                    onBlur={() => props.validateHN()}
                                    icon='search'
                                    fluid label='HN'
                                    name="HN"
                                    placeholder='ex. 1234/61'
                                    value={props.HN}
                                    onChange={(e, { value }) => setField('HN', value)} />
                                <Message negative
                                    hidden={!props.errorHN.status}>
                                    HN Does not match
                                    </Message>
                                <Message negative
                                    hidden={!props.errorGetName.status}>
                                    Not have in databse
                                </Message>
                                <Message
                                    negative
                                    hidden={!props.errorAdd.status}>
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
                                    <Button type="submit" color='green'>
                                        Add
                                    </Button>
                                </center>
                            </Form>
                        </Modal>
                    </center>
                </Grid.Column>

                <Grid.Column width={10} style={{ marginTop: '3%' }}>
                    <center>
                        <Segment.Group style={{ width: '80%' }}>
                            <Segment inverted color='blue'><Header as='h1' textAlign='center'>คิวปัจจุบัน</Header></Segment>

                            {/* show current queue */}
                            {props.getPatientName()}

                        </Segment.Group>
                    </center>
                    <center>
                        <br />

                        <Button primary
                            onClick={() => {
                                props.callPatient()
                            }}
                        >Call
                        </Button>

                        <Menu vertical>
                            <Dropdown text='Option' pointing='down' className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <center>
                                            <p onClick={() => setField('showModal', true)}>Forward To</p>

                                            <Modal style={style}
                                                isOpen={props.showModal}
                                                onRequestClose={() => setField('showModal', false)}
                                                isClose={() => setField('showModal', false)}>

                                                <Radio
                                                    label='Select Department :'
                                                    name='radioGroup'
                                                    value='Department'
                                                    checked={props.typeForward === 'Department'}
                                                    onChange={async (e, { value }) => {
                                                        props.setField('typeForward', value)
                                                    }}
                                                />
                                                <br />
                                                <Dropdown
                                                    disabled={props.typeForward === 'Department' ? false : true}
                                                    fluid
                                                    search
                                                    selection
                                                    placeholder=" Search or Select Department"
                                                    // value={props.departmentId}
                                                    options={props.allDepartment}
                                                    onChange={async (e, { value }) => {
                                                        props.setField('forwardId', value),
                                                            props.selectDepartment
                                                    }}
                                                />
                                                <br />
                                                <Radio
                                                    label='Select Lab :'
                                                    name='radioGroup'
                                                    value='Lab'
                                                    checked={props.typeForward === 'Lab'}
                                                    onChange={async (e, { value }) => {
                                                        props.setField('typeForward', value)
                                                    }}
                                                />
                                                <Dropdown
                                                    disabled={props.typeForward === 'Lab' ? false : true}
                                                    fluid
                                                    search
                                                    selection
                                                    placeholder="Search or Select Lab"
                                                    // value={props.departmentId}
                                                    options={props.allLab}
                                                    onChange={async (e, { value }) => {
                                                        props.setField('forwardLabId', value)
                                                    }}
                                                />
                                                <br />
                                                <center>
                                                    <Button color='blue'
                                                        onClick={() => setField('showModal', false)}>
                                                        {/* ทำ fucntion forward ในการอัพเดท */}
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
            </Grid >
        </div >
    );
}


const style = {
    content: {
        margin: 'auto',
        width: '30%',
        height: '250px',


    }
};
const customStyles = {
    content: {
        margin: 'auto',
        maxWidth: '450px',
        height: '350px',
        borderRadius: '25px',
        border: '2px solid #1976D2'
    }
};
//dropdown department 

export default Queue





