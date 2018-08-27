import React, { Component } from "react";
import Profile from "./../components/profile";
import Tablepatient from "./../components/table";
import "./../css/Q.css";
//import 'semantic-ui-css/semantic.min.css';
import "./../css/App.css";
import Headerbaruser from "./../components/headerbaruser";
import Modal from "react-modal";
import axios from "./../lib/axios";
import {
  Segment,
  Label,
  Icon,
  Message,
  Header,
  Image,
  List,
  Button,
  Card,Grid
} from "semantic-ui-react";
class Home extends Component {
  state = {
    showIsModal: false,
    HN: this.props.location.state.HN,
    patientData: [],
    queueData: {},
    currentQueue:0,

    // firstNamePatient: " ",
    // lastNamePatient: " ",
    
    // firstNameDoctor: " "
  };

  componentWillMount = async () => {
    console.log("Will mount")
    Modal.setAppElement("body");
    var dataPatient = await axios.get(`/getPatient`);
    var dataQueue = await axios.post(`/getQueueData`,{
      HN : this.state.HN
    })
    let tmp = {}
    tmp = dataQueue.data[0]

    if(tmp){
      var currentQueue = await axios.get(`/getCurrentQueue/${tmp.roomId}`)
      tmp.currentQueue = currentQueue.data[0].queueId
    }
    console.log('dataQueue',tmp)
    
    this.setState({
      patientData: dataPatient.data,
      queueData: tmp,
      // currentQueue: currentQueue.data[0]
      // HN: dataPatient.data[0].HN,
      
    // firstNameDoctor : this.state.queueData.firstname
    });
    // console.log(datas)
    // console.log(this.state.firstNameDoctor)
    // console.log(this.state.queueData)
    // console.log(this.state.patientData)
    
    
  };
  
  // getQueueDataTest = () => {
  //   const datas = this.state.queueData.filter(data => data.HN === this.state.HN)
  //   if(datas){
  //   this.setState ({
  //     firstNameDoctor : datas.firstName
  //   })
  // }
  //   console.log(this.state.firstNameDoctor)
  // }

  getQueueData = () => {
    const datas = this.state.queueData;
    let tmp = "";
    console.log(datas)
    console.log(this.state.HN)
    // tmp = datas.filter(data => data.HN === this.state.HN).map(data => (
      
    // ));
    
    console.log(datas)
    return tmp;
  };

  getPatientData = () => {
    const datas = this.state.patientData;
    let tmp = "";
    
    tmp = datas.filter(data => data.HN === this.state.HN).map(data => (
      <Header>
        {data.firstName} {data.lastName} <br />
        <span >HN : {data.HN}</span>
      </Header>
    ));
    console.log(datas);
    return tmp;
  };

  setField = (field, value) => {
    console.log(field + " / " + value);
    this.setState({ [field]: value });
  };

  render() {
    console.log("HN : " + this.state.HN);
    return (
      <div>
        <Headerbaruser />
        <Profile
          //state
          showIsModal={this.state.showIsModal}
          firstNamePatient={this.state.firstNamePatient}
          lastNamePatient={this.state.lastNamePatient}
          queueData = { this.state.queueData}
          //method
          setField={this.setField}
          getPatientData={this.getPatientData}
        />
        <br />
        <Tablepatient 
        //state
          queueData = { this.state.queueData}

        //method
        getQueueData={this.getQueueData}

        // getQueueDataTest={this.getQueueDataTest}
        />
      </div>
    );
  }
}

export default Home;
