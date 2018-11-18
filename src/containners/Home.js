import React, { Component } from "react";
import Profile from "./../components/profile";
import Tablepatient from "./../components/table";
import "./../css/Q.css";
//import 'semantic-ui-css/semantic.min.css';
import "./../css/App.css";
import Headerbaruser from "./../components/headerbaruser";
import Modal from "react-modal";
import axios from "./../lib/axios";
import { Header, Step, Icon, Table, Image } from "semantic-ui-react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import girl from './../img/girl.png'
import boy from './../img/boy.png'

class Home extends Component {
  state = {
    showIsModal: false,
    HN: '',

    patientData: [],
    queueData: {},
    currentQueue: 0,
    allStepQueue: [],
    allAppointment: [],

    getDataPatient: [],
    recipient: '',
    textmessage: '',
    dataPhoneNumber: '',
    avgTime: 0,

    patientInfo: {},
    
  };

  initialData = async () => {
    const getUserData = JSON.parse(localStorage.getItem('getUserData'))
    this.setState({
      HN: getUserData.HN
    })
    var dataPatient = await axios.get(`/getPatient`);
    this.setState({
      patientData: dataPatient.data,
    })
    var dataAllAppointment = await axios.post(`/getAllAppointment`, {
      HN: this.state.HN,
    })
    const getData = this.state.patientData.filter(data => (data.HN === this.state.HN))

    this.setState({
      allAppointment: dataAllAppointment.data,
      patientInfo: getData,
    })

    setInterval(async () => {
      var dataQueue = await axios.post(`/getQueueData`, {
        HN: this.state.HN
      });
      console.log('เข้าๆๆๆ')
      const { dataAllStepQueue, tmp } = await this.getQueue(dataQueue)
      var dataPhone = await axios.post(`/getPhoneNumber`, {
        HN: this.state.HN,
      })
      this.setState({
        avgTime: tmp.avgtime,
        dataPhoneNumber: dataPhone.data[0].phonenumber,
      })
      if (this.state.queueData.currentQueue !== tmp.currentQueue) {
        this.setState({
          queueData: tmp,
          allStepQueue: dataAllStepQueue,
          // dataPhoneNumber: dataPhone.data[0].phonenumber,
          // avgTime: tmp.avgtime,
        })
        this.cutPhoneNumber()
        this.setState({
          recipient: this.cutPhoneNumber()
        })
        // console.log(this.state.queueData)
        this.sendNotification();
      }
    }, 10000)
  }

  getQueue = async (dataQueue) => {
    let tmp = {};
    let dataAllStepQueue = []
    if (dataQueue.data.length !== 0) {
      tmp = dataQueue.data[0];

      if (tmp) {
        var currentQueue = await axios.get(`/getCurrentQueue/${tmp.roomId}`);
        tmp.currentQueue = 0;
        if (currentQueue.data.length !== 0) {
          tmp.currentQueue = currentQueue.data[0].queueId;
        }
        let data = await axios.post(`/getAllStepQueue`, {
          HN: this.state.HN,
          group: tmp.group
        })
        dataAllStepQueue = data.data
      }
    }
    
    return { dataAllStepQueue,tmp }
  }

  componentWillMount = async () => {
    await this.initialData()
  }

  cutPhoneNumber = () => {
    let phone = "";
    var number = this.state.dataPhoneNumber
    let tmp = "+66"
    phone = number.substr(1, 10)
    let recipient = tmp + phone
    return recipient;
  }

  getPatientData = () => {
    const datas = this.state.patientData;
    let tmp = "";
    if (this.state.patientInfo[0]) {
      tmp = datas.filter(data => data.HN === this.state.HN).map((data, i) => (
        <div key={i}>
          {this.state.patientInfo[0].gender === "male"
            ? <Image src={boy} style={{ width: '30%' }} />
            : <Image src={girl} style={{ width: '30%' }} />}
          <Header style={{ fontWeight: '100' }}>
            {data.firstName} {data.lastName} <br />
            <span>HN : {data.HN}</span>
          </Header>
        </div>
      ));
    }
    return tmp;
  };

  setField = (field, value) => {
    this.setState({ [field]: value });
  };

