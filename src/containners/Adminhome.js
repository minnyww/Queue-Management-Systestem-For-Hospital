import React, { Component } from "react";
import DropdownQueue from "./../components/Dropdown";
import ListQueue from "./../components/listQueue";
import "./../css/Q.css";
import Headerbar from "./../components/headerbar";
import axios from "./../lib/axios";

import { Segment, Icon, Header, List, Message, Dropdown, Menu } from "semantic-ui-react";
import Modal from "react-modal";

import { extendMoment } from 'moment-range';
import * as Moment from "moment";
const moment = extendMoment(Moment);


class Adminhome extends Component {

  state = {
    showModal: false,
    modalIsOpen: false,
    modalOpen: false,
    errorHN: "",
    errorGetName: "",
    errorAdd: "",
    Date: new Date(),
    currentQueue: {},
    currentDate: {
      day: "",
      month: "",
      year: ""
    },
    statusId: 1,
    doctorList: [],
    queues: [],
    labQueues: [], // show lab queue at department
    listLabQueue: [], // show queue at lab room
    allPatient: [],
    roomId: 0,
    departmentId: 0,
    doctorId: 0,
    nurseId: 0,
    userType: 0, //บอกตำแหน่ง nurse department or lab
    forwardId: 0,
    forwardLabId: 0,
    forwardDepartmentId: 0,
    typeForward: "",
    message: "",
    amountDepartment: 1,

    HN: "",
    namePatient: "",
    lastNamePatient: "",

    allDepartment: [{ key: "", text: "", value: "" }],
    roomAndDoctors: [{ key: "", text: "", value: "" }],
    //Dropdown.js
    departments: [{ key: "", text: "", value: "" }],
    doctors: [{ key: "", text: "", value: "" }],
    type: "",

    forwardDepartments: [{ type: '', departmentId: '', doctorId: '' }],
    reState:''

  };

  componentWillMount = async () => {
    this.setState({
      nurseId: this.props.location.state.nurseId,
      departmentId: this.props.location.state.departmentId,
      userType: this.props.location.state.userType
    });

    var datas = await axios.get(`/getQueue`);
    var dataPatient = await axios.get(`/getPatient`);
    Modal.setAppElement("body");

    const allDepartment = await axios.get(`/getDepartment`);
    const allDepartmentOption = allDepartment.data.map(department => ({
      key: department.departmentId,
      text: department.department,
      value: department.departmentId
    }));

    const allLab = await axios.get(`/getLab`);
    const allLabOption = allLab.data.map(Lab => ({
      key: Lab.departmentId,
      text: Lab.department,
      value: Lab.departmentId
    }));

    const departments = await axios.get(
      `/getDepartment/${this.state.departmentId}`
    );
    const departmentsOption = departments.data.map(department => ({
      key: department.departmentId,
      text: department.department,
      value: department.departmentId
    }));

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

    const doctors = await axios.post(`/getListDoctor`, {
      day: day[curr_date],
      month: month[curr_month],
      year: curr_year,
      departmentId: this.state.departmentId
    });
    const doctorsOption = this.dropdownDoctors(doctors);

    var datasLab = await axios.get(`/getLabQueue/${doctors.data[0].roomId}`);
    var dataLabQueue = await axios.get(`/getListLabQueue`);

    this.setState({
      doctorList: doctors.data,
      departments: departmentsOption,
      allDepartment: allDepartmentOption,
      allLab: allLabOption,
      doctors: doctorsOption,
      allPatient: dataPatient.data,
      queues: datas.data,
      listLabQueue: dataLabQueue.data,
      labQueues: datasLab.data,
      roomId: doctors.data[0].roomId,
      doctorId: doctorsOption[0].value,
      currentDate: {
        day: day[curr_date],
        month: month[curr_month],
        year: curr_year
      }
    });
  };
  //สิ้นสุด Willmount

  setField = (field, value) => {
    this.setState({ [field]: value });
  };

  chooseDoctor = async value => {
    const findRoom = this.state.doctorList
      .filter(doctor => doctor.doctorId === value)
      .map(doctor => doctor.roomId);

    const currentQinThisRoom = await axios.get(`/currentQwithDoctor/${value}`);
    this.setState({
      doctorId: value,
      roomId: findRoom[0],
      currentQueue:
        currentQinThisRoom.data.length === 0 ? {} : currentQinThisRoom.data[0]
    });
    this.getLabQueue(findRoom[0]);
  };

