import React, { Component } from 'react';
import Headerbar from '.././components/headerbar'
import { Statistic } from "semantic-ui-react";
import DropdownQueue from '../components/Dropdown';

class addOrdeleteDepartment extends Component {
    state = {

    }
    componentWillMount = () => {

    }

    render() {

        return (
            <div >
                <Headerbar />
                <DropdownQueue />
            </div>
        );
    }
}



export default addOrdeleteDepartment;