import React, { Component } from 'react';
import Headerbar from '.././components/headerbar'

import axios from "./../lib/axios";
import swal from "sweetalert"

import DropdownQueue from '../components/Dropdown';
import FormManageDepartment from '../components/formManageDepartment';

import { List, Icon, Button, Form, Input } from 'semantic-ui-react'

class addOrdeleteDepartment extends Component {
    state = {
        nurseId: 0,
        departmentId: 0,
        userType: '',

        listDepartment: [],
        listRooms: [],
        listDoctors: [],

        departmentName: '',
        typeOfDepartment: '',

        Date: new Date(),

        roomNumber: 0,
        floor: 0,
        building: '',
        allDepartments: [{ key: "", text: "", value: "" }],
        departmentValueId: 0,
        patientLimit: 0,

        activeItem: 'department',
    }
    componentWillMount = async () => {
        const { empId, departmentId, type } = JSON.parse(localStorage.getItem('userData'))

        const allDepartment = await axios.get(`/getAllDepartment`);
        const allRoom = await axios.get(`/getAllRoom`);

        const date = this.pharseDate()
        let allDoctors = await axios.post(`/getAllDoctors`, {
            Date: this.state.Date.getDate(),
            day: date.day,
            month: date.month,
            year: date.year,
        });

        const departmentOption = this.dropdownDoctors(allDepartment);

        await this.getListDepartment()

        this.setState({
            nurseId: empId,
            departmentId,
            userType: type,
            listDepartment: allDepartment.data,
            listRooms: allRoom.data,
            listDoctors: allDoctors.data,
            allDepartments: departmentOption
        })
        console.log(this.state.listDoctors)

    }

    getDoctors = async () => {
        const date = this.pharseDate()
        let allDoctors = await axios.post(`/getAllDoctors`, {
            Date: this.state.Date.getDate(),
            day: date.day,
            month: date.month,
            year: date.year,
        });
        this.setState({
            listDoctors: allDoctors.data,
        })
    }

    pharseDate = () => {
        var month = new Array(
            "jan",
            "feb",
            "mar",
            "apr",
            "may",
            "jun",
            "jul",
            "aug",
            "sep",
            "oct",
            "nov",
            "dec"
        );
        var day = new Array(7);
        day[0] = "sun";
        day[1] = "mon";
        day[2] = "tue";
        day[3] = "wed";
        day[4] = "thu";
        day[5] = "fri";
        day[6] = "sat";

        var curr_date = this.state.Date.getDay();
        var curr_month = this.state.Date.getMonth();
        var curr_year = this.state.Date.getFullYear();
        return {
            day: day[curr_date],
            month: month[curr_month],
            year: curr_year,
        }
    }

    setField = (field, value) => {
        this.setState({ [field]: value });
    };

    getListDepartment = async () => {
        const allDepartment = await axios.get(`/getAllDepartment`);
        await this.setState({
            listDepartment: allDepartment.data
        })
        console.log(this.state.listDepartment)
    }

    getListRooms = async () => {
        const allRoom = await axios.get(`/getAllRoom`);
        await this.setState({
            listRooms: allRoom.data
        })
    }

    dropdownDoctors = allDepartment => {
        const department = allDepartment.data.map(data => ({
            key: data.departmentId,
            text: data.department,
            value: data.departmentId
        }));
        return department;
    };

    showAllDepartment = (i) => {
        let tmp = ""
        const datas = this.state.listDepartment
        tmp = datas.map((data, i) => (
            < List.Item key={i}>
                <List.Content floated='right'>
                    <Button color='red' size='mini'
                        onClick={() => {
                            this.deleteDepartment(i);
                        }}> Delete
                    </Button>
                </List.Content>
                <Icon name='building' color='blue' />
                <List.Content>
                    <List.Header>Department : {data.department}</List.Header>
                    <List.Header>Type : {data.type === 1 ? 'Department' : 'Lab'}</List.Header>
                </List.Content>
            </List.Item >
        ))
        return tmp
    }

    showAllRoom = (i) => {
        let tmp = ""
        const datas = this.state.listRooms
        tmp = datas.map((data, i) => (
            < List.Item key={i}>
                <List.Content floated='right'>
                    <Button color='red' size='mini'
                        onClick={() => {
                            this.deleteRoom(i);
                        }}> Delete
                    </Button>
                </List.Content>
                <Icon name='building' color='blue' />
                <List.Content>
                    <List.Header>Room Number : {data.roomId}</List.Header>
                    <List.Header>Department : {data.department}, Building : {data.building}</List.Header>
                </List.Content>
            </List.Item >
        ))
        return tmp
    }