  dropdownDoctors = doctors => {
    const roomAndDoctorOption = doctors.data.map(roomDoctor => ({
      key: roomDoctor.doctorId,
      text:
        roomDoctor.firstname +
        " " +
        roomDoctor.lastname +
        " (ห้อง " +
        roomDoctor.roomId +
        " ) ",
      value: roomDoctor.doctorId
    }));
    return roomAndDoctorOption;
  };

  dropdownRooms = doctors => {
    const dropdownAndRooms = doctors.data.map(roomDoctor => ({
      key: roomDoctor.doctorId,
      text:
        roomDoctor.firstname +
        " " +
        roomDoctor.lastname +
        " (ห้อง " +
        roomDoctor.roomId +
        " ) ",
      value: roomDoctor.doctorId + "/" + roomDoctor.roomId
    }));
    return dropdownAndRooms;
  };

  checkDoctorWithRoom = async value => {
    const roomAndDoctors = await axios.post(`/getRoomAndDoctor`, {
      day: this.state.currentDate.day,
      month: this.state.currentDate.month,
      year: this.state.currentDate.year,
      forwardDepartmentId: value
    });

    let doctorsOption = this.dropdownRooms(roomAndDoctors);
    this.setState({
      roomAndDoctors: doctorsOption,
      forwardDepartmentId: value
    });
  };

  doctorInDepartment = async value => {
    const roomAndDoctors = await axios.post(`/getRoomAndDoctor`, {
      day: this.state.currentDate.day,
      month: this.state.currentDate.month,
      year: this.state.currentDate.year,
      forwardDepartmentId: value
    });

    return this.dropdownRooms(roomAndDoctors);
    
  };

  //Add เข้าคิว
  addQueue = async e => {
    const min = this.state.queues.filter(queue => {
      queue.HN === this.state.HN;
    });

    if (min.length === 0) {
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

      var checkHNDepartments = await axios.get(
        `/checkHNatDepartment/${this.state.departmentId}`
      );
      const checks = checkHNDepartments.data.filter(
        check => check.HN === this.state.HN
      );

      if (checks.length === 0) {
        var time = moment().toString();
        await axios.post("/addPatientQ", {
          roomId: this.state.roomId,
          // date: this.state.Date,
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
        });
        this.setState({
          modalIsOpen: false,
          errorAdd: { status: false, message: "" }
        });
      } else {
        this.setState({
          errorAdd: { status: true, message: "Cannot Add HN To Queue" }
        });
      }
      this.getQueue();
      console.log("add เข้า db");
    } else {
      console.log("ซ้ำ");
    }
  };

