import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from './../lib/axios'
class Dropdownq extends Component {
    state={
        departments:[{key:'',text:'',value:''}],
        rooms:[{key:'',text:'',value:''}],
    }
    async componentDidMount() {
        const departments =  await axios.get(`/getDepartment/${this.props.departmentId}`)
        const departmentsOption = departments.data.map(department => ({
            key:department.departmentId,
            text:department.department,
            value:department.departmentId
        }))

        const rooms =  await axios.get(`/getRoom/${this.props.departmentId}`)
        const roomsOption = rooms.data.map(room => ({
            key:room.roomId,
            text:room.roomId,
            value:room.roomId
        }))

        this.setState({departments :departmentsOption , rooms:roomsOption })

    }

    // handleChange(e) {
    //     this.props.room(e.target.value);
    // }

    render() {
        return (
            <div>
                <Menu compact>
                    <Dropdown.Menu>
                            <Dropdown 
                                placeholder='Queue'
                                options={type} 
                                simple item 
                                value={this.props.type} />
                            <Dropdown 
                                placeholder='Department'
                                options={this.state.departments} 
                                simple item 
                                value={this.props.departmentId}
                            />
                            <Dropdown 
                                placeholder='Room' 
                                options={this.state.rooms} 
                                simple item  
                                value={this.props.roomId}
                                onChange={(e,{value})=>this.props.setField('roomId',value)}/>
                    </Dropdown.Menu>
                </Menu>
            </div>


        );
    }

}
const type = [
    { key: 1, text: 'Queue', value: 'Queue' },
    { key: 2, text: <Link to={'/Adminfilter'}>คัดกรองผู้ป่วย</Link>, value: 'คัดกรองผู้ป่วย' },
    { key: 3, text: 'Appointment', value: 'Appointment' },
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