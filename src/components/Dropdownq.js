import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
class Dropdownq extends Component {




    handleChange(e) {
        this.props.onChange(e.target.value);
    }


    render() {
        return (
            <div>
                <Menu compact>
                    <Dropdown.Menu>
                        
                            <Dropdown text='Queue' options={options} simple item />
                            <Dropdown text='Department' options={department} simple item />
                            <Dropdown text='Room' options={room} simple item onChange={this.handleChange.bind(this)} />

                        
                    </Dropdown.Menu>
                </Menu>
            </div>


        );
    }

}
const options = [
    { key: 1, text: 'Queue', value: 1 },
    { key: 2, text: <Link to={'/Adminfilter'}>คัดกรองผู้ป่วย</Link>, value: 2 },
    { key: 3, text: 'Appointment', value: 3 },

]
const department = [
    { key: 4, text: 'กุมารเวช', value: 4 },
    { key: 5, text: 'อายุรกรรม', value: 5 },
    { key: 6, text: 'กระดูก', value: 6 },

]
const room = [
    { key: 7, text: 'A01', value: 7 },
    { key: 8, text: 'A02', value: 8 },
    { key: 9, text: 'A03', value: 9 },

]
export default Dropdownq;