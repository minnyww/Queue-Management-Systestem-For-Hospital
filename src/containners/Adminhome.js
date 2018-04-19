import React, { Component } from 'react';
import DropdownQueue from './../components/Dropdown';
import ListQueue from './../components/listQueue'
import './../css/Q.css'
import Headerbar from './../components/headerbar';
import axios from './../lib/axios'
import * as moment from 'moment';
import { Segment, Label, Icon, Message, Header } from 'semantic-ui-react'
import Modal from 'react-modal';
import _ from 'underscore'


class Adminhome extends Component {

    state = {
        showModal: false,
        modalIsOpen: false,
        roomId: 0,
        type: '', //คัดกรอง หรือผู้ป่วยนัด
        nurseId: 0,
        departmentId: 0,
        queueId: 0,
        Date: '2018/04/9',
        statusId: 1,
        HN: '',
        doctorId: 0,
        forward: null,
        queues: [],
        allPatient: [],
        errorHN: '',
        errorGetName: '',
        errorAdd: '',
        namePatient: '',
        lastNamePatient: '',
        //Dropdown.js
        departments: [{ key: '', text: '', value: '' }],
        rooms: [{ key: '', text: '', value: '' }],
        currentQueue: {}
    }


    componentWillMount = async () => {
        this.setState({
            nurseId: this.props.location.state.nurseId,
            departmentId: this.props.location.state.departmentId,


        })

        var datas = await axios.get(`/getQueue`);
        var dataPatient = await axios.get(`/getPatient`);
        Modal.setAppElement('body');

        const departments = await axios.get(`/getDepartment/${this.state.departmentId}`)
        const departmentsOption = departments.data.map(department => ({
            key: department.departmentId,
            text: department.department,
            value: department.departmentId
        }))


        const rooms = await axios.get(`/getRoom/${this.state.departmentId}`)
        const roomsOption = rooms.data.map(room => ({
            key: room.roomId,
            text: room.roomId,
            value: room.roomId
        }))


        this.setState({
            departments: departmentsOption,
            rooms: roomsOption,
            allPatient: dataPatient.data,
            queues: datas.data,
            roomId:roomsOption[0].value

        })
    }

    setField = (field, value) => {
        console.log(field + ' / ' + value)
        this.setState({ [field]: value })
    }


    getDoctorId = async () => {
        var doctors = await axios.get(`/getDoctor/${this.state.roomId}`);
        this.setState({
            doctorId: doctors.data[0].empId

        })
    }

    //
    // checkHNDepartment = async () => {
    //     var checkHNDepartments = await axios.get(`/checkHNatDepartment/${this.state.departmentId}`)
    //     const checks = checkHNDepartments.data.map(check =>(
    //         check.HN

    //     ))
    //     console.log('@@@@@@'+    checks)
    // }



    //Add เข้าคิว
    addQueue = async (e) => {
        // e.preventdefault()
        // alert("TEST")

        
        var checkHNDepartments = await axios.get(`/checkHNatDepartment/${this.state.departmentId}`)
        const checks = checkHNDepartments.data.filter(check =>

            check.HN === this.state.HN
        )
        console.log(checks)

        if (checks.length === 0) {

            await axios.post('/addPatientQ', {
                roomId: this.state.roomId,
                Date: this.state.Date,
                statusId: this.state.statusId,
                HN: this.state.HN,
                doctorId: this.state.doctorId,
                forward: this.state.forward,
                nurseId: this.state.nurseId
                //insert แอทริบิ้วใน ตาราง Queue

            })
            console.log('add เข้า db')
            this.setState({modalIsOpen:false})
        } else {
            this.setState({ errorAdd: { status: true, message: 'Cannot Add HN To Queue' } })
            console.log('ข้อมูลซ้ำ')
        }
        this.getQueue()



    }

    showPatient = () => {

        let now = moment().startOf('hour').fromNow();
        const data = this.state.queues
        const tmp = data
            .filter(queue => (
                queue.roomId === this.state.roomId
            ))
            .map(queue => (
                <Segment >
                    {queue.firstName} {queue.lastName}<br />
                    Room : {queue.roomId}<br />
                    แผนก : {queue.department}
                    <Label attached='bottom right' color='blue'>
                        <Icon name='time' />{now}
                    </Label>
                </Segment>
            ))
        return tmp

        console.log(this.rooms)
    }