  showPatient = () => {
    let tmp = "";
    if (this.state.userType === 1) {
      const data = this.state.queues;
      console.log(data)
      if (data.length !== 0) {
        tmp = data
          .filter(queue => queue.roomId === this.state.roomId)
          .map(queue => (
            <List
              divided
              horizontal
              style={{
                backgroundColor: "white",
                width: "100%",
                borderBottom: "1px solid #E0E0E0",
                padding: "5px"
              }}
            >
              <List.Item style={{ paddingRight: "7%" }}>
                <List.Header
                  style={{
                    fontSize: "36px",
                    color: "teal",
                    paddingLeft: "40%"
                  }}
                >
                  {queue.queueId}
                </List.Header>
              </List.Item>
              <List.Item>
                <List.Header style={{ fontSize: "16px", marginTop: "3%" }}>
                  Name : {queue.firstName} {queue.lastName}
                </List.Header>
                <List.Content style={{ fontSize: "16px", marginTop: "3%" }}>
                  HN: {queue.HN}
                </List.Content>
                <List.Content floated="left">
                  <Icon name="time" size="large" style={{ marginTop: "3%" }} />
                  {queue.avgtime.toFixed(0)} Min
                </List.Content>
                <List.Content
                  floated="right"
                  onClick={() => this.setField("modalOpen", true)}
                >
                  <Icon
                    name="exclamation circle"
                    size="large"
                    color="red"
                    style={{ marginTop: "3%" }}
                  />
                  Message
                </List.Content>
                <Modal
                  isOpen={this.state.modalOpen}
                  onRequestClose={() => this.setField("modalOpen", false)}
                  isClose={() => this.setField("modalOpen", false)}
                  style={customStyles}
                >
                  {queue.forward}
                </Modal>
              </List.Item>
            </List>
          ));
      } else {
        tmp = <Message> ไม่มีคิว </Message>;
      }
    } else if (this.state.userType === 2) {
      const data = this.state.listLabQueue;
      if (data.length !== 0) {
        tmp = data.map(queue => (
          <List
            divided
            horizontal
            style={{
              backgroundColor: "white",
              width: "100%",
              borderBottom: "1px solid #E0E0E0",
              padding: "5px"
            }}
          >
            <List.Item>
              <List.Header
                style={{ fontSize: "36px", color: "teal", paddingLeft: "3%" }}
              >
                {queue.queueId}
              </List.Header>
            </List.Item>
            <List.Item>
              <List.Header style={{ fontSize: "16px", marginTop: "2%" }}>
                Name : {queue.firstName} {queue.lastName}
              </List.Header>
              <List.Content style={{ fontSize: "16px", marginTop: "3%" }}>
                HN: {queue.HN}
              </List.Content>
              <List.Content floated="left">
                <Icon name="time" size="medium" style={{ marginTop: "3%" }} />
                {queue.avgtime.toFixed(0)} Min
              </List.Content>
              <List.Content
                floated="right"
                onClick={() => this.setField("modalOpen", true)}
              >
                <Icon
                  name="exclamation circle"
                  size="medium"
                  color="red"
                  style={{ marginTop: "3%" }}
                />
                Message
              </List.Content>
              <Modal
                isOpen={this.state.modalOpen}
                onRequestClose={() => this.setField("modalOpen", false)}
                isClose={() => this.setField("modalOpen", false)}
                style={customStyles}
              >
                {queue.Forward}
              </Modal>
            </List.Item>
          </List>
        ));
      } else {
        tmp = <p> ไม่มีคิว </p>;
      }
    }
    return tmp;
  };

  validateHN = async () => {
    if (this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.getName(this.state.HN);
    } else if (!this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.setState({
        errorHN: { status: true, message: "HN Does not match" }
      });
    }
  };

  getName = HN => {
    const patient = this.state.allPatient.filter(data => data.HN === HN)[0];
    if (patient) {
      this.setState({
        namePatient: patient.firstName + " ",
        lastNamePatient: patient.lastName,
        errorHN: { status: false, message: "" },
        errorGetName: { status: false, message: "" }
      });
    } else {
      this.setState({
        namePatient: "",
        lastNamePatient: "",
        errorGetName: { status: true, message: "" }
      });
    }
  };

  //เอาคิวออกมาก
  getQueue = async () => {
    const datas = await axios.get(`/getQueue`);
    this.setState({
      queues: datas.data,
      msg: ""
    });
  };
  //getLab queue
  getLabQueue = async roomId => {
    const datas = await axios.get(`/getLabQueue/${roomId}`);
    this.setState({
      labQueues: datas.data
    });
    console.log(this.state.labQueues);
  };
  //-----------



  callPatient = async () => {

    var data = {};
    var tmp = null;
    if (this.state.userType === 1) {
      for (let i = 0; i < this.state.queues.length; i++) {
        if (this.state.queues[i].roomId === this.state.roomId) {
          tmp = this.state.queues[i];
          break;
        }
      }
    } else if (this.state.userType === 2) {
      tmp = this.state.listLabQueue[0];
    }
    console.log(tmp);
    var check = false;

    if (this.state.currentQueue.firstName === undefined) {
      //ไม่มีคิวปัจจุบัน
      console.log("ไม่มีคิวปัจจุบัน");
      if (tmp === null) {
        //ในห้องนี้ไม่มีคิว
        console.log("cannot");
      } else {
        //ในห้องนี้มีคิว
        data = {
          HN: tmp.HN,
          previousHN: "",
          Date: this.state.Date
        };
        check = true;
        console.log("ห้อง" + this.state.roomId + " /" + tmp.HN);
      }
    } else {
      // มีคิวปัจจุบัน
      console.log("มีคิวปัจจุบัน");
      if (tmp === null || tmp === undefined) {
        //ในห้องนี้ไม่มีคิว
        console.log("ไม่มีคิว");
        data = {
          HN: "",
          previousHN: this.state.currentQueue.HN,
          Date: this.state.Date
        };

      } else {
        //ในห้องนี้มีคิว
        check = true;
        console.log("มีคิว");
        data = {
          HN: tmp.HN,
          previousHN: this.state.currentQueue.HN,
          Date: this.state.Date
        };

      }
    }
    console.log(data)
    this.updateAvgTime();
    await axios.post("/updateQueue", data);

    console.log("สรุปมีคิวปัจจุบันไหม ", tmp);
    this.setState({
      currentQueue: check === true ? tmp : {}
    });
    this.getQueue();
    this.getListLabQueue();
  };
  updateAvgTime = async () => {
    await axios.get(`/updateAllPerDay`);
  }

