import React, { Component } from 'react';
import  { Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Headerbar from './components/headerbar';
import Search from './components/Search';
class Adminfilter extends Component {

    render() {
        return (
            <div>
                <Headerbar/>
               
                <Search/>
               
            </div>


        );
    }
}

export default Adminfilter;