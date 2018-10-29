import React, { Component } from 'react';
import logo1 from './../img/logo1.png';
import backgroundLogin from './../img/backgroundLogin.png'
import { Card, Icon, Image, Button, Form, Segment, Header } from 'semantic-ui-react'
import Login from './../components/login';
class Homeuser extends Component {
    render() {
        return (
            <div style={{ backgroundImage: 'url(https://www.picz.in.th/images/2018/10/11/kum9gq.png)', height: '700px' }}>
                <br />
                <br />
                <img src={logo1} className="ui small centered image" />
                <br />
                <br />
                <center>
                    <Header color='blue'>Welcome To Hospital</Header>
                </center>
                <br />
                <br />
                <Login />
            </div>
        );
    }
}



export default Homeuser;