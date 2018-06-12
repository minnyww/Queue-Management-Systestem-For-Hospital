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
    //กดเลือกห้องอีกทีแล้ว แผนกหาย
    //check department add ข้ามแผนกไม่ได้ call ข้ามแผนกไม่ได้ 
    state = {
        //Adminhome

        statusId: 1,
        Date: new Date(),
        forward: null,
        nurseId: 0,
        allPatient: [],
        currentQueue: {},
        //queueId: 0,

        //ListQueue
        showModal: false,
        modalIsOpen: false,
        roomId: 0,
        departmentId: 0,
        HN: '',
        doctorId: 0,
        queues: [],
        errorHN: '',
        errorGetName: '',
        errorAdd: '',
        namePatient: '',
        lastNamePatient: '',
        allDepartment: [{ key: '', text: '', value: '' }],
        forwardId : 0,
        forwardLabId : 0,
        // typeDepartmentSelect : false,
        // typeLabSelect : false,
        typeForward : '',


        //Dropdown.js
        departments: [{ key: '', text: '', value: '' }],
        doctors: [{ key: '', text: '', value: '' }],
        type: '',
        doctorList: [],
        //rooms: [{ key: '', text: '', value: '' }],




    }



    componentWillMount = async () => {
        this.setState({
            nurseId: this.props.location.state.nurseId,
            departmentId: this.props.location.state.departmentId,


        })

        var datas = await axios.get(`/getQueue`);
        var dataPatient = await axios.get(`/getPatient`);
        Modal.setAppElement('body');
        console.log(datas)
        
        const allDepartment = await axios.get(`/getDepartment`)
        const allDepartmentOption = allDepartment.data.map(department => ({
            key: department.departmentId,
            text: department.department,
            value: department.departmentId
        }))

        const allLab = await axios.get(`/getLab`)
        const allLabOption = allLab.data.map(Lab => ({
            key: Lab.departmentId,
            text: Lab.department,
            value: Lab.departmentId
        }))

        const departments = await axios.get(`/getDepartment/${this.state.departmentId}`)
        const departmentsOption = departments.data.map(department => ({
            key: department.departmentId,
            text: department.department,
            value: department.departmentId
        }))


        // const rooms = await axios.get(`/getRoom/${this.state.departmentId}`)
        // const roomsOption = rooms.data.map(room => ({
        //     key: room.roomId,
        //     text: room.roomId,
        //     value: room.roomId
        // }))
        //

        var month = new Array(
            "jan", "feb", "mar",
            "apr", "may", "jun",
            "jul", "aug", "sep",
            "oct", "nov", "dec");
        var day = new Array(7);
        day[0] = "sun";
        day[1] = "mon";
        day[2] = "tue";
        day[3] = "wed";
        day[4] = "thu";
        day[5] = "fri";
        day[6] = "sat";

        var curr_date = this.state.Date.getDay();
        console.log(day[curr_date])

        var curr_month = this.state.Date.getMonth();
        console.log(month[curr_month])

        var curr_year = this.state.Date.getFullYear();
        console.log(curr_year)

        const doctors = await axios.post(`/getListDoctor`, {
            day: day[curr_date],
            month: month[curr_month],
            year: curr_year,
            departmentId: this.state.departmentId


        })
        console.log(doctors.data)

        const doctorsOption = doctors.data.map(doctor => ({

            key: doctor.doctorId,
            text: doctor.firstname + '  ' + doctor.lastname + ' (ห้อง ' + doctor.roomId + ' ) ',
            value: doctor.doctorId
        }))


        this.setState({
            doctorList: doctors.data,
            departments: departmentsOption,
            allDepartment : allDepartmentOption,
            allLab : allLabOption,
            // rooms: roomsOption,
            doctors: doctorsOption,

            allPatient: dataPatient.data,
            queues: datas.data,
            roomId: doctors.data[0].roomId,
            doctorId: doctorsOption[0].value
        })
        console.log(this.state.queues)

    }

    setField = (field, value) => {

        this.setState({ [field]: value })
    }

    chooseDoctor = async (value) => {
        const findRoom = this.state.doctorList.filter(doctor =>
            doctor.doctorId === value
        )
            .map(doctor => (doctor.roomId))

        const currentQinThisRoom = await axios.get(`/currentQwithDoctor/${value}`)
        console.log('currentQinThisRoom', currentQinThisRoom.data[0])
        this.setState({
            doctorId: value,
            roomId: findRoom[0],
            currentQueue: currentQinThisRoom.data.length === 0 ? {} : currentQinThisRoom.data[0]
        })
    }




    //Add เข้าคิว
    addQueue = async (e) => {
        // e.preventdefault()
        const min = this.state.queues.filter(queue => {
            queue.HN === this.state.HN
        }
        )
        if (min.length === 0) {
            var month = new Array(
                "jan", "feb", "mar",
                "apr", "may", "jun",
                "jul", "aug", "sep",
                "oct", "nov", "dec");
            var day = new Array(7);
            day[0] = "sun";
            day[1] = "mon";
            day[2] = "tue";
            day[3] = "wed";
            day[4] = "thu";
            day[5] = "fri";
            day[6] = "sat";

            var curr_date = this.state.Date.getDay();
            console.log(day[curr_date])

            var curr_month = this.state.Date.getMonth();
            console.log(month[curr_month])

            var curr_year = this.state.Date.getFullYear();
            console.log(curr_year)



            var checkHNDepartments = await axios.get(`/checkHNatDepartment/${this.state.departmentId}`)
            const checks = checkHNDepartments.data.filter(check =>
                check.HN === this.state.HN
            )
            console.log('check ', checks)

            if (checks.length === 0) {
                var time = moment().toString()
                // var timeFormat = (hours*60*60)+(mins*60)+sec
                console.log(time)
                await axios.post('/addPatientQ', {
                    roomId: this.state.roomId,
                    date: this.state.Date,
                    day: day[curr_date],
                    month: month[curr_month],
                    year: curr_year,
                    timeFormat: time,
                    statusId: this.state.statusId,
                    HN: this.state.HN,
                    doctorId: this.state.doctorId,
                    forward: this.state.forward,
                    nurseId: this.state.nurseId,
                    departmentId: this.state.departmentId
                })
                this.setState({ modalIsOpen: false, errorAdd: { status: false, message: '' } })
            } else {
                this.setState({ errorAdd: { status: true, message: 'Cannot Add HN To Queue' } })

            }
            this.getQueue()
            console.log('add เข้า db')
        } else {
            console.log('ซ้ำ')
        }

    }
    // checkQueues = () => {
    //     if(queues === 0){
    //         <Segment >
    //                  <br />
    //                 Room : <br />
    //                 แผนก : 
    //                 {/* เวลา : {queue.timeStart + queue.avgtime * 60000} */}
    //                 <Label attached='bottom right' color='blue'>
    //                     <Icon name='time' />
    //                 </Label>
    //             </Segment>
    //     }else {
    //         <Segment >
    //                 {queue.firstName} {queue.lastName}<br />
    //                 Room : {queue.roomId}<br />
    //                 แผนก : {queue.department}
    //                 {/* เวลา : {queue.timeStart + queue.avgtime * 60000} */}
    //                 <Label attached='bottom right' color='blue'>
    //                     <Icon name='time' />
    //                 </Label>
    //             </Segment>
    //     }
    // } 

    showPatient = () => {

        //let now = moment().startOf('hour').fromNow();
        // const date = moment().fromNow()


        const data = this.state.queues
        const tmp = data
            .filter(queue => (
                queue.roomId === this.state.roomId

            ))

            .map(queue => (

                <Segment >
                    Queue : {queue.queueId} <br />
                    Name : {queue.firstName} {queue.lastName}<br />
                    Room : {queue.roomId}<br />
                    department : {queue.department}
                    {/* เวลา : {queue.timeStart + queue.avgtime * 60000} */}
                    <Label attached='bottom right' color='blue'>
                        <Icon name='time' />{queue.queueId * queue.avgtime} Min
                    </Label>
                </Segment>
            ))

        return tmp


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
                namePatient: patient.firstName + ' ',
                lastNamePatient: patient.lastName,
                errorHN: { status: false, message: '' },
                errorGetName: { status: false, message: '' }
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


    callPatient = async () => {
        var data = {};
        var tmp = null;
        for (let i = 0; i < this.state.queues.length; i++) {
            if (this.state.queues[i].roomId === this.state.roomId) {
                tmp = this.state.queues[i];
                break;
            }
        }
        console.log(tmp)
        var check = false;
        if (this.state.currentQueue.firstName === undefined) {
            //ไม่มีคิวปัจจุบัน
            console.log('ไม่มีคิวปัจจุบัน')
            if (tmp === null) {
                //ในห้องนี้ไม่มีคิว
                console.log('cannot')
            } else {
                //ในห้องนี้มีคิว
                data = {
                    HN: tmp.HN,
                    previousHN: ''
                }
                check = true;
                console.log('ห้อง' + this.state.roomId + ' /' + tmp.HN)
            }
        } else {
            // มีคิวปัจจุบัน
            console.log('มีคิวปัจจุบัน')
            if (tmp === null) {
                //ในห้องนี้ไม่มีคิว
                console.log('ไม่มีคิว')
                data = {
                    HN: '',
                    previousHN: this.state.currentQueue.HN
                }
            } else {
                //ในห้องนี้มีคิว
                check = true;
                console.log('มีคิว')
                data = {
                    HN: tmp.HN,
                    previousHN: this.state.currentQueue.HN
                }
            }
        }

        await axios.post('/updateQueue', data)
        console.log('สรุปมีคิวปัจจุบันไหม ', tmp)
        this.setState({
            currentQueue: check === true ? tmp : {}
        })
        this.getQueue()



    }


    getPatientName = () => {
        console.log(this.state.currentQueue)
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
    // ยังทำไม่เสร็จจ
    forward = () => {
        var data = {};
        var tmp = null;
        for (let i = 0; i < this.state.queues.length; i++) {
            if (this.state.queues[i].roomId === this.state.roomId) {
                tmp = this.state.queues[i];
                break;
            }
        }
        console.log(tmp)
        var check = false;
        if (this.state.currentQueue.firstName === undefined) {
            //ไม่มีคิวปัจจุบัน
            console.log('ไม่มีคิวปัจจุบัน')
            if (tmp === null) {
                //ในห้องนี้ไม่มีคิว
                console.log('cannot')
            } else {
                //ในห้องนี้มีคิว
                data = {
                    HN: tmp.HN,
                    previousHN: ''
                }
                check = true;
                console.log('ห้อง' + this.state.roomId + ' /' + tmp.HN)
            }
        } else {
            // มีคิวปัจจุบัน
            console.log('มีคิวปัจจุบัน')
            if (tmp === null) {
                //ในห้องนี้ไม่มีคิว
                console.log('ไม่มีคิว')
                data = {
                    HN: '',
                    previousHN: this.state.currentQueue.HN
                }
            } else {
                //ในห้องนี้มีคิว
                check = true;
                console.log('มีคิว')
                data = {
                    HN: tmp.HN,
                    previousHN: this.state.currentQueue.HN
                }
            }
    }
   
 


    render() {
        console.log(this.state.forwardId)
        console.log(this.state.forwardLabId)
        
        return (
            <div>

                <Headerbar />


                <DropdownQueue
                    //state
                    doctorId={this.state.doctorId}
                    departmentId={this.state.departmentId}
                    departments={this.state.departments}
                    doctors={this.state.doctors}
                    errorAdd={this.state.errorAdd}
                    type={this.state.type}
                    //rooms={this.state.rooms}
                    //roomId={this.state.roomId}

                    //Method
                    chooseDoctor={this.chooseDoctor}
                //setField={this.setField}
                //getDoctor={this.getDoctor}
                />
                <br />
                <ListQueue
                    //state
                    HN={this.state.HN}
                    modalIsOpen={this.state.modalIsOpen}
                    errorHN={this.state.errorHN}
                    errorGetName={this.state.errorGetName}
                    errorAdd={this.state.errorAdd}
                    namePatient={this.state.namePatient}
                    lastNamePatient={this.state.lastNamePatient}
                    showModal={this.state.showModal}
                    departmentId={this.state.departmentId}
                    departments={this.state.departments}
                    doctors={this.state.doctors}
                    allDepartment={this.state.allDepartment}
                    forwardId={this.state.forwardId}
                    allLab={this.state.allLab}
                    forwardLabId={this.state.forwardLabId}
                    typeDepartmentSelect={this.state.typeDepartmentSelect}
                    typeLabSelect={this.state.typeLabSelect}
                    typeForward={this.state.typeForward}
                    
                    //allPatient={this.state.allPatient}
                    //queues={this.state.queues}


                    //Method
                    // handleChange={[this.props.handleChange]}
                    
                    validateHN={this.validateHN}
                    setField={this.setField}
                    addQueue={this.addQueue}
                    showPatient={this.showPatient}
                    getPatientName={this.getPatientName}
                    callPatient={this.callPatient}
                //getQueue={this.getQueue}






                />
                <br />
                <br />
            </div>
        );
    }
}


export default Adminhome;