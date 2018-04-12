import React, { Component } from 'react';
import DropdownQueue from './Dropdown'
import Rail, { Segment } from 'semantic-ui-react'
import {
    Grid, Button, Dropdown, Menu, Icon, Dimmer,
    Header, Label, Item, Form, Input, TextArea, List, Table, Image, Message, Confirm
} from 'semantic-ui-react'
import Modal from 'react-modal';
import axios from './../lib/axios'
import * as moment from 'moment';
import _ from 'underscore'

const Queue = (props) => {
    const setField = props.setField
     return (
            <div>
                <div id="app"></div>
                < Grid >
                    <Grid.Column width={4}>
                        <Segment.Group id="box">
                            <Segment color='blue'><Header>Queue</Header></Segment>
                            <Segment.Group >
                                {props.showPatient()}
                            </Segment.Group>

                        </Segment.Group>
                        <Segment.Group id="boxLab" >
                            <Segment color='blue'><Header>Lab Wait</Header></Segment>
                            <Segment.Group >
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
                        </Segment.Group>

                        <center>
                            <Button color='blue' onClick={ () => setField('modalIsOpen',true) }>
                            Add Patient</Button>
                                <Modal
                                isOpen={props.modalIsOpen}
                                onRequestClose={() => setField('modalIsOpen',false)}
                                style={customStyles}>

                                <Form onSubmit={(e) => {
                                                setField('modalIsOpen',false)
                                                props.addQueue(e)
                                            }}>
                                    <Form.Input
                                        onBlur={() => props.validateHN()}
                                        icon='search'
                                        fluid label='HN'
                                        name="HN"
                                        placeholder='HN'
                                        value={ props.HN}
                                        onChange={(e, { value }) => setField('HN', value)} />
                                    <Message negative
                                        hidden={! props.errorHN.status}>
                                        HN Does not match
                                    </Message>
                                    <br />
                                    <center>
                                        <List>
                                            <List.Item>
                                                <List.Content>
                                                    
                                                        Name: { props.namePatient}
                                                        { props.lastNamePatient}
                                                    
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

                    <Grid.Column stretched width={12} >
                        <Segment id="boxshow">
                        </Segment>
                        <center>
                            <Button primary>Call</Button>
                            <Menu vertical>
                                <Dropdown text='Option' pointing='left' className='link item'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            <center>
                                                <p onClick={ () => setField('showModal',true)}>Forward To</p>
                                                <Modal style={style}
                                                    isOpen={props.showModal}
                                                    isClose={ () => setField('showModal',false)}>
                                                    <Dropdown
                                                        placeholder='Select Country'
                                                        fluid
                                                        search
                                                        selection
                                                        options={options} />
                                                    <br />
                                                    <center>
                                                        <Button color='blue'
                                                            onClick={ () => setField('showModal',false)}>
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
        width: '60%',
        height: '250px',


    }
};
const customStyles = {
    content: {
        margin: 'auto',
        maxWidth: '450px',
        height: '350px',
    }
};
const options = [
    { key: '1', text: 'Angular', value: 'angular' },
    { key: '2', text: 'CSS', value: 'css' },
    { key: '3', text: 'Graphic Design', value: 'design' },
    { key: '4', text: 'Ember', value: 'ember' },
    { key: '5', text: 'HTML', value: 'html' },
    { key: '6', text: 'Information Architecture', value: 'ia' },
    { key: '7', text: 'Javascript', value: 'javascript' },
    { key: '8', text: 'Mechanical Engineering', value: 'mech' },
    { key: '9', text: 'Meteor', value: 'meteor' },
    { key: '10', text: 'NodeJS', value: 'node' },
    { key: '11', text: 'Plumbing', value: 'plumbing' },
    { key: '12', text: 'Python', value: 'python' },
    { key: '13', text: 'Rails', value: 'rails' },
    { key: '14', text: 'React', value: 'react' },
    { key: '15', text: 'Kitchen Repair', value: 'repair' },
    { key: '16', text: 'Ruby', value: 'ruby' },
    { key: '17', text: 'UI Design', value: 'ui' },
    { key: '18', text: 'User Experience', value: 'ux' },
]
export default Queue





