import React, { Component } from 'react';
import logo1 from './img/logo1.png';
import './css/home.css';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Card, Icon, Image, Button, Form, Segment,Header} from 'semantic-ui-react'
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
                <Login/>
                {/* <br />
                
                
                <br />
                <br />
                <br />
                <br />
                <form class="ui form ">

                    <div class="field" style={{ paddingRight: 40, paddingLeft: 40 }}>
                        <center><label>HN</label></center>
                        <input placeholder="HN Number" />
                    </div>
                    <div class="field" style={{ paddingRight: 40, paddingLeft: 40 }}>
                        <center><label>Tel Number</label></center>
                        <input placeholder="Phone Number" />
                    </div>
                    <center>
                        <br />
                        <br />
                        <Link to={'/App'} class="primary ui button">Enter</Link>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        {/* ตรงนี้ลิ้งไปหน้าแอดมิน ชั่วคราวเด้อ 
                        <Link to={'/Admin'} class="primary ui button" style={{ marginBottom: '2%' }}>For Admin</Link>
                    </center>
                    <Link to={'/App'} class="primary ui button">Enter</Link>           
                    <Link to={'/Admin'} class="primary ui button">Admin</Link>
                </form> */}

                {/* <div class="ui middle aligned center aligned grid">
                    <div class="column" style={{ maxWidth: '450px' }}>
                        <h1 class="ui teal image header">

                            <div class="content">
                                Welcome To QHospital
                             </div>
                        </h1>
                        <form class="ui large form">
                            <div class="ui  segment">
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="user icon"></i><input name="hn" placeholder="HN" type="text" />
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="lock icon"></i><input name="phonenumber" placeholder="Phone Number" type="text" />
                                    </div>
                                </div>
                                <Link to={'/App'} class="primary ui button">Enter</Link>
                                <br/>
                                <br/>
                                <Link to={'/Admin'} class="primary ui button">Admin</Link>
                            </div>

                        </form>
                        
                    </div>
                </div>
                
             */}
             
             </div>
                
                
                
                
                        );
                
                    }
                
                }
                
                
                
export default Homeuser;