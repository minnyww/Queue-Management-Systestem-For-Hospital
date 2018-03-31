import React, { Component } from 'react';
import logo1 from './img/logo1.png';
import './css/home.css';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Card, Icon, Image, Button, Form, Segment, Header } from 'semantic-ui-react'
import ModalExampleShorthand from './components/modal';
import Login from './components/login';
class Homeuser extends Component {
    render() {
        return (

            <div class="">
                <br />
                <br />
                <img src={logo1} class="ui small centered image" />
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