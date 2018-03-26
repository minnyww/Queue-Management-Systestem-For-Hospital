import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Q.css';
import Login from './components/login';
import { Card, Icon, Image, Button, Form, Segment, Header,Grid } from 'semantic-ui-react'
import Headerbar from './components/headerbar';
class test extends Component {
    render() {
        return (

            <div>
                <Headerbar/>
                <br />
                <br />
                <center>
                    <Header color='teal'>Login To Your Account</Header>
                </center>
                <br />
                <br />
                <center>
                <Grid.Column style={{ maxWidth:'450px'}}>
                    <Segment  color='blue'>
                        <Form >

                            <Form.Input fluid label='Username' placeholder='Username' />

                            <Form.Input fluid label='Password' placeholder='Password' />


                            
                            <Link to={'/Adminhome'} class="primary ui button">Sign in</Link>


                        </Form>
                    </Segment>
                    </Grid.Column>

                </center>
                {/* <center>
                    <form class="ui form">

                        <div class="field" style={{ paddingRight: 40, paddingLeft: 40 }}>
                            <label>Username</label>
                            <input placeholder="Username" />
                        </div>
                        <div class="field" style={{ paddingRight: 40, paddingLeft: 40 }}>
                            <label>Password</label>
                            <input placeholder="Password" />
                        </div>

                        <Link to={'/Adminhome'} class="primary ui button">Sign in</Link>

                    </form>

                </center> */}

                {/* <div class="ui middle aligned center aligned grid">
                    <div class="column" style={{ maxWidth: '450px' }}>
                        <h1 class="ui teal image header">

                            <div class="content">
                               Log in to your account
                             </div>
                        </h1>
                        <form class="ui large form">
                            <div class="ui  segment">
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="user icon"></i><input name="username" placeholder="Username" type="text" />
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="lock icon"></i><input name="password" placeholder="Password" type="password" />
                                    </div>
                                </div>
                                <Link to={'/Adminhome'} class="primary ui button">Sign in</Link>
                            </div>

                        </form>
                        
                    </div>
                </div> */}
            </div>


        );
    }
}
export default test;