    validateHN = async () => {
        if (this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
            this.getName(this.state.HN)
        } else if (!this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
            this.setState({ errorHN: { status: true, message: 'HN Does not match' } })
        }
    }

    getName = (HN) => {
        const patient = this.state.allPatient.filter(data => data.HN === HN)[0]
        if (patient) {
            this.setState({
                namePatient: patient.firstName,
                lastNamePatient: patient.lastName,
                errorHN: { status: false, message: '' }
            })
        } else {
            this.setState({
                namePatient: '',
                lastNamePatient: '',
                errorGetName: { status: true, message: '' }
            })
        }
    }
    getName = (HN) => {
        const patient = this.state.allPatient.filter(data => data.HN === HN)[0]
        if (patient) {
            this.setState({
                namePatient: patient.firstName,
                lastNamePatient: patient.lastName,
                errorHN: { status: false, message: '' }
            })
        } else {
            this.setState({
                namePatient: '',
                lastNamePatient: '',
                errorGetName: { status: true, message: '' }
            })
        }
    }
    //เอาคิวออกมาก 
    getQueue = async () => {
        const datas = await axios.get(`/getQueue`);
        this.setState({
            queues: datas.data, msg: '',
            // statusId : datas.data
        })
    }

    //onclick to call patient 
    callPatient = async () => {
        console.log('call')
        // await axios.post('/updateQueue', {
        //     roomId: this.state.roomId,
        //     Date: this.state.Date,
        //     statusId: this.state.statusId,
        //     HN: this.state.HN,
        //     doctorId: this.state.doctorId,
        //     forward: this.state.forward,
        //     nurseId: this.state.nurseId
        //     //insert แอทริบิ้วใน ตาราง Queue

        // })
        var data = {}; 
        if (this.state.currentQueue === {}) {
            data = {
                HN:  this.state.queues[0].HN,
                previousHN : ''
            }
        }else {
            data = {
                HN:  this.state.queues[0].HN,
                previousHN : this.state.currentQueue.HN
            }
        }

        await axios.post('/updateQueue', data)

        this.setState({
            currentQueue: this.state.queues[0]
        })
        this.getQueue()
        console.log('คิวปัจจุบัน')
        console.log(this.state.currentQueue)


    }

    //show current queue index[0] and update status 
    getPatientName = () => {
        //queues
        //currentQueue
        const data = this.state.currentQueue;
        return (
            <Segment id="boxshow" >
                <Header as='h2' textAlign='center'>
                    <Icon name='user circle' />
                    {data.firstName} {data.lastName}
                </Header>
                <Header as='h3' textAlign='center' >
                    <Icon name='numbered list' />
                    HN :{data.HN}
                </Header>
                <Header as='h3' textAlign='center' >
                    <Icon name='arrow right' />
                    Room : {data.roomId}
                </Header>
                <Header as='h3' textAlign='center' >
                    <Icon name='first aid' />
                    แผนก : {data.department}
                </Header>
            </Segment>
        )


    }





    render() {

        console.log(this.state)
        return (
            <div>

                <Headerbar />
                
                {/* dropdown ตรงนี้ Dropdownq.js*/}
                {/* กดละต้องเปลี่ยน content ด้วย Dropdownq.js*/}
                <DropdownQueue
                    roomId={this.state.roomId}
                    departmentId={this.state.departmentId}
                    type={this.state.type}
                    setField={this.setField}
                    departments={this.state.departments}
                    rooms={this.state.rooms}
                    getDoctorId={this.getDoctorId}
                    errorAdd={this.state.errorAdd}
                />
                <br />
                <ListQueue
                    HN={this.state.HN}
                    setField={this.setField}
                    addQueue={this.addQueue}
                    validateHN={this.validateHN}
                    allPatient={this.state.allPatient}
                    queues={this.state.queues}
                    showPatient={this.showPatient}
                    validateHN={this.validateHN}
                    modalIsOpen={this.state.modalIsOpen}
                    errorHN={this.state.errorHN}
                    errorGetName={this.state.errorGetName}
                    namePatient={this.state.namePatient}
                    lastNamePatient={this.state.lastNamePatient}
                    showModal={this.state.showModal}
                    getQueue={this.getQueue}
                    getPatientName={this.getPatientName}
                    callPatient={this.callPatient}
                    errorAdd={this.state.errorAdd}


                />
                <br />
                <br />
            </div>
        );
    }
}


export default Adminhome;