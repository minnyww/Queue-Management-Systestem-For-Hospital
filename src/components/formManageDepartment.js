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
            <Segment attached='bottom' color='teal' >
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
                        color='blue'
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
    if (props.activeItem === 'department' || props.activeItem === 'rooms') {
        tmp = (<div>
            <Segment color='blue' style={{ maxHeight: '200%' }}>
                <Header>List Of Department</Header>
                <List animated verticalAlign='middle' divided relaxed='very' >
                    {props.activeItem === 'department' ? props.showAllDepartment() : props.showAllRoom()}
                </List>
            </Segment>
        </div>
        );
    }
    return tmp;
};

const showFormRoom = props => {
    let tmp = "";
    if (props.activeItem === 'rooms') {
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
                        color='blue'
                        onClick={() => {
                            props.addRooms();
                        }}> Add
                </Button>
                </center>
            </Segment>
        </div>
        );
    }
    return tmp;
};

const formManageDepartment = props => {
    console.log("props", props);

    return (
        <div>
            <Grid centered style={{
                marginTop: "2.5%",
            }}>
                <Header as='h2' color='teal'>Department Management</Header>
                <Grid.Row stretched >
                    <Grid.Column width={3} style={{ maxHeight: '60%', minHeight: '60%', height: 450 }}>
                        <Menu pointing vertical>
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
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={6} style={{ maxHeight: '60%', minHeight: '60%', overflowY: 'scroll', }}>
                        {showContent(props)}
                        {/* <Segment color='blue' style={{ maxHeight: '200%' }}>
                            <Header>List Of Department</Header>
                            <List animated verticalAlign='middle' divided relaxed='very' >
                                {props.showAllDepartment()}
                            </List>
                        </Segment> */}
                    </Grid.Column>
                    <Grid.Column width={6} style={{ width: "50%", height: '60%' }}>
                        {showContentForm(props)}
                        {showFormRoom(props)}
                        {/* <Segment attached='bottom' color='teal' >
                            <Header>Add Department</Header>
                            <Form>
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
                            </Form>
                            <br />
                            <center>
                                <Button
                                    color='blue'
                                    onClick={() => {
                                        props.addDepartment();
                                    }}> Add
                                </Button>
                            </center>
                        </Segment> */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default formManageDepartment;
