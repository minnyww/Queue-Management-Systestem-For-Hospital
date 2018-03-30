import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Q.css';
import Login from './components/login';
import { Card, Icon, Image, Button, Form, Segment, Header, Grid } from 'semantic-ui-react'
import Headerbar from './components/headerbar';
class test extends Component {
    state = {
        Username: '',
        Password: '',
        //validate
        errorUsername: { status: false, message: 'Please fill your Username again ' },
        errorPassword: { status: false, message: 'Please fill your Password again' }
    }
    submit = () => {
        var Username = this.state.Username
        var Password = this.state.Password
    }
    render() {
        console.log(this.state)
        return (

            <div>
                <Headerbar />
                <br />
                <br />
                <center>
                    <Header color='teal'>Login To Your Account</Header>
                </center>
                <br />
                <br />
                <center>

                    <Grid.Column style={{ maxWidth: '450px' }}>
                        <Segment color='blue'>
                            <Form>
                                <Form.Input fluid label='Username'
                                    placeholder='Username'
                                    type="text"
                                    required
                                    error={this.state.errorUsername.status}
                                    value={this.state.Username}
                                    onChange={(e, { value }) => this.setState({ Username: value })} />

                                <Form.Input fluid label='Password'
                                    placeholder='Password'
                                    type="password"
                                    required
                                    error={this.state.errorPassword.status}
                                    value={this.state.Password}
                                    onChange={(e, { value }) => this.setState({ Password: value })} />
                                {/* <Link to={'/Adminhome'} class="primary ui button">Sign in</Link> */}
                                    <Button type='submit'>Sign in</Button>

                            </Form>
                        </Segment>
                    </Grid.Column>

                </center>

            </div>


        );
    }
}
export default test;