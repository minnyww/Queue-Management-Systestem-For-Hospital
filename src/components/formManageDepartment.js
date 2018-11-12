import React, { Component } from "react";
import {
    Button, Checkbox, Form, Input, Radio, Select, TextArea,
    Segment, Menu, Grid, Label, Dropdown, List, Icon, Header, Statistic
} from 'semantic-ui-react'

const departmentOption = [
    { key: 1, text: 'Department', value: 'Department' },
    { key: 2, text: 'Lab', value: 'Lab' },
]

const showContentForm = props => {
    let tmp = ''
    if (props.activeItem === 'department') {
        tmp = (<div>
            <Segment attached='bottom' color='teal'>
                <Header>Add Department</Header>
                <Form>
                    {/* <Form.Group widths='equal'> */}
                    <Form.Field
                        required
                        control={Input}
                        value={props.departmentName}
                        label='Department Name'
                        placeholder='Department Name'
                        onChange={(e, { value }) => props.setField("departmentName", value)} />
                    <Form.Field
                        required
                        control={Select}
                        value={props.typeOfDepartment}
                        label='Choose Department Or Lab type'
                        options={departmentOption}
                        placeholder='Choose Department Or Lab type'
                        onChange={(e, { value }) => props.setField("typeOfDepartment", value)} />
                    {/* </Form.Group> */}
                </Form>
                <br />
                <center>
                    <Button
                        color='teal'
                        onClick={() => {
                            props.addDepartment();
                        }}> Add
                </Button>
                </center>
            </Segment>
        </div>
        )
    }
    return tmp
}

const showContent = props => {
    let tmp = "";
    //show  All Department or All Room 
    if (props.activeItem === 'department' || props.activeItem === 'rooms') {
        tmp = (<div>
            <Segment color='blue' style={{ maxHeight: '200%' }}>
                <Header>{props.activeItem === 'department' ? 'List Of Departments' : 'List Of Rooms'}</Header>
                <List animated verticalAlign='middle' divided relaxed='very' >
                    {props.activeItem === 'department' ? props.showAllDepartment() : props.showAllRoom()}
                </List>
            </Segment>
        </div>
        )
    }
    //show All Doctor
    else if (props.activeItem === 'doctors') {
        tmp = (<div>
            <Segment color='blue' style={{ maxHeight: '200%' }}>
                <Header>List Of Doctors</Header>
                <List animated verticalAlign='middle' divided relaxed='very' >
                    <Menu secondary>
                        <Menu.Item
                            active={props.todayItem === 'today' ? true : false}
                            onClick={() => {
                                props.setField('todayItem', 'today');
                            }}>
                            Edit Patient Limit (Today)
                        </Menu.Item>
                        <Menu.Item
                            active={props.todayItem === 'all' ? true : false}
                            onClick={() => {
                                props.setField('todayItem', 'all');
                            }}>
                            All
                        </Menu.Item>
                    </Menu>
                    {props.todayItem === 'today' ? props.showAllDoctorsLimit() : props.showDoctors()}
                </List>
            </Segment>
        </div>
        )
    } else if (props.activeItem === 'patients') {
        tmp = (<div>
            <Segment color='blue' style={{ maxHeight: '200%' }}>
                <Header>List Of Patients</Header>
                <List animated verticalAlign='middle' divided relaxed='very' >
                    {props.showPatient()}
                </List>
            </Segment>
        </div>
        )
    }

    return tmp;
};

