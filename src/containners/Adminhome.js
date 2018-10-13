import React, { Component } from "react";
import DropdownQueue from "./../components/Dropdown";
import ListQueue from "./../components/listQueue";
import "./../css/Q.css";
import Headerbar from "./../components/headerbar";
import axios from "./../lib/axios";
import swal from "sweetalert"
import {
  Segment, Icon, Header, List, Message, Dropdown, Menu,
  Table, Radio, Button, TextArea, Label, Divider
} from "semantic-ui-react";
// import Modal from "react-modal";
import Modal from 'react-responsive-modal';


import { extendMoment } from 'moment-range';
import * as Moment from "moment";

const moment = extendMoment(Moment);


class Adminhome extends Component {
  state = {
    //Modal
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
    // forwardId: 0,
    // forwardLabId: 0,
    forwardDepartmentId: 0,
    // typeForward: "",
    message: "",
    // amountDepartment: 1,
    HN: "",
    namePatient: "",
    lastNamePatient: "",
    //Dropdown.js
    allDepartment: [{ key: "", text: "", value: "" }],
    roomAndDoctors: [{ key: "", text: "", value: "" }],
    departments: [{ key: "", text: "", value: "" }],
    doctors: [{ key: "", text: "", value: "" }],
    // reState: '',
    type: "",
    forwardDepartments: [],
    forwardType: "",
    forwardDepartmentId: "",
    forwardDoctorId: "",
    forwardComeback: null,
    forwardRoomAndDoctors: [],
    forwardMessage: "",
    index: 0,
    showMsg: 0,

    editList: false,

    loginName: '',
    addForwardNew: false

  };

  componentWillMount = async () => {
    const { empId, departmentId, type } = JSON.parse(localStorage.getItem('userData'))
    const userData = JSON.parse(localStorage.getItem('userData'))
    // console.log(empId, departmentId, type, userData)
    this.setState({
      nurseId: empId,
      departmentId,
      userType: type,
      loginName: userData
    });

    var dataPatient = await axios.get(`/getPatient`);
    // Modal.setAppElement("body");

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


    const date = this.pharseDate();
    const doctors = await axios.post(`/getListDoctor`, {
      day: date.day,
      month: date.month,
      year: date.year,
      departmentId: this.state.departmentId
    });

    const doctorsOption = this.dropdownDoctors(doctors);

    var datas = await axios.get(`/getQueue/${doctors.data[0].roomId}`);
    var datasLab = await axios.get(`/getLabQueue/${doctors.data[0].roomId}`);
    var dataLabQueue = await axios.get(`/getListLabQueue`);
    const currentQinThisRoom = await axios.get(`/currentQwithDoctor/${doctorsOption[0].value}`);


    this.setState({
      currentQueue: currentQinThisRoom.data.length === 0 ? {} : currentQinThisRoom.data[0],
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
        day: date.day,
        month: date.month,
        year: date.year
      },
    })
    this.updateAvgTime()
    this.forwardList(currentQinThisRoom.data.length === 0 ? {} : currentQinThisRoom.data[0])

