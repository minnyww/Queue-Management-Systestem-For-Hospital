import React, { Component } from 'react';
import logo1 from './../img/logo1.png';
import './../css/home.css';
import Modal from 'react-modal';
import { Card, Icon, Image, Button, Form, Segment, Header } from 'semantic-ui-react'
import Login from './../components/login';
import axios from './../lib/axios'
class Homeuser extends Component {

    state = {
        HN : ''
    }


    componentWillMount = async () => {
        this.setState({
        //   HN: this.props.location.state.HN,
        });
    }
    render() {
        return (

            <div>
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