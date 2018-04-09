import React, { Component } from 'react';
import  { Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Headerbar from './../components/headerbar';
import SearchPatient from './../components/Search';
class Adminfilter extends Component {

    render() {
        return (
            <div>
                <Headerbar/>
               
                <SearchPatient/>
               
            </div>


        );
    }
}

export default Adminfilter;