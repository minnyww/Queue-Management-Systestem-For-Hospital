import React, { Component } from "react";
import Profile from "./../components/profile";
import Tablepatient from "./../components/table";
import "./../css/Q.css";
//import 'semantic-ui-css/semantic.min.css';
import "./../css/App.css";
import Headerbaruser from "./../components/headerbaruser";
import Modal from "react-modal";
import axios from "./../lib/axios";
import { Header, Step, Icon, Table } from "semantic-ui-react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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
  };

  componentWillMount = async () => {
    const getUserData = JSON.parse(localStorage.getItem('getUserData'))
    this.setState({
      HN: getUserData.HN
    })
    // setInterval('window.location.reload()', 10000);
    var dataPatient = await axios.get(`/getPatient`);
    this.setState({
      patientData: dataPatient.data,

    })

    var dataQueue = await axios.post(`/getQueueData`, {
      HN: this.state.HN
    });

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

    // var dataAllStepQueue = await axios.post(`/getAllStepQueue`, {
    //   HN: this.state.HN,
    //   group: tmp.group
    // })

    var dataAllAppointment = await axios.post(`/getAllAppointment`, {
      HN: this.state.HN,
    })

    var dataPhone = await axios.post(`/getPhoneNumber`, {
      HN: this.state.HN,
    })


    this.setState({
      queueData: tmp,
      allStepQueue: dataAllStepQueue,
      allAppointment: dataAllAppointment.data,
      dataPhoneNumber: dataPhone.data[0].phonenumber,
    })
    console.log(this.state.queueData.avgtime);
    const time = await this.state.queueData.avgtime
    this.setState({
      avgTime: time
    })

    console.log(this.state.allStepQueue)
    this.cutPhoneNumber();
    this.setState({
      recipient: this.cutPhoneNumber()
    })
    this.sendNotification();
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
    tmp = datas.filter(data => data.HN === this.state.HN).map(data => (
      <Header>
        {data.firstName} {data.lastName} <br />
        <span>HN : {data.HN}</span>
      </Header>
    ));

    return tmp;
  };

  setField = (field, value) => {
    this.setState({ [field]: value });
  };
  
  showStepQueue = () => {
    const icon =
      [{ key: '1001', value: 'user doctor', text: 'user doctor' },
      { key: '1002', value: 'user doctor', text: 'user doctor' },
      { key: '9999', value: 'lab', text: 'lab' }]
    // console.log(this.state.allStepQueue)
    let tmp = ''
    let data = this.state.allStepQueue

    tmp = data.map(data => (
      <Step completed={data.statusId == 4 ? true : false}
        disabled={data.statusId == 5 ? true : false}
        active={data.statusId == 3 || data.statusId == 1 ? true : false}>
        <Icon color="blue" className={icon.filter(icon => icon.key == data.roomId).length == 0 ? ""
          : icon.filter(icon => icon.key == data.roomId)[0].value} />
        <Step.Content>
          <Step.Title>{data.type == 1 ? "พบแพทย์ :"
            + data.firstname + ' '
            + data.lastname : "ห้อง Lab/หัตถการ"}
          </Step.Title>
          <Step.Description>{'ห้อง : ' + data.roomId + 'แผนก : ' + data.department}</Step.Description>
        </Step.Content>
      </Step>
    ));

    return tmp
  }

  showAppointment = () => {
    let tmp = ''
    let data = this.state.allAppointment
    tmp = data.map((data, i) => (
      <Table.Body>
        <Table.Row>
          <Table.Cell>{1 + i}</Table.Cell>
          <Table.Cell>{data.date + ' ' + data.month + ' ' + data.year + ' ' + data.timeStart + ' - ' + data.timeEnd}</Table.Cell>
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
    console.log(tmp)
    console.log(time);
    if(tmp>=0){
      console.log(tmp);
    if (tmp === 0) {
      console.log("ถึงคิว")
      NotificationManager.info('ถึงคิว')
      this.setState({ textmessage: "ถึงคิว" })
      this.sendText()
    } else if (tmp === 1) {
      console.log("เหลืออีก 1 คิว"+time+' นาที')
      NotificationManager.warning('เหลืออีก 1 คิว '+time+' นาที')
      this.setState({ textmessage: "เหลืออีก 1 คิว "+time+' นาที' })
      this.sendText()
    } else if (tmp === 3) {
      console.log("เหลืออีก 3 คิว"+time+' นาที')
      NotificationManager.warning('เหลืออีก 3 คิว'+time+' นาที')
      this.setState({ textmessage: "เหลืออีก 3 คิว "+time+' นาที' })
      this.sendText()
    } else if (tmp === 5) {
      console.log("เหลืออีก 5 คิว"+time+' นาที')
      NotificationManager.warning('เหลืออีก 5 คิว'+time+' นาที')
      this.setState({ textmessage: "เหลืออีก 5 คิว "+time+' นาที' })
      this.sendText()
    }
  }else{
    console.log("ไม่ได้อยู่ในคิว")
      NotificationManager.info('ไม่ได้อยู่ในคิว')
  }
  }
  sendText = async () => {
    const recipient = this.state.recipient
    const textmessage = this.state.textmessage

    const resp = await axios.post('/sendText', {
      recipient: recipient,
      textmessage: textmessage
    })
    console.log(resp)
  }

  render() {

    console.log("state", this.state)
    return (
      <div>
        <script src="path/to/react-notifications/dist/react-notifications.js"></script>
        <Headerbaruser />
        <NotificationContainer />
        <Profile
          //state
          showIsModal={this.state.showIsModal}
          // firstNamePatient={this.state.firstNamePatient}
          // lastNamePatient={this.state.lastNamePatient}
          queueData={this.state.queueData}
          allAppointment={this.state.allAppointment}
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