    console.log(this.state.labQueues)
  };
  //สิ้นสุด Willmount
  forwardList = async (currentQueue) => {
    console.log(currentQueue)
    const forwardList = await axios.post('/getAllStepQueue', {
      HN: currentQueue.length === 0 ? '' : currentQueue.HN,
      group: currentQueue.length === 0 ? '' : currentQueue.group
    })
    console.log(forwardList)
    this.setState({
      forwardDepartments: forwardList.data.length <= 1 ? [] : forwardList.data,
      addForwardNew: this.state.forwardDepartments.length > 0 ? true : false

    })
    return forwardList.data
  }
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
    this.getQueue();
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

  doctorInDepartment = async value => {
    const roomAndDoctors = await axios.post(`/getRoomAndDoctor`, {
      day: this.state.currentDate.day,
      month: this.state.currentDate.month,
      year: this.state.currentDate.year,
      forwardDepartmentId: value
    });

    return this.dropdownRooms(roomAndDoctors);

  };

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

  //Add เข้าคิว
  addQueue = async e => {
    const min = this.state.queues.filter(queue => {
      queue.HN === this.state.HN;
    });

    if (min.length === 0) {
      const date = this.pharseDate();
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
          day: date.day,
          month: date.month,
          year: date.year,
          timeFormat: time,
          statusId: this.state.statusId,
          HN: this.state.HN,
          doctorId: this.state.doctorId,
          nurseId: this.state.nurseId,
          departmentId: this.state.departmentId,
          //CHECK ว่า กดจากตรงไหน Forward Function หรือ Add Function 
          queueDefault: 'queueDefault',
          step: 1
          // forward: this.state.forward,
          // date: this.state.Date,
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

  showMessage = (message, i) => {
    // this.setState({ showMsg : i })
    if (message) {
      return <Label color='teal'
        onClick={() => this.setState({ modalOpen: true, index: i })}>
        <Icon className="exclamation circle" />
        Message
        </Label>
    }
  }
  renderModal = () => {
    // if (this.state.queues[this.state.index]) {
    return (
      <Modal
        center
        styles={{ modal: { width: 500, top: "30%", height: '30%' } }}
        open={this.state.modalOpen}
        onClose={() => this.setField("modalOpen", false)}>
        {this.state.queues.length > 0 ? this.state.queues[this.state.index].Forward : ''}
      </Modal>
    )
    // }
  }
  showPatient = () => {
    let tmp = "";
    const data = this.state.queues;
    if (data.length !== 0) {
      tmp = data
        .filter(queue => queue.roomId === this.state.roomId)
        .map((queue, i) => (
          <List key={i}
            divided
            horizontal
            style={{
              backgroundColor: "white",
              width: "100%",
              borderBottom: "1px solid #E0E0E0",
              padding: "5px"
            }}>
            <List.Item style={{ paddingRight: "7%" }}>
              <List.Header
                style={{
                  fontSize: "36px",
                  color: "teal",
                  paddingLeft: "40%"
                }} >
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
              {this.showMessage(queue.Forward, i)}
            </List.Item>
          </List>
        ));
    } else {
      tmp = <Label style={{ marginLeft: '40%', marginRight: '30%', marginTop: '25%' }} color="red" >ไม่มีคิว </Label>
      // <Icon loading className='hourglass end' size='huge' color='teal'
      //   style={{ marginLeft: '30%', width: '40%', marginRight: '30%', marginTop: '15%' }}
      // />
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
    const datas = await axios.get(`/getQueue/${this.state.roomId}`);
    this.setState({
      queues: datas.data,
    });
    // console.log(datas.data)
  };
  //getLab queue
  getLabQueue = async roomId => {
    const datas = await axios.get(`/getLabQueue/${roomId}`);
    this.setState({
      labQueues: datas.data
    });
  };
  //-----------
  callPatient = async () => {
    // //ถ้า current q มี !comback
    // //เอากรุปของ currentQ ไป select มา เรียงจากน้อยไปมาก
    // //select group ทั้งหมด ของ currentq where status4 , roomId
    //check ว่ามีห้องที่ต้องกลับไหมถ้ามี ให้เอา col แรก status = 1 
    console.log(this.state.currentQueue)
    if (this.state.currentQueue.firstName !== undefined) {
      if (this.state.currentQueue.roomBack !== null) {
        var checkGroup = await axios.post("/checkGroupRoomback", {
          group: this.state.currentQueue.group,
          // roomId: this.state.roomId
        })

        await axios.post("/updateQueue", {
          statusId: 1,
          date: this.state.Date,
          HN: checkGroup.data[0].HN,
          runningNumber: checkGroup.data[0].runningNumber,
          queueId: checkGroup.data[0].queueId
        });
      }
    }
    // // เชคว่าผู้ป่วยมคิวต่อไหม (currentQ >> where group , sort running number ) >>>>> API post 
    // // (select * from queue where group = current.group asd )
    // // if ที่ queues[0] ให้ update status เป็น 1 { }
    if (this.state.currentQueue.firstName !== undefined) {
      var checkGroup = await axios.post("/checkGroupId", {
        group: this.state.currentQueue.group
      })
      if (checkGroup.data.length === 0) {
        await axios.post("/updateQueue", {
          statusId: 1,
          date: this.state.Date,
          HN: this.state.currentQueue.HN,
          runningNumber: this.state.currentQueue.runningNumber,
          queueId: this.state.currentQueue.queueId
        });
      }
      else {
        await axios.post("/updateQueue", {
          statusId: 1,
          date: this.state.Date,
          HN: checkGroup.data[0].HN,
          runningNumber: checkGroup.data[0].runningNumber,
          queueId: checkGroup.data[0].queueId
        });
      }
    }
    var tmp = null; //คิวแรก [0] ของห้องนั้นๆ (this.state.roomId)
    if (this.state.userType === 1) {
      for (let i = 0; i < this.state.queues.length; i++) {
        if (this.state.queues[i].roomId === this.state.roomId) {
          // เอาคิวของห้องที่อยู่ตอนนี้มาเก็บใน tmp (เอาค่าเดียว)
          tmp = this.state.queues[i];
          break;
        }
      }
    } else if (this.state.userType === 2) {
      tmp = this.state.queues[0];
    }

    var check = false;
    if (this.state.currentQueue.firstName === undefined) {
      //ไม่มีคิวปัจจุบัน
      console.log("ไม่มีคิวปัจจุบัน");
      if (tmp === null) {
        //ในห้องนี้ไม่มีคิว
        console.log("cannot");
      } else {
        //ในห้องนี้มีคิว >> update status q[0] = 3
        console.log(tmp)
        await axios.post("/updateQueue", {
          date: this.state.Date,
          HN: tmp.HN,
          statusId: 3,
          runningNumber: tmp.runningNumber,
          queueId: tmp.queueId
        });
        this.setState({
          currentQueue: tmp
        })
        check = true;
        // console.log("ห้อง" + this.state.roomId + " /" + tmp.HN);
      }
    } else {
      // มีคิวปัจจุบัน
      console.log("มีคิวปัจจุบัน");
      if (tmp === null || tmp === undefined) {
        //ในห้องนี้ไม่มีคิว >> update status currentQ = 4
        console.log("ไม่มีคิว");
        await axios.post("/updateQueue", {
          date: this.state.Date,
          HN: this.state.currentQueue.HN,
          statusId: 4,
          runningNumber: this.state.currentQueue.runningNumber,
          queueId: this.state.currentQueue.queueId
        });
        this.setState({
          currentQueue: {}
        })
      } else {
        //ในห้องนี้มีคิว >> update status q[0] = 3 , update status currentQ = 4 
        await axios.post("/updateQueue", {
          date: this.state.Date,
          HN: tmp.HN,
          statusId: 3,
          runningNumber: tmp.runningNumber,
          queueId: tmp.queueId
        });
        await axios.post("/updateQueue", {
          date: this.state.Date,
          HN: this.state.currentQueue.HN,
          statusId: 4,
          runningNumber: this.state.currentQueue.runningNumber,
          queueId: this.state.currentQueue.queueId
        });
        this.setState({
          currentQueue: tmp
        })
      }
    }
    this.getQueue();
    this.getListLabQueue();
    this.updateAvgTime();
    console.log("สรุปมีคิวปัจจุบันไหม ", tmp);
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
    let data = this.state.currentQueue;
    if (this.state.userType === 1) {
      return (
        <Segment id="boxshow">
          <List relaxed='very'>
            <List.Item>
              <Icon name="user circle" size='big' />
              <List.Content>
                <List.Header as='h2'>{data.firstName} {' '} {data.lastName}</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="numbered list" size='big' />
              <List.Content>
                <List.Header as='h2'>HN :{data.HN}</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="arrow right" size='big' />
              <List.Content>
                <List.Header as='h2'>Room : {data.roomId}</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="first aid" size='big' />
              <List.Content>
                <List.Header as='h2' >Department : {data.department}</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      );
    } else if (this.state.userType === 2) {
      return (
        <Segment id="boxshow">
          <List relaxed='very'>
            <List.Item>
              <Icon name="user circle" size='big' />
              <List.Content>
                <List.Header as='h2'>{data.firstName} {data.lastName}</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="numbered list" size='big' />
              <List.Content>
                <List.Header as='h2'>HN :{data.HN}</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="arrow right" size='big' />
              <List.Content>
                <List.Header as='h2'>Room : {data.roomId}</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="first aid" size='big' />
              <List.Content>
                <List.Header as='h2'>Message : {data.Forward}</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      )
    }
  };

  forward = async () => {
    // insert Q ของ forward ทั้งหมด ([0] status =1 , [ที่เหลือ] status = 5)
    //check ว่ากลับมาห้องเดิมหรือไม่ >> insert this.state.roomId ที่ queues สุดท้าย desc ถ้าไม่กลับก็ null 
    debugger
    const date = this.pharseDate();
    let doctorAndRoom
    console.log(this.state.forwardDepartments)
    // if (this.state.forwardComeback === true) {
    if (this.state.forwardDepartments.length > 0) {
      let stepCurrent = null;
      let updateWaitStatus = false
      this.state.forwardDepartments.map(async (forward, i) => {
        debugger
        console.log('forward.step ', forward.step)
        if (forward.statusId === 3) {
          stepCurrent = forward.step
        }
        console.log('stepCurrent ', stepCurrent)
        if (this.state.addForwardNew) {
          if (forward.addStatus) {
            //แทรกเข้า db >> add ตัวที่ addstatus เป้น true ต้องรู้ว่าอยู่ i ที่เท่าไหร่ หลังจากนั้นให้อัพเดทเพิ่มเข้าไป (step + เพิ่ม) 
            let tmp = {
              roomId: forward.roomId,
              day: date.day,
              month: date.month,
              year: date.year,
              statusId: stepCurrent && i + 1 === stepCurrent + 1 ? 1 : 5,
              // stepCurrent = 0 >> stepCurrent = 2 ตัวที่เข้ามาจะต้องเชคว่ามี step > 2 ไหม ถ้ามากกว่าอยู่ 1 ให้ status 1 ถ้าไม่ใช้ให้เป๋น 5
              HN: this.state.currentQueue.HN,
              doctorId: forward.doctorId,
              forward: forward.message,
              nurseId: this.state.nurseId,
              departmentId: forward.departmentId,
              queueDefault: 'forwardType',
              groupId: this.state.currentQueue.group,
              roomBack: this.state.forwardComeback === true && i === this.state.forwardDepartments.length - 1 ? this.state.roomId : null,
              step: i + 1
              // date: this.state.Date,
              // timeFormat: time,
            }
            if(tmp.statusId === 1) {
              updateWaitStatus = true
            }
            console.log("forward", forward, tmp)
            //uppdate step สร้าง axios เพิ่ม เอา i ไป 
            // for (let j = i; j < this.state.forwardDepartments.length; j++) {
            // j = 2; j < 4 ; j++
            console.log("currentQueue I ", this.state.currentQueue, i)
            await axios.post("/updateStep", {
              // step: j + 2,
              // // step = 2+2 =4
              index: i,
              group: tmp.groupId

            });
            await axios.post("/addPatientQ", tmp);

            // }
          }
        } else {
          // ไม่มีการอัพเดต (add แรกปกติ)
          let tmp = {
            roomId: forward.roomId,
            day: date.day,
            month: date.month,
            year: date.year,
            statusId: i === 0 ? 1 : 5,
            HN: this.state.currentQueue.HN,
            doctorId: forward.doctorId,
            forward: forward.message,
            nurseId: this.state.nurseId,
            departmentId: forward.departmentId,
            queueDefault: 'forwardType',
            groupId: this.state.currentQueue.group,
            roomBack: i === this.state.forwardDepartments.length - 1 ? this.state.roomId : null,
            step: i + 2
            // date: this.state.Date,
            // timeFormat: time,
          }
          console.log("forward", forward, tmp)
          await axios.post("/addPatientQ", tmp)
          this.getLabQueue(this.state.roomId)
        }
        //updateStatus
        if(stepCurrent && forward.step === stepCurrent + 1 && forward.status != 1 && !updateWaitStatus){
           console.log('update status ',stepCurrent , forward)
          await axios.post("/updateStatus", {
            // HN: this.state.currentQueue.HN,
            statusId: 1,
            // queueId: this.state.currentQueue.queueId,
            runningNumber: forward.runningNumber
          });
        }
      })
      // update status currentQ = 4
      await axios.post("/updateQueue", {
        date: this.state.Date,
        HN: this.state.currentQueue.HN,
        statusId: 4,
        queueId: this.state.currentQueue.queueId,
        runningNumber: this.state.currentQueue.runningNumber
      });
      this.setState({
        currentQueue: {},
        showModal: false,
        HN: "",
        forward: "",
        forwardDepartments: []
      })
    }
    // } 
    // else {
    //   if (this.state.forwardDepartments.length > 0) {
    //     this.state.forwardDepartments.map(async (forward, i) => {
    //       if (forward.addStatus) {
    //         //แทรกเข้า db >> add ตัวที่ addstatus เป้น true ต้องรู้ว่าอยู่ i ที่เท่าไหร่ หลังจากนั้นให้อัพเดทเพิ่มเข้าไป (step + เพิ่ม) 
    //         let tmp = {
    //           roomId: forward.roomId,
    //           day: date.day,
    //           month: date.month,
    //           year: date.year,
    //           statusId: i === 0 ? 1 : 5,
    //           HN: this.state.currentQueue.HN,
    //           doctorId: forward.doctorId,
    //           forward: forward.message,
    //           nurseId: this.state.nurseId,
    //           departmentId: forward.departmentId,
    //           queueDefault: 'forwardType',
    //           groupId: this.state.currentQueue.group,
    //           roomBack: i === this.state.forwardDepartments.length - 1 ? this.state.roomId : null,
    //           step: i + 2
    //           // date: this.state.Date,
    //           // timeFormat: time,
    //         }
    //         console.log("forward", forward, tmp)
    //         await axios.post("/addPatientQ", tmp);
    //         //uppdate step สร้าง axios เพิ่ม เอา i ไป 
    //         for (let j = i; j < this.state.forwardDepartments.length; j++) {
    //           await axios.post("/updateStep", {
    //             step: j + 2,
    //             group: this.state.currentQueue.group

    //           });
    //         }

    //       } else {
    //         let tmp = {
    //           roomId: forward.roomId,
    //           // date: this.state.Date,
    //           day: date.day,
    //           month: date.month,
    //           year: date.year,
    //           // timeFormat: time,
    //           statusId: i === 0 ? 1 : 5,
    //           HN: this.state.currentQueue.HN,
    //           doctorId: forward.doctorId,
    //           forward: forward.message,
    //           nurseId: this.state.nurseId,
    //           departmentId: forward.departmentId,
    //           queueDefault: 'forwardType',
    //           groupId: this.state.currentQueue.group,
    //           roomBack: null,
    //           step: i + 2

    //         }
    //         console.log("forward", forward, tmp)
    //         await axios.post("/addPatientQ", tmp);
    //       }
    //     })
    //   }
    // }

    // }
  }

  //show patient at lab queues
  showPatientLabQueue = () => {
    // const data = this.state.labQueues
    const data = this.state.labQueues
    let tmp = "";
    let dataQueue = this.state.queues.map(queue => (queue.HN))
    let dataCurrentQueue = this.state.currentQueue.HN
    tmp = data
      .filter((queue, i) => queue.roomBack === this.state.roomId
        && queue.HN !== dataQueue[i]
        && queue.HN !== dataCurrentQueue
        && queue.statusId !== 4
      )
      .map(queue => (
        <List divided horizontal
          style={{
            backgroundColor: "white",
            width: "100%",
            borderBottom: "1px solid #E0E0E0",
            padding: "5px"
          }}>
          <List.Item>
            <List.Header
              style={{ fontSize: "36px", color: "teal", paddingLeft: "3%" }}>
              {queue.queueId}
            </List.Header>
          </List.Item>
          <List.Item>
            <List.Header style={{ fontSize: "16px", marginTop: "2%" }}>
              Name : {queue.firstName} {queue.lastName}
            </List.Header>
            <List.Content style={{ fontSize: "16px", marginTop: "3%" }}>
              HN: {queue.HN}

              <List.Content floated="right">
                <Icon
                  className="circle "
                  color="orange"
                  style={{ marginTop: "5%" }}
                />
              </List.Content>
            </List.Content>
          </List.Item>
        </List>
      ))
    // }

    return tmp

  };

  addMoreForward = async () => {
    console.log(this.state.forwardDoctorId)
    console.log('forward forward', this.state.forwardDepartments)
    let getRoomAndDoctors = this.state.forwardDoctorId.split('/')
    let tmp = {
      type: this.state.forwardType,
      departmentId: this.state.forwardDepartmentId,
      doctorId: getRoomAndDoctors[0],
      roomId: getRoomAndDoctors[1],
      message: this.state.forwardMessage,
      editStatus: false,
      departmentOption: this.state.forwardType === "Department" ? this.state.allDepartment : this.state.allLab,
      doctorOption: this.state.forwardRoomAndDoctors,
      addStatus: true
    }
    await this.setState({
      forwardDepartments: [...this.state.forwardDepartments, tmp],
      forwardType: "",
      forwardDepartmentId: "",
      forwardDoctorId: " ",
      forwardMessage: "",
      // forwardComeback: null,
      forwardRoomAndDoctors: []
    })
    console.log(this.state.forwardDepartments)
  }

  // setValueInArray = (index, attr, value) => {
  //   let arr = this.state.forwardDepartments
  //   arr[index][attr] = value;
  //   this.setState({ forwardDepartments: arr })
  // }

  //------------------------------------------------------
  showDropdownDepartment = () => {
    let tmp = <div>
      <center>
        <Menu compact style={{ width: '100%' }}>
          {/* <Dropdown.Menu>  */}
          <Dropdown style={{ border: 'none', maxWidth: '30%', minWidth: '30%', margin: '1px' }}
            selection
            placeholder="Department/Lab"
            options={labOrDepartment}
            onChange={async (e, { value }) => {
              this.setState({ forwardType: value })
            }} />
          <Dropdown style={{ border: 'none', maxWidth: '35%', minWidth: '35%', margin: '1px' }}
            disabled={
              this.state.forwardType === "Department" || this.state.forwardType === "Lab" ? false : true
            }
            search
            selection
            placeholder="Department or Lab"
            options={this.state.forwardType === "Department" ? this.state.allDepartment : this.state.allLab}
            onChange={async (e, { value }) => {
              this.setState({
                forwardDepartmentId: value,
                forwardRoomAndDoctors: await this.doctorInDepartment(value)
              })
            }} />
          <br />
          <Dropdown style={{ border: 'none', margin: '1px', maxWidth: '35%', minWidth: '34%' }}
            disabled={this.state.forwardRoomAndDoctors.length === 0}
            search
            selection
            placeholder="Room and Doctor"
            options={this.state.forwardRoomAndDoctors}
            onChange={async (e, { value }) => {
              this.setState({
                forwardDoctorId: value,
              })
            }} />
          {/* </Dropdown.Menu > */}
        </Menu >
      </center>

      <TextArea
        style={{
          height: '100px', width: "60%", padding: "10px",
          marginRight: "20%", marginLeft: '20%', marginTop: "5%",
          borderRadius: "5px", border: "1px solid #dededf", marginBottom: '2%'
        }}
        placeholder="Tell us more"
        onChange={async (e, { value }) => {
          this.setField("forwardMessage", value);
        }} />
      <center>
        <Button color="teal" style={{ marginTop: '2%' }}
          onClick={() => { this.addMoreForward(); }}>
          Add to List
        </Button>
        <Divider horizontal>Or</Divider>
        <Label color='teal' style={{ marginRight: '2%' }}>ต้องการให้คนไข้กลับมาที่ห้องเดิมหรือเสร็จสิ้น</Label>
        <Radio
          style={{ paddingRight: '40px' }}
          label='Come back'
          name='checkComeOrNot'
          value={true}
          checked={this.state.forwardComeback === true}
          onChange={async (e, { value }) => {
            this.setState({ forwardComeback: value, })
          }}>
          {/* <Dropdown
            selection
            option={}
            >
          </Dropdown> */}
        </Radio>
        <Radio
          label='Finished'
          name='checkComeOrNot'
          value={false}
          checked={this.state.forwardComeback === false}
          onChange={async (e, { value }) => {
            this.setState({ forwardComeback: value, })
          }} >
        </Radio>
      </center>

    </div >
    return tmp
  }
  //------------------------------------------------------
  deleteListForward = (i) => {
    console.log(this.state.forwardDepartments)
    console.log('เข้า DELETE')
    let tmp = this.state.forwardDepartments
    if (tmp.length > 0) {
      tmp.splice(i, 1)
    }
    console.log(tmp)
    console.log(this.state.forwardDepartments)
    this.setState({
      forwardDepartments: tmp
    })
  }

  openConfirm = (i) => {
    console.log(this.state.forwardDepartments)
    console.log('เข้า Confirm')
    let swl = ''
    swl = swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.deleteListForward(i)
          swal("List has been deleted!", {
            icon: "success",
          });
        }
      });
    return swl
  }
  //----------- Edit DropdownList Before Forward-----------
  editStatus = (i, status, dep = null) => {
    let tmp = this.state.forwardDepartments;
    if (dep) {
      // เปลี่ยนให้มันแก้ไข้ได้ เป็น dropdown 
      tmp[i] = dep
    }
    tmp[i].editStatus = status
    console.log(tmp)
    this.setState({
      forwardDepartments: tmp
    })
  }
  editForward = (field, value, i) => {
    let tmp = this.state.forwardDepartments;
    tmp[i][field] = value
    this.setState({
      forwardDepartments: tmp
    })
  }
  //-----------------------------------------
  addList = (i) => {

    this.state.forwardDepartments.splice(i + 1, 0, { editStatus: true, addStatus: true })
    this.setState({
      forwardDepartments: this.state.forwardDepartments,
      addForwardNew: true
    })
    console.log(this.state.forwardDepartments)
  }
  //---------------
  showListDepartment = () => {
    console.log(this.state.forwardDepartments)
    if (this.state.forwardDepartments.length > 0) {
      let tmp = this.state.forwardDepartments.map((dep, i) => {
        // let getRoomAndDoctors = dep.doctorId.split('/')
        console.log(i, dep)
        let label = dep.addStatus ? <Label as='a' color='yellow' ribbon>
          New </Label> : ''
        if (!dep.editStatus) {
          return <Table.Row key={i}>
            <Table.Cell>{label}{dep.type}</Table.Cell>
            <Table.Cell>{dep.departmentId}</Table.Cell>
            <Table.Cell >{dep.doctorId} / {dep.roomId}</Table.Cell>
            <Table.Cell>{dep.message}</Table.Cell>
            <Table.Cell>
              <Icon name='pencil' color="orange"
                onClick={() => this.editStatus(i, true)} />
              <Icon name="trash" color="red"
                onClick={() => this.openConfirm(i)} />
              <Icon name="plus" color="green"
                onClick={() => this.addList(i)} />
            </Table.Cell>
          </Table.Row>

        }
        else {
          return <Table.Row key={i}>
            <Table.Cell>
              <Dropdown
                style={{ maxWidth: '50%', minWidth: '50%' }}
                value={dep.type}
                placeholder="Department/Lab"
                options={labOrDepartment}
                onChange={async (e, { value }) => {
                  dep.type = value
                  this.editForward('type', value, i)
                }} />
            </Table.Cell>
            <Table.Cell>
              <Dropdown
                style={{ maxWidth: '40%', minWidth: '40%' }}
                value={dep.departmentId}
                placeholder="Department or Lab"
                options={dep.type === "Department" ? this.state.allDepartment : this.state.allLab}
                onChange={async (e, { value }) => {
                  this.editForward('departmentId', value, i)
                  this.editForward('doctorOption', await this.doctorInDepartment(value), i)
                }} />
            </Table.Cell>
            <Table.Cell >
              <Dropdown
                style={{ maxWidth: '60%', minWidth: '60%' }}
                value={dep.doctorId + '/' + dep.roomId}
                placeholder="Room and Doctor"
                options={dep.doctorOption}
                onChange={async (e, { value }) => {
                  let tmp = value.split('/')
                  this.editForward('doctorId', tmp[0], i)
                  this.editForward('roomId', tmp[1], i)
                }} />
            </Table.Cell>
            <Table.Cell>
              <TextArea
                placeholder="Tell us more"
                value={dep.message}
                onChange={async (e, { value }) => {
                  this.editForward('message', value, i)
                }} />
            </Table.Cell>
            <Table.Cell>
              <Icon name='save' color="green"
                onClick={() => this.editStatus(i, false, dep)} />
              <Icon className="cancel" color='red' />
            </Table.Cell>
          </Table.Row>
        }

      })

      return tmp
    }
  }


  render() {
    return (
      <div style={{ backgroundImage: 'url(https://www.picz.in.th/images/2018/10/11/kum9gq.png)' }}>
        <Headerbar
          loginName={this.state.loginName}
        />
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
        // handleAdditio={this.handleAddition}
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
          currentQueue={this.state.currentQueue}
          queues={this.state.queues}
          allLab={this.state.allLab}
          typeForward={this.state.typeForward}
          roomAndDoctors={this.state.roomAndDoctors}
          doctorRooms={this.state.doctorRooms}
          userType={this.state.userType}
          // forwardDepartments={this.state.forwardDepartments}
          // departmentId={this.state.departmentId}
          // departments={this.state.departments}
          // doctors={this.state.doctors}
          // allDepartment={this.state.allDepartment}
          // forwardId={this.state.forwardId}
          // forwardLabId={this.state.forwardLabId}
          // forwardDepartmentId={this.state.forwardDepartmentId}
          // message={this.state.message}
          // addForward={this.state.addForward}
          // amountDepartment={this.state.amountDepartment}


          //Method
          renderModal={this.renderModal}
          forward={this.forward}
          validateHN={this.validateHN}
          setField={this.setField}
          addQueue={this.addQueue}
          showPatient={this.showPatient}
          getPatientName={this.getPatientName}
          callPatient={this.callPatient}
          checkDoctorWithRoom={this.checkDoctorWithRoom}
          showPatientLabQueue={this.showPatientLabQueue}
          addMoreForward={this.addMoreForward}
          showListDepartment={this.showListDepartment}
          showDropdownDepartment={this.showDropdownDepartment}
          forwardList={this.forwardList}
        // setState={this.setState}
        // setValueInArray={this.setValueInArray}
        // goBack={this.goBack}
        // showModalMessage={this.showModalMessage}


        />
        <br />
        <br />
      </div >
    );
  }
}
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
