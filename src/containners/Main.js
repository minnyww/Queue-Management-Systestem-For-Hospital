import React, { Component } from 'react';
import Headerbar from '.././components/headerbar'
import MainButton from '../components/mainButton';
import { Statistic, Label, Responsive, Segment, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from './../img/drug.png'

class Main extends Component {
    state = {
        loginName: '',
        nurseData: []
    }
    componentWillMount = () => {
        const userData = JSON.parse(localStorage.getItem('userData'))

        this.setState({
            loginName: userData.firstname + ' ' + userData.lastname,
            nurseData: userData
        })
    }

    welcomeName = () => {
        let tmp = ' '
        return tmp = <Statistic size='mini'>
            <Statistic.Value>Welcome : {this.state.loginName}</Statistic.Value>
        </Statistic>
    }

    logOut = () => {
        localStorage.removeItem('userData');
    }

    render() {
        return (
            <div>
                <Responsive  {...Responsive.onlyComputer}>
                    <div style={{
                        backgroundImage: 'url(https://www.picz.in.th/images/2018/10/11/kum9gq.png)',
                        backgroundRepeat: 'repeat',
                        height: '100vh',
                    }}>
                        <Headerbar />
                        <center>
                            {this.welcomeName()} <Link to={"/Admin"}>
                                <Label color='red' style={{ marginLeft: '5px' }}
                                    onClick={() => this.logOut()}
                                >Logout
                        </Label>
                            </Link>
                            <MainButton
                                nurseData={this.state.nurseData}
                            />
                        </center>
                    </div>
                </Responsive>
                <Responsive  {...Responsive.onlyTablet}>
                    <div style={{
                        backgroundImage: 'url(https://www.picz.in.th/images/2018/10/11/kum9gq.png)',
                        backgroundRepeat: 'repeat', height: '100vh',
                    }}>
                        <Headerbar />
                        <center>
                            {this.welcomeName()} <Link to={"/Admin"}>
                                <Label color='red' style={{ marginLeft: '5px' }}
                                    onClick={() => this.logOut()}
                                >Logout
                        </Label>
                            </Link>
                            <MainButton
                                nurseData={this.state.nurseData}
                            />
                        </center>
                    </div>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <Headerbar />
                    <center>
                        <Card>
                            <Image src={logo} />
                            <Card.Content>
                                <Card.Header>Don't Support</Card.Header>
                                <Card.Meta>Queue Management System</Card.Meta>
                                <Card.Description>Don't Support on mobile screen</Card.Description>
                            </Card.Content>
                            <Card.Content extra>

                            </Card.Content>
                        </Card>
                    </center>
                </Responsive>
            </div >
        );
    }
}



export default Main;