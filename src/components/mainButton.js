import React, { Component } from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
const mainButton = props => {
    return (
        <div>
            <center>
                <Grid centered>
                    <Grid.Row columns={4}>
                        <Grid.Column>
                            <Link to={"/Adminhome"}>
                                <Button
                                    style={{
                                        height: '250px', boxShadow: '5px 6px 5px 0px rgba(224,220,224,1)',
                                        width: '300px',
                                        marginRight: '5px'
                                    }}
                                    size="massive"
                                    color='blue'
                                ><Icon className='time' />Queue Management</Button>
                            </Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link to={"/Appointment"}>
                                <Button
                                    style={{
                                        height: '250px', boxShadow: '5px 6px 5px 0px rgba(224,220,224,1)',
                                        width: '300px',
                                        marginLeft: '5px'
                                    }}

                                    size="massive"
                                    color='teal'
                                ><Icon className='address book' />Appointment</Button>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={4}>
                        <Grid.Column>
                            <Link to={"/Timetable"}>
                                <Button
                                    style={{
                                        height: '250px', boxShadow: '5px 6px 5px 0px rgba(224,220,224,1)',
                                        width: '300px',
                                        marginRight: '5px'
                                    }}
                                    size="massive"
                                    color='green'
                                ><Icon className='calendar alternate outline' />Timetable Management</Button>
                            </Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link to={"/AddOrDeleteDepartment"}>
                                <Button
                                    style={{
                                        height: '250px', boxShadow: '5px 6px 5px 0px rgba(224,220,224,1)',
                                        width: '300px',
                                        marginLeft: '5px'
                                    }}
                                    size="massive"
                                    color='orange'
                                ><Icon className='edit outline' />Department and Room Management</Button>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </center>
        </div>
    );
};

export default mainButton;
