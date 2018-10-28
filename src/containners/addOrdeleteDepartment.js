import React, { Component } from 'react';
import Headerbar from '.././components/headerbar'

import axios from "./../lib/axios";
import swal from "sweetalert"

import DropdownQueue from '../components/Dropdown';
import FormManageDepartment from '../components/formManageDepartment';

import { List, Icon, Button } from 'semantic-ui-react'

class addOrdeleteDepartment extends Component {
    state = {
        nurseId: 0,
        departmentId: 0,
        userType: '',

        listDepartment: [],

        departmentName: '',
        typeOfDepartment: '',
    }
    componentWillMount = async () => {
        const { empId, departmentId, type } = JSON.parse(localStorage.getItem('userData'))

        const allDepartment = await axios.get(`/getAllDepartment`);
        console.log(allDepartment)

        await this.getListDepartment()
        this.setState({
            nurseId: empId,
            departmentId,
            userType: type,
            listDepartment: allDepartment.data
        })
        console.log(this.state.listDepartment)
    }

    setField = (field, value) => {
        this.setState({ [field]: value });
    };

    getListDepartment = async () => {
        const allDepartment = await axios.get(`/getAllDepartment`);
        console.log(allDepartment)
        await this.setState({
            listDepartment: allDepartment.data
        })
        console.log(this.state.listDepartment)
    }

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
                    <List.Header>{data.department}</List.Header>
                    <List.Header>{data.type === 1 ? 'Department' : 'Lab'}</List.Header>
                </List.Content>
            </List.Item >
        ))
        return tmp
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

    deleteDepartment = async (i) => {
        const departmentId = this.state.listDepartment[i].departmentId
        console.log(departmentId)
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
                }
                swal("Poof! Your Department has been deleted!", {
                    icon: "success",
                });
                console.log('succ del')
            });
    }

    render() {
        console.log(this.state.departmentName, this.state.typeOfDepartment)
        return (
            <div >
                <Headerbar />
                <DropdownQueue />
                <FormManageDepartment
                    //state
                    departmentName={this.state.departmentName}
                    typeOfDepartment={this.state.typeOfDepartment}

                    //method
                    setField={this.setField}
                    addDepartment={this.addDepartment}
                    showAllDepartment={this.showAllDepartment}
                />
            </div>
        );
    }
}



export default addOrdeleteDepartment;