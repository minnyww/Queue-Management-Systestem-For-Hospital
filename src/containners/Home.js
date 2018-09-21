import React, { Component } from "react";
import Profile from "./../components/profile";
import Tablepatient from "./../components/table";
import "./../css/Q.css";
//import 'semantic-ui-css/semantic.min.css';
import "./../css/App.css";
import Headerbaruser from "./../components/headerbaruser";
import Modal from "react-modal";
import axios from "./../lib/axios";
import { Header } from "semantic-ui-react";
class Home extends Component {
  state = {
    showIsModal: false,
    HN: this.props.location.state.HN,
    patientData: [],
    queueData: {},
    currentQueue: 0,


    avgTime: 0
  };

  componentWillMount = async () => {

    Modal.setAppElement("body");
    var dataPatient = await axios.get(`/getPatient`);
    var dataQueue = await axios.post(`/getQueueData`, {
      HN: this.state.HN
    });

    let tmp = {};
    if (dataQueue.data.length !== 0) {
      tmp = dataQueue.data[0];

      if (tmp) {
        var currentQueue = await axios.get(`/getCurrentQueue/${tmp.roomId}`);
        tmp.currentQueue = 0;
        if (currentQueue.data.length !== 0) {
          tmp.currentQueue = currentQueue.data[0].queueId;
        }
      }

    }
    this.setState({
      patientData: dataPatient.data,
      queueData: tmp
    });

  };

  // calCulateAvgTime = () => {
  //   var getAvgTime = this.state.queueData.avgTime
  //   var avgTimes = getAvgTime.toFixed(0)
  //   this.setState({
  //     avgTime : avgTimes  
  //   })
  // }

  // getQueueData = () => {
  //   const datas = this.state.queueData;
  //   let tmp = "";
  //   console.log(this.state.HN);
  //   return tmp;
  // };

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

  render() {
    return (
      <div>
        <Headerbaruser />
        <Profile
          //state
          showIsModal={this.state.showIsModal}
          firstNamePatient={this.state.firstNamePatient}
          lastNamePatient={this.state.lastNamePatient}
          queueData={this.state.queueData}
          //method
          setField={this.setField}
          getPatientData={this.getPatientData}
        />
        <br />
        <Tablepatient
          //state
          queueData={this.state.queueData}
          //method
          

        
        />
      </div>
    );
  }
}

export default Home;
