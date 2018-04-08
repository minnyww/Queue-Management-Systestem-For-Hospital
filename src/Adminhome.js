import React, { Component } from 'react';
import Queue from './components/Queue';
import Dropdownq from './components/Dropdownq';
import Labwait from './components/Labwait';
import './css/Q.css'
import CardExampleCard from './components/Queue';
import Headerbar from './components/headerbar';
import axios from './lib/axios'
import * as moment from 'moment';
import { Segment ,Label , Icon } from 'semantic-ui-react'


class Adminhome extends Component {
    state ={
        roomId:0,
        type:'', //คัดกรอง หรือผู้ป่วยนัด
        nurseId:1, // เอา empID ของ พยาบาลมา
        departmentId:1, // ได้ด้วย
        queueId:0,
        Date: '2018/04/9',
        statusId: 1,
        HN: '',
        doctorId: 1, // เอา empId ของหมอ
        forward: null,

        queues: [],
        allPatient:[]
    }

    componentWillMount= async () =>{
        var datas = await axios.get(`/getQueue`);
        var dataPatient = await axios.get(`/getPatient`);
        console.log(dataPatient)
        this.setState({
            allPatient: dataPatient.data,
            queues: datas.data,
        })
    }

    setField = (field,value) => {
        console.log(field+' / '+value)
        this.setState({ [field] :value})
    }

    addQueue = async () => {
        // alert("TEST")
        await axios.post('/addPatientQ', {
            roomId: this.state.roomId,
            Date: this.state.Date,
            statusId: this.state.statusId,
            HN: this.state.HN,
            doctorId: this.state.doctorId,
            forward: this.state.forward,
            nurseId: this.state.nurseId
        
            //insert แอทริบิ้วใน ตาราง คิว 
        })
        console.log('add เข้า db')
    }

    showPatient = () => {
        const now = moment().startOf('hour').fromNow();
        const data = this.state.queues
        const tmp = data.map(queue => (
            <Segment >
                {queue.firstName} {queue.lastName}<br />
                Room : {queue.room}<br />
                แผนก : {queue.department}
                <Label attached='bottom right' color='blue'>
                    <Icon name='time' />{now}</Label>
            </Segment>
        ))
        return tmp
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Headerbar/>
                {/* dropdown ตรงนี้ Dropdownq.js*/}
                {/* กดละต้องเปลี่ยน content ด้วย Dropdownq.js*/}
                <Dropdownq 
                    roomId={this.state.roomId} 
                    departmentId={this.state.departmentId}
                    type={this.state.type}
                    setField={this.setField}
                />
                <br/>
                
                {/* แสดงคิวอันนี้ Queue.js*/}
                <Queue 
                    HN={this.state.HN}
                    setField={this.setField}
                    addQueue={this.addQueue}
                    validateHN={this.validateHN}
                    allPatient={this.state.allPatient}
                    queues={this.state.queues}
                    showPatient={this.showPatient}
                />
                <br/>
                <br/>
             </div>


        );
    }
}
export default Adminhome;