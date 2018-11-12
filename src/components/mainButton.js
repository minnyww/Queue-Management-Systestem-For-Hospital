import React, { Component } from "react";
import { Button, Grid, Icon, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import surgeon from './../img/surgeon.png'
import nurseAppointment from './../img/nurseAppointment.png'
import medicalHistory from './../img/medical-history.png'
import flask from './../img/flask.png'
import "./../css/Q.css";

const mainButton = props => {
    return (
        <div style={{ marginTop: '3%' }}>
            <center>
                <Grid>
                    <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={6} >
                            <Link to={"/Adminhome"} style={{ height: '100px' }}>
                                <Image src={surgeon} style={{ height: '150px' }} circular />
                                <Card link >
                                    <Card.Content>
                                        <Card.Header>Queue Management </Card.Header>
                                        <Card.Description>
                                            <Button basic color='teal'
                                                content='Queue Management ' icon='right arrow'
                                                labelPosition='right'>
                                            </Button></Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                        </Grid.Column >
                        <Grid.Column width={6}>
                            <Link to={"/Appointment"}>
                                <Image src={nurseAppointment} style={{ height: '150px' }} circular />
                                <Card link >
                                    <Card.Content>
                                        <Card.Header>Appointment Management</Card.Header>
                                        <Card.Description>
                                            <Button basic color='teal'
                                                content='Appointment Management' icon='right arrow'
                                                labelPosition='right'>
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
                                <Image src={medicalHistory} style={{ height: '150px' }} circular />
                                <Card link >
                                    <Card.Content>
                                        <Card.Header>Timetable Management</Card.Header>
                                        <Card.Description>
                                            <Button basic color='teal'
                                                content='Timetable Management' icon='right arrow'
                                                labelPosition='right'>
                                            </Button></Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Link to={"/AddOrDeleteDepartment"}>
                                <Image src={flask} style={{ height: '150px' }} circular />
                                <Card link >
                                    <Card.Content>
                                        <Card.Header>Admin Management</Card.Header>
                                        <Card.Description>
                                            <Button basic color='teal'
                                                content='Admin Management' icon='right arrow'
                                                labelPosition='right'>
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
