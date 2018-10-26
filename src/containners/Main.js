import React, { Component } from 'react';
import Headerbar from '.././components/headerbar'
import MainButton from '../components/mainButton';
import { Statistic, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
class Main extends Component {
    state = {
        loginName: ''
    }
    componentWillMount = () => {
        const userData = JSON.parse(localStorage.getItem('userData'))

        this.setState({
            loginName: userData.firstname + ' ' + userData.lastname
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
        console.log(this.state.loginName)
        return (
            <div style={{ backgroundImage: 'url(https://www.picz.in.th/images/2018/10/11/kum9gq.png)' }}>
                <Headerbar />
                <center>
                    {this.welcomeName()} <Link to={"/Admin"}>
                        <Label color='red' style={{ marginLeft: '5px' }}
                            onClick={() => this.logOut()}
                        >Logout
                        </Label>
                    </Link>
                    <MainButton />
                </center>
            </div>
        );
    }
}



export default Main;