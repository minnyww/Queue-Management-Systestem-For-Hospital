import React, { Component } from 'react';
import Homeuser from './containners/Homeuser';
import App from './App';
import Admin from './containners/Admin';
import Adminhome from './containners/Adminhome';
import Adminfilter from './../src/bin/Adminfilter';
import Home from './containners/Home';
import Appointment from './containners/Appointment'
import Main from './containners/Main'
import Timetable from './containners/timetable'
import AddOrDeletetDepartment from './containners/addOrdeleteDepartment'
import NotFound from './containners/NotFound'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

export default class Root extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Homeuser} />
                    <Route path="/App" component={App} />
                    <Route path="/Admin" component={Admin} />
                    <Route path="/Adminhome" component={Adminhome} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Adminfilter" component={Adminfilter} />
                    <Route path="/Homeuser" component={Homeuser} />
                    <Route path="/Homeuser" component={Homeuser} />
                    <Route path="/Appointment" component={Appointment} />
                    <Route path="/Main" component={Main} />
                    <Route path="/Timetable" component={Timetable} />
                    <Route path="/AddOrDeleteDepartment" component={AddOrDeletetDepartment} />
                    <Route path="*" component={NotFound} />
                </Switch>


            </Router>



        );




    }



};