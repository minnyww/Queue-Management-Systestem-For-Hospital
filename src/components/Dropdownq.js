import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
class Dropdownq extends Component {

    render() {
        return (
            <div>
                <Menu compact>
                    <Dropdown text='Queue' options={options} simple item />
                    <Dropdown text='Department' options={department} simple item />
                    <Dropdown text='Room' options={room} simple item />
                </Menu>
            </div>


        );
    }
}
const options = [
    { key: 1, text: 'Queue', value: 1 },
    { key: 1, text:  <Link to={'/Adminfilter'}>คัดกรองผู้ป่วย</Link>, value: 2 },
    
]
const department = [
    { key: 1, text: 'กุมารเวช', value: 1 },
    { key: 1, text: 'อายุรกรรม', value: 2 },
    { key: 1, text: 'กระดูก', value: 3 },
    
]
const room = [
    { key: 1, text: 'A01', value: 1 },
    { key: 1, text: 'A02', value: 2 },
    { key: 1, text: 'A03', value: 3 },
    
]
export default Dropdownq;