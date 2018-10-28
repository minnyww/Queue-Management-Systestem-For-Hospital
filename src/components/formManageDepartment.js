import React, { Component } from "react";
import {
    Button, Checkbox, Form, Input, Radio, Select, TextArea,
    Segment, Menu, Grid, Label, Dropdown, List, Icon, Header, Statistic
} from 'semantic-ui-react'

const departmentOption = [
    { key: 1, text: 'Department', value: 'Department' },
    { key: 2, text: 'Lab', value: 'Lab' },
]

const formManageDepartment = props => {
    console.log("props", props);

    return (

        <div>
            <Grid centered columns={3} divided style={{ marginTop: "2.5%" }}>
                <Grid.Row stretched >
                    <Grid.Column style={{ maxHeight: '60%', minHeight: '60%', overflowY: 'scroll' }}>
                        <Segment color='blue' style={{ maxHeight: '200%' }}>
                            <List animated verticalAlign='middle' divided relaxed='very' >
                                {/* <List.Item>
                                        <Icon name='plus' />
                                        <List.Content>
                                            <List.Header>Helen</List.Header>
                                        </List.Content>
                                    </List.Item> */}
                                {props.showAllDepartment()}
                            </List>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column style={{ width: "50%", height: '60%' }}>
                        <Segment attached='bottom' color='teal' >
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Input}
                                        value={props.departmentName}
                                        label='Department Name'
                                        placeholder='Department Name'
                                        onChange={(e, { value }) => props.setField("departmentName", value)} />
                                    <Form.Field
                                        control={Select}
                                        value={props.typeOfDepartment}
                                        label='Choose Department Or Lab type'
                                        options={departmentOption}
                                        placeholder='Choose Department Or Lab type'
                                        onChange={(e, { value }) => props.setField("typeOfDepartment", value)} />
                                </Form.Group>
                            </Form>
                            <Button
                                style={{ float: 'right' }}
                                color='blue'
                                onClick={() => {
                                    props.addDepartment();
                                }}> Add
                                </Button>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default formManageDepartment;
