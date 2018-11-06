import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../css/Q.css';
import Login from './../components/login';
import { Card, Icon, Image, Button, Form, Segment, Header, Grid, Message, Label } from 'semantic-ui-react'
import Headerbar from './../components/headerbar';
import logo1 from './../img/logo1.png';
import axios from './../lib/axios'
class Admin extends Component {
    state = {
        Username: '',
        Password: '',
        HN: '',
        //validate
        errorUsername: { status: false, message: '' },
        errorPassword: { status: false, message: '' },


    }

    submit = async () => {
        var Username = this.state.Username
        var Password = this.state.Password
        var check = false;

        if (this.state.Username.length <= 10) {
            this.setState({ errorUsername: { status: false, message: '' } })
            check = true
        }


        if (check === true) {
            var data = await axios.post(`/checkUsername`, {
                Username: this.state.Username,
                Password: this.state.Password
            })
            // console.log(data.data)
            if (data.data.length === 0) {
                this.setState({ errorUsername: { status: true, message: '' } })

            } else {
                // console.log(data.data[0])
                localStorage.setItem('userData', JSON.stringify(data.data[0]))
                this.props.history.push({
                    pathname: '/Main'
                })
            }
        }
    }
    render() {
        return (
            <div style={{ backgroundImage: 'url(https://www.picz.in.th/images/2018/10/11/kum9gq.png)', 
            height: '100vh' }}>
                <Headerbar />
                <br />
                <br />
                <center>
                    <Header color='teal'>Login To Your Account</Header>
                    <img src={logo1} className="ui small centered image" />
                </center>
                <br />
                <br />
                <center>
                    <Grid.Column style={{ maxWidth: '450px' }}>
                        <Segment color='blue'>
                            <Form onSubmit={this.submit}>
                                <Form.Input fluid label='Username'
                                    name="Username"
                                    placeholder='Username'
                                    type="text"
                                    required
                                    error={this.state.errorUsername.status}
                                    value={this.state.Username}
                                    onChange={(e, { value }) => this.setState({ Username: value })} />
                                <Form.Input fluid label='Password'
                                    name="Password"
                                    placeholder='Password'
                                    type="password"
                                    required
                                    value={this.state.Password}
                                    onChange={(e, { value }) => this.setState({ Password: value })} />
                                <Message negative hidden={!this.state.errorUsername.status}>
                                    Username or Password does not match
                                </Message>
                                <Button color='blue' type='submit' >Sign in</Button>
                            </Form>
                        </Segment>
                    </Grid.Column>

                </center>

            </div>


        );
    }
}
export default Admin;