  showStepQueue = () => {
    const icon =
      [{ key: '1', value: 'user doctor', text: 'user doctor' },
      { key: '2', value: 'lab', text: 'lab' }]
    let tmp = ''
    let data = this.state.allStepQueue

    tmp = data.map((data, i) => (
      <Step key={i}
        completed={data.statusId == 4 ? true : false}
        disabled={data.statusId == 5 ? true : false}
        active={data.statusId == 3 || data.statusId == 1 ? true : false}>
        <Icon color="blue" className={icon.filter(icon => icon.key == data.type).length == 0 ? ""
          : icon.filter(icon => icon.key == data.type)[0].value} />
        <Step.Content>
          <Step.Title>{data.type == 1 ? "พบแพทย์ : "
            + data.firstname + ' '
            + data.lastname : "ห้อง Lab/หัตถการ"}
          </Step.Title>
          <Step.Description>{'แผนก : ' + data.department +
            ' ตึก : ' + data.building
          }</Step.Description>
          <Step.Description>{
            ' ชั้น : ' + data.floor +
            ' ห้อง : ' + data.roomId}</Step.Description>
        </Step.Content>
      </Step>
    ));

    return tmp
  }

  showAppointment = () => {
    let tmp = ''
    let data = this.state.allAppointment
    tmp = data.map((data, i) => (
      <Table.Body key={i}>
        <Table.Row>
          <Table.Cell>{1 + i}</Table.Cell>
          <Table.Cell>{data.date + ' ' + data.month + ' ' + data.year + ' '
            + data.timeStart.substr(0, 8) + ' - ' + data.timeEnd.substr(0, 8)}</Table.Cell>
          <Table.Cell>{data.firstname} {data.lastname}</Table.Cell>
          <Table.Cell>{data.department} </Table.Cell>
        </Table.Row>
      </Table.Body>
    ))
    return tmp
  }

  sendNotification = () => {
    let tmp = "";
    tmp = this.state.queueData.queueId - this.state.queueData.currentQueue
    const time = this.state.avgTime
    if (tmp >= 0) {
      if (tmp === 0) {
        NotificationManager.info('ถึงคิว')
        this.setState({ textmessage: "ถึงคิว" + ' แผนก: '
        + this.state.queueData.department + ' ห้อง : ' + this.state.queueData.roomId})
        this.sendText()
      } else if (tmp === 1) {
        NotificationManager.warning('เหลืออีก 1 คิว ' + ' อีก ' + time + ' นาที ' + ' แผนก: '
          + this.state.queueData.department + ' ห้อง : ' + this.state.queueData.roomId)
        this.setState({
          textmessage: "เหลืออีก 1 คิว " + ' อีก ' + time + ' นาที ' + ' แผนก: '
            + this.state.queueData.department + ' ห้อง : ' + this.state.queueData.roomId
        })
        this.sendText()
      } else if (tmp === 3) {
        NotificationManager.warning('เหลืออีก 3 คิว' + ' อีก ' + time + ' นาที ' + ' แผนก: '
          + this.state.queueData.department + ' ห้อง : ' + this.state.queueData.roomId)
        this.setState({
          textmessage: "เหลืออีก 3 คิว " + ' อีก ' + time + ' นาที ' + ' แผนก: '
            + this.state.queueData.department + ' ห้อง : ' + this.state.queueData.roomId
        })
        this.sendText()
      } else if (tmp === 5) {
        NotificationManager.warning('เหลืออีก 5 คิว' + ' อีก ' + time + ' นาที ' + ' แผนก: '
          + this.state.queueData.department + ' ห้อง : ' + this.state.queueData.roomId)
        this.setState({
          textmessage: "เหลืออีก 5 คิว " + ' อีก ' + time + ' นาที ' + ' แผนก: '
            + this.state.queueData.department + ' ห้อง : ' + this.state.queueData.roomId
        })
        this.sendText()
      }
    } else {
      NotificationManager.info('ไม่ได้อยู่ในคิว')
    }
    this.setState({
      textmessage : ''
    })
  }
  sendText = async () => {
    const recipient = this.state.recipient
    const textmessage = this.state.textmessage

    const resp = await axios.post('/sendText', {
      recipient: recipient,
      textmessage: textmessage
    })
  }

  render() {
    return (
      <div >
        <script src="path/to/react-notifications/dist/react-notifications.js"></script>
        <Headerbaruser />
        <NotificationContainer />
        <Profile
          //state
          showIsModal={this.state.showIsModal}
          // firstNamePatient={this.state.firstNamePatient}
          // lastNamePatient={this.state.lastNamePatient}
          queueData={this.state.queueData}
          patientData={this.state.patientData}
          HN={this.state.HN}
          allAppointment={this.state.allAppointment}
          patientInfo={this.state.patientInfo}
          //method
          setField={this.setField}
          getPatientData={this.getPatientData}
          showAppointment={this.showAppointment}

        />
        <br />
        <Tablepatient
          //state
          queueData={this.state.queueData}
          allStepQueue={this.state.allStepQueue}

          //method
          showStepQueue={this.showStepQueue}


        />
      </div>
    );
  }
}

export default Home;