  getListLabQueue = async () => {
    const datas = await axios.get(`/getListLabQueue`);
    this.setState({
      listLabQueue: datas.data
    });
  };
  getPatientName = () => {
    const data = this.state.currentQueue;
    if (this.state.userType === 1) {
      return (
        <Segment id="boxshow">
          <Header as="h2" textAlign="center">
            <Icon name="user circle" />
            {data.firstName} {data.lastName}
          </Header>
          <Header as="h3" textAlign="center">
            <Icon name="numbered list" />
            HN :{data.HN}
          </Header>
          <Header as="h3" textAlign="center">
            <Icon name="arrow right" />
            Room : {data.roomId}
          </Header>
          <Header as="h3" textAlign="center">
            <Icon name="first aid" />
            Department : {data.department}
          </Header>
        </Segment>
      );
    } else if (this.state.userType === 2) {
      return (
        <Segment id="boxshow">
          <Header as="h2" textAlign="center">
            <Icon name="user circle" />
            {data.firstName} {data.lastName}
          </Header>
          <Header as="h3" textAlign="center">
            <Icon name="numbered list" />
            HN :{data.HN}
          </Header>
          <Header as="h3" textAlign="center">
            <Icon name="first aid" />
            Room/Department : {data.roomId} / {data.department}
          </Header>
          <Header as="h3" textAlign="center">
            <Icon name="edit outline" />
            Message : {data.Forward}
          </Header>
        </Segment>
      );
    }

  };

  forward = async () => {
    var data = {};
    if (this.state.currentQueue.firstName === undefined) {
      console.log("ไม่มีคิว");
      data = {
        HN: "",
        roomId: 0,
        forward: "",
        doctorId: ""
      };
    } else {
      console.log("มีคิว");
      if (this.state.typeForward === "Department") {
        let tmp = this.state.forwardId.split("/");
        data = {
          HN: this.state.currentQueue.HN,
          roomId: tmp[1],
          forward: this.state.message,
          doctorId: tmp[0],
          typeForward: this.state.typeForward
        };
      } else {
        //lab
        data = {
          HN: this.state.currentQueue.HN,
          roomId: this.state.roomId,
          forward: this.state.message,
          doctorId: this.state.doctorId,
          typeForward: this.state.typeForward
        };
      }
    }
    console.log(data);
    await axios.post("/updateForwardQueue", data);

    this.setState({
      currentQueue: {},
      showModal: false,
      HN: "",
      forward: ""
    });
    this.getLabQueue(this.state.roomId);
  };
  goBack = async () => {
    console.log("back");
    this.setState({
      currentQueue: {},
      HN: "",
      firstname: "",
      forward: ""
    });
    await axios.post("/updateCurrentLabQueue", {
      HN: this.state.currentQueue.HN
    });
    this.getLabQueue(this.state.roomId);
  };
  //show patient at lab queues
  showPatientLabQueue = () => {
    const data = this.state.labQueues;
    let tmp = "";
    if (this.state.userType === 1) {
      tmp = data
        .filter(queue => queue.roomId === this.state.roomId)
        .map(queue => (
          <List
            divided
            horizontal
            style={{
              backgroundColor: "white",
              width: "100%",
              borderBottom: "1px solid #E0E0E0",
              padding: "5px"
            }}
          >
            <List.Item>
              <List.Header
                style={{ fontSize: "36px", color: "teal", paddingLeft: "3%" }}
              >
                {queue.queueId}
              </List.Header>
            </List.Item>
            <List.Item>
              <List.Header style={{ fontSize: "16px", marginTop: "2%" }}>
                Name : {queue.firstName} {queue.lastName}
              </List.Header>
              <List.Content style={{ fontSize: "16px", marginTop: "3%" }}>
                HN: {queue.HN}
                {/* <List.Icon name='circle' float="right" color="orange"/> */}
                <List.Content floated="right">
                  <Icon
                    name="circle "
                    color="orange"
                    style={{ marginTop: "5%" }}
                  />
                </List.Content>
              </List.Content>
            </List.Item>
          </List>

        ));
    }
    return tmp;
  };