const showFormRoom = props => {
    let tmp = "";
    if (props.activeItem === 'rooms') {
        // Form Add Room
        tmp = (<div>
            <Segment attached='bottom' color='teal' >
                <Header>Add Room</Header>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Input}
                            value={props.roomNumber}
                            label='Room Number'
                            placeholder='Room Number'
                            onChange={(e, { value }) => props.setField("roomNumber", value)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Input}
                            value={props.building}
                            label='Building'
                            placeholder='Building'
                            onChange={(e, { value }) => props.setField("building", value)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Input}
                            value={props.floor}
                            label='Floor'
                            placeholder='Floor'
                            onChange={(e, { value }) => props.setField("floor", value)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Select}
                            value={props.departmentValueId}
                            label='Choose Department'
                            options={props.allDepartments}
                            placeholder='Choose Department'
                            onChange={(e, { value }) => props.setField("departmentValueId", value)} />
                    </Form.Group>
                </Form>
                <br />
                <center>
                    <Button
                        color='teal'
                        onClick={() => {
                            props.addRooms();
                        }}> Add
                </Button>
                </center>
            </Segment>
        </div>
        )
        // Form Add Doctor
    } else if (props.activeItem === 'doctors') {
        tmp = (<div>
            <Segment attached='bottom' color='teal' >
                <Header>Add Doctor</Header>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Input}
                            // value={props.roomNumber}
                            label='Firstname'
                            placeholder='Firstname'
                            onChange={(e, { value }) => props.setField("firstnameDoctor", value)} />

                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Input}
                            // value={props.building}
                            label='Lastname'
                            placeholder='Lastname'
                            onChange={(e, { value }) => props.setField("lastnameDoctor", value)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Input}
                            // value={props.floor}
                            label='Employee Id'
                            placeholder='Employee Id'
                            onChange={(e, { value }) => props.setField("employeeId", value)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Input}
                            // value={props.floor}
                            label='Average Time'
                            placeholder='Average Time'
                            onChange={(e, { value }) => props.setField("avgTimeDoctor", value)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Select}
                            // value={props.departmentValueId}
                            label='Choose Department'
                            options={props.allDepartments}
                            placeholder='Choose Department'
                            onChange={(e, { value }) => props.setField("departmentValueId", value)} />
                    </Form.Group>
                </Form>
                <center>
                    <Button
                        color='teal'
                        onClick={() => {
                            props.addDoctors();
                        }}> Add
                </Button>
                </center>
            </Segment>
        </div>)
    }
    else if (props.activeItem === 'patients') {
        tmp = (<div>
            <Segment attached='bottom' color='teal' >
                <Header>Add Patients</Header>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Input}
                            // value={props.roomNumber}
                            label='Firstname'
                            placeholder='Firstname'
                            onChange={(e, { value }) => props.setField("firstnamePatient", value)} />

                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Input}
                            // value={props.building}
                            label='Lastname'
                            placeholder='Lastname'
                            onChange={(e, { value }) => props.setField("lastnamePatient", value)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            control={Input}
                            // value={props.floor}
                            label='Hospital Number'
                            placeholder='Hospital Number'
                            onChange={(e, { value }) => props.setField("HNPatient", value)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            required
                            type='date'
                            // control={CustomCalendar}
                            // value={props.floor}
                            label='Date of birth'
                            placeholder='Date of birth'
                            onChange={(e, { value }) => props.setField("dob", value)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            required
                            control={Input}
                            // value={props.departmentValueId}
                            label='Phone Number'
                            placeholder='Phone Number'
                            onChange={(e, { value }) => props.setField("phonenumber", value)} />
                        <Form.Input
                            required
                            control={Select}
                            // value={props.departmentValueId}
                            label='Gender'
                            options={gender}
                            placeholder='Gender'
                            onChange={(e, { value }) => props.setField("gender", value)} />
                    </Form.Group>
                </Form>
                <center>
                    <Button
                        color='teal'
                        onClick={() => {
                            props.addPatient();
                        }}> Add
                </Button>
                </center>
            </Segment>
        </div>)
    }
    return tmp;
};

const gender = [
    {
      key: 1,
      text: "Male",
      value: "Male"
    },
    {
      key: 2,
      text: "Female",
      value: "Female"
    },
  ];


const formManageDepartment = props => {
    console.log("props", props);

    return (
        <div>
            <Grid centered style={{
                // marginTop: "1.5%",
            }}>
                <Header as='h2' color='teal'>Department Management</Header>
                <Grid.Row stretched style={{ paddingRight: '5%', paddingLeft: '3%' }}>
                    <Grid.Column width={4}
                        style={{ maxHeight: '250px', minHeight: '150px', height: 450, }} >
                        <Menu pointing vertical color='teal'>
                            <Menu.Item
                                name='Add or Delete Department'
                                onClick={() => {
                                    props.setField('activeItem', 'department');
                                }}
                                active={props.activeItem === 'department' ? true : false}
                            >Department
                            </Menu.Item>
                            <Menu.Item
                                name='Rooms'
                                onClick={() => {
                                    props.setField('activeItem', 'rooms');
                                }}
                                active={props.activeItem === 'rooms' ? true : false}
                            >Rooms
                            </Menu.Item>
                            <Menu.Item
                                name='Doctors'
                                onClick={() => {
                                    props.setField('activeItem', 'doctors');
                                }}
                                active={props.activeItem === 'doctors' ? true : false}
                            >Doctors
                            </Menu.Item>
                            <Menu.Item
                                name='Doctors'
                                onClick={() => {
                                    props.setField('activeItem', 'patients');
                                }}
                                active={props.activeItem === 'patients' ? true : false}
                            >Patients
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={6}
                        style={{ maxHeight: '400px', minHeight: '400px', overflowY: 'scroll', }}>
                        {showContent(props)}
                    </Grid.Column>
                    <Grid.Column width={6} style={{ height: '60%', }}>
                        {showContentForm(props)}
                        {showFormRoom(props)}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default formManageDepartment;
