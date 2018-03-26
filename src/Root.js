import React, { Component } from 'react';
import Homeuser from './Homeuser';
import App from './App';
import Admin from './Admin';
import Adminhome from './Adminhome';
import Adminfilter from './Adminfilter';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

export default class Root extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Homeuser}/>
                    <Route path="/App" component={App}/>
                    <Route path="/Admin" component={Admin}/>
                    <Route path="/Adminhome" component={Adminhome}/>
                    <Route path="/Adminfilter" component={Adminfilter}/>
                </Switch>
            
            
            </Router>



        );




    }



};