  addMoreForward = () => {
    console.log('min min')
    console.log([...this.state.forwardDepartments, { type: '', departmentId: '', doctorId: '' }])
    this.setState({ forwardDepartments: [...this.state.forwardDepartments, { type: '', departmentId: '', doctorId: '' }] })
  }

  setValueInArray = (index,attr,value) => {
    let arr = this.state.forwardDepartments
    arr[index][attr] = value;
    this.setState({ forwardDepartments : arr })
  }

  showListDepartment =  () => {
    console.log('เข้า', this.state.forwardDepartments.length)
    let tmp = this.state.forwardDepartments.map((dep, i) => {
      // {type:'',departmentId:'', doctorId:''}
      console.log("roomAndDoctors",dep.roomAndDoctors)
      return <Menu compact>
        <Dropdown.Menu>
          <Dropdown
            simple
            item
            placeholder=" Search or Select Department/Lab"
            options={labOrDepartment}
            onChange={async (e, { value }) => {
              let arr = this.state.forwardDepartments
              arr[i].type = value;
              arr[i].roomAndDoctors = undefined
              this.setState({ forwardDepartments : arr })
            }}

          />
          <Dropdown
            disabled={
              dep.type === "Department" || dep.type === "Lab" ? false : true
            }
            simple
            item
            placeholder=" Search or Select Department or Lab"
            options={dep.type === "Department" ? this.state.allDepartment : this.state.allLab}
            onChange={async (e, { value }) => {
              this.setValueInArray(i,"departmentId",value)
              let arr = this.state.forwardDepartments
              arr[i].departmentId = value;
              arr[i].roomAndDoctors = await this.doctorInDepartment(value)
              console.log("arr",arr)
              this.setState({ forwardDepartments : arr })
              // this.checkDoctorWithRoom(value);
            }}
          />

          <br />

          <Dropdown
            disabled={
                dep.roomAndDoctors === undefined }
            simple
            item
            placeholder="Search or Select Room with doctor"
            options={dep.roomAndDoctors}
            onChange={async (e, { value }) => {
              this.setValueInArray(i,"doctorId",value)
            }}
          />
        </Dropdown.Menu>
      </Menu>
    })


    console.log(tmp)
    return tmp
  }

  render() {
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
          //Method
          chooseDoctor={this.chooseDoctor}
          handleAdditio={this.handleAddition}
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
          typeForward={this.state.typeForward}
          forwardLabId={this.state.forwardLabId}
          forwardDepartmentId={this.state.forwardDepartmentId}
          roomAndDoctors={this.state.roomAndDoctors}
          doctorRooms={this.state.doctorRooms}
          message={this.state.message}
          userType={this.state.userType}
          amountDepartment={this.state.amountDepartment}
          //Method

          forward={this.forward}
          validateHN={this.validateHN}
          setField={this.setField}
          addQueue={this.addQueue}
          showPatient={this.showPatient}
          getPatientName={this.getPatientName}
          callPatient={this.callPatient}
          checkDoctorWithRoom={this.checkDoctorWithRoom}
          showPatientLabQueue={this.showPatientLabQueue}
          goBack={this.goBack}
          addMoreForward={this.addMoreForward}
          showListDepartment={this.showListDepartment}
        />
        <br />
        <br />
      </div>
    );
  }
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "30%"
  }
};
const labOrDepartment = [
  {
    key: 1,
    text: "Lab",
    value: "Lab"
  },
  {
    key: 2,
    text: "Department",
    value: "Department"
  },

];
export default Adminhome;
