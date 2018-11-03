import React, { Component } from "react";
import { Button, Grid, Icon, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import surgeon from './../img/surgeon.png'
import nurseAppointment from './../img/nurseAppointment.png'
import medicalHistory from './../img/medical-history.png'
import flask from './../img/flask.png'
const mainButton = props => {
    return (
        <div>
            <center>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={6}>
                            <Link to={"/Adminhome"}>
                            <Image src={surgeon} style={{ height: '250px' }} circular/>
                                <Card link >
                                    <Card.Content>
                                        <Card.Header>Queue Management </Card.Header>
                                        <Card.Description> <Button basic color='teal'>  
                                            Queue Management
                                        </Button></Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                        </Grid.Column >
                        <Grid.Column width={6}>
                            <Link to={"/Appointment"}>
                            <Image src={nurseAppointment} style={{ height: '250px' }} circular/>
                                <Card link >
                                    <Card.Content>
                                        <Card.Header>Appointment Management</Card.Header>
                                        <Card.Description> <Button basic color='teal'>
                                            Appointment Management
                                        </Button></Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={6}>
                            <Link to={"/Timetable"}>
                            <Image src={medicalHistory} style={{ height: '250px' }} circular/>
                                <Card link >
                                    <Card.Content>
                                        <Card.Header>Timetable Management</Card.Header>
                                        <Card.Description> <Button basic color='teal'>
                                            Timetable Management
                                        </Button></Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Link to={"/AddOrDeleteDepartment"}>
                            <Image src={flask} style={{ height: '250px' }} circular />
                                <Card link >
                                    <Card.Content>
                                        <Card.Header>Admin Management</Card.Header>
                                        <Card.Description> <Button basic color='teal'>
                                            Admin Management
                                        </Button></Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid.Row>
                </Grid>
            </center>
        </div>
    );
};

export default mainButton;