    showAllDoctorsLimit = () => {
        let tmp = ''
        const datas = this.state.listDoctors
        tmp = datas.map((data, i) => (
            < List.Item key={i}>
                <List.Content floated='right'>
                    <Button color='green' size='mini'
                        onClick={() => {
                            this.updateLimit(i);
                        }}> Update
                    </Button>
                </List.Content>
                <List.Content floated='right'>
                    <Form.Field
                        style={{ width: '70px' }}
                        control={Input}
                        onChange={(e, { value }) => this.setField("patientLimit", value)}
                    />
                </List.Content>
                <Icon name='building' color='blue' />
                <List.Content>
                    <List.Header>Name : {data.firstname} {data.lastname}</List.Header>
                    <List.Header>Room : {data.roomId}</List.Header>
                    <List.Header>Limit : {data.patientLimit}</List.Header>
                </List.Content>
            </List.Item >
        ))
        return tmp
    }

    updateLimit = async (i) => {
        // console.log(this.state.listDoctors[i])
        let timetableId = this.state.listDoctors[i].timetableId
        console.log(this.state.patientLimit)
        await axios.post("/updateLimit", {
            timetableId: timetableId,
            patientLimit: this.state.patientLimit,
        })
        swal("Poof! Your Department has been deleted!", {
            icon: "success",
        });
        await this.getDoctors()
        console.log('Hi')
    }

    addDepartment = async () => {
        //addDepartment
        await axios.post("/addDepartment", {
            Department: this.state.departmentName,
            type: this.state.typeOfDepartment === 'Lab' ? 2 : 1
        })
        swal("Success!", `Add Successful`, "success");
        this.setState({
            departmentName: '',
            typeOfDepartment: ''
        })
        await this.getListDepartment()
        console.log('suc')
    }

    addRooms = async () => {
        //addDepartment
        await axios.post("/addRoom", {
            roomId: this.state.roomNumber,
            floor: this.state.floor,
            departmentId: this.state.departmentValueId,
            building: this.state.building,
        })
        swal("Success!", `Add Successful`, "success");
        this.setState({
            roomId: '',
            floor: '',
            departmentId: '',
            building: ''
        })
        await this.getListRooms()
        console.log('suc')
    }

    deleteDepartment = async (i) => {
        const departmentId = this.state.listDepartment[i].departmentId
        let swl = ''
        swl = swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await axios.delete(`/deleteDepartment/${departmentId}`)
                    await this.getListDepartment()
                    swal("Poof! Your Department has been deleted!", {
                        icon: "success",
                    });
                }

                console.log('succ del')
            });
    }

    deleteRoom = async (i) => {
        const roomId = this.state.listRooms[i].roomId
        console.log(roomId)
        let swl = ''
        swl = swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await axios.delete(`/deleteRoom/${roomId}`)
                    await this.getListRooms()
                    swal("Poof! Your Department has been deleted!", {
                        icon: "success",
                    });
                }

                console.log('succ del')
            });

    }

    setField = (field, value) => {
        this.setState({ [field]: value });
    };

    render() {
        console.log(this.state.departmentValueId)
        return (
            <div >
                <Headerbar />
                <DropdownQueue />
                <FormManageDepartment
                    //state
                    departmentName={this.state.departmentName}
                    typeOfDepartment={this.state.typeOfDepartment}
                    activeItem={this.state.activeItem}
                    roomNumber={this.state.roomNumber}
                    floor={this.state.floor}
                    building={this.state.building}
                    allDepartment={this.state.allDepartment}
                    departmentValueId={this.state.departmentValueId}
                    allDepartments={this.state.allDepartments}
                    listDoctors={this.state.listDoctors}

                    //method
                    setField={this.setField}
                    addDepartment={this.addDepartment}
                    addRooms={this.addRooms}
                    showAllDepartment={this.showAllDepartment}
                    showAllRoom={this.showAllRoom}
                    showAllDoctorsLimit={this.showAllDoctorsLimit}

                />
            </div>
        );
    }
}



export default addOrdeleteDepartment;