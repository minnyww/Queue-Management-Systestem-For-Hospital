import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Headerbar from "./../components/headerbar";
import * as R from 'ramda'
import DropdownQueue from "./../components/Dropdown";
import Modal from 'react-responsive-modal';
import swal from 'sweetalert'
import {
  Grid, Button, Form, List, Label,
  Dropdown, Menu, Header, Icon, Divider, Message, Segment, Card, Responsive, Image
} from "semantic-ui-react";

import axios from "./../lib/axios";

import moment from "moment";
import "./../css/Q.css";
import error from './../img/drug.png'

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";

import FormAddAppointment from "../components/formAddAppointment";
import ModalDetailAppointment from "../components/modalDetailAppointment";
import { consolidateStreamedStyles } from "styled-components";

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Appointment extends Component {

  state = {
    events: [],
    prepareEvents: {},
    doctorId: 0,
    doctors: [{ key: "", text: "", value: "" }],
    startTime: "",
    endTime: "",
    Date: new Date(),
    HN: "",
    appointment: [],
    timetable: [],
    queues: [],
    selectEvent: 0,
    errorHN: "",
    errorGetName: '',
    errorAdd: '',
    addSuccess: false,
    editStatus: false,
    loginName: '',
    allPatient: [],
    dropdownValue: '',

    //check Limit
    sumQueueCountLimit: 0,
    doctorWithRemaining: {},

    departmentId: 0,
    roomId: 0,
    appointmentDepId: 0,
    namePatient: '',
    lastNamePatient: '',

    doctors: [{ key: "", text: "", value: "" }],
    //loading
    loading: false,

    //Modal
    open: false,
    openDetail: false,
    openConfirm: false
  };

  constructor(props) {
    super(props);
    this.moveEvent = this.moveEvent.bind(this);
  }

  componentWillMount = async () => {
    const { empId, departmentId, type } = JSON.parse(localStorage.getItem('userData'))
    const userData = JSON.parse(localStorage.getItem('userData'))
    const date = this.pharseDate(new Date());

    this.setState({ loading: true })
    var { data } = await axios.get(`/getAppointment/${departmentId}`)
    const appData = data.map(app => {
      return {
        start: new Date(`${app.month} ${app.date}, ${app.year} ${app.timeStart}`),
        end: new Date(`${app.month} ${app.date}, ${app.year} ${app.timeEnd}`),
        title: app.HN,
        id: app.appointmentId,
        doctorId: app.doctorId
      }
    })

    var timeTableData = await axios.post(`/getTimetable`, {
      month: date.month,
      departmentId: departmentId
    });
    var dataPatient = await axios.get(`/getPatient`);
    this.setState({
      loading: false,
      events: appData,
      appointment: data,
      timetable: timeTableData.data,
      nurseId: empId,
      departmentId,
      userType: type,
      loginName: userData,
      allPatient: dataPatient.data,
    })

    const doctors = await axios.post(`/getListDoctor`, {
      Date: new Date(this.state.Date).getDate(),
      day: date.day,
      month: date.month,
      year: date.year,
      departmentId: this.state.departmentId
    });

    //เอา count ที่ตารางคิวมา 
    // let getSumQueue = await axios.get(`/getCountQueue/${doctors.data[0].doctorId}`)
    let getSumQueue = await axios.post(`/getCountQueue`, {
      doctorId: doctors.data[0].doctorId,
      date: new Date(this.state.Date)
    })
    var datas = await axios.get(`/getQueue/${doctors.data[0].roomId}`)
    const doctorsOption = this.dropdownDoctors(doctors);
    this.setState({
      doctors: doctorsOption,
      roomId: doctors.data[0].roomId,
      doctorId: doctors.data[0].doctorId,
      sumQueueCountLimit: getSumQueue,
      queues: datas.data
    })
    this.showPatientDescription()
  }




  pharseDate = (newDate) => {
    var months = new Array(
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

    let curr_date = newDate.getDay();
    let curr_month = newDate.getMonth();
    let curr_year = newDate.getFullYear();

    return {
      day: day[curr_date],
      month: months[curr_month],
      year: curr_year,
    }
  }


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
      value: roomDoctor.doctorId + "/" + roomDoctor.roomId
    }));
    return roomAndDoctorOption;
  };


  moveEvent = async ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state;

    const idx = events.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
    }
    const updatedEvent = { ...event, start, end, allDay };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    let result = events.filter(data => (data.title == updatedEvent.title
      && data.start.getDate() == updatedEvent.start.getDate()
      && data.start.getMonth() == updatedEvent.start.getMonth()
      && data.start.getHours() == updatedEvent.start.getHours()
    ))

    //check Count Limit 
    let countAppointment = this.state.timetable.filter(data => data.doctorId == updatedEvent.doctorId
      && data.Date === updatedEvent.start.getDate())

    // let getSumQueue = await axios.get(`/getCountQueue/${updatedEvent.doctorId}`)
    let getSumQueue = await axios.post(`/getCountQueue`, {
      doctorId: updatedEvent.doctorId,
      date: updatedEvent.start
    })
    let getSumAppointment = await axios.post(`/getCountAppointment`, {
      doctorId: updatedEvent.doctorId,
      date: updatedEvent.start.getDate()
    })
    //เอาค่า couunt ของตาราคิวมา
    let sumQueue = getSumQueue.data[0].countQueueId
    //เอาค่า couunt ของตาราง appointment มา 
    let sumAppointment = getSumAppointment.data[0].countAppointmentId
    //เอา count ของสองตารางมารวมกันเพื่อเช็คกับ limit ที่ตาราง timetable 
    let sumCount = sumQueue + sumAppointment

    // let moveAppointment = true
    // const checkCounts = await this.checkCount(updatedEvent.doctorId, moveAppointment, updatedEvent)
    //fail
    debugger
    if (countAppointment[0]) {
      if (sumCount >= this.state.doctorWithRemaining.remaining
      ) {
        //fail
        swal("Cannot!", `HN: ${event.title} cannot move to  
        ${updatedEvent.start.toString().substr(0, 24)} 
        because doctor cant recieve more patient
        `, "warning");
      }
      else if (!R.isEmpty(result) || result.length > 0) {
        swal("Cannot!", `HN: ${event.title} cannot move to  
        ${updatedEvent.start.toString().substr(0, 24)} 
        because duplicate time
        `, "warning");

      }
      else if (updatedEvent.start < this.state.events[idx].start) {
        swal("Cannot!", `HN: ${event.title} cannot move to  
        ${updatedEvent.start.toString().substr(0, 24)} 
        `, "warning");
      }
      else {
        //success
        swal("Success!", `HN: ${event.title} was dropped onto ${updatedEvent.start.toString().substr(0, 24)}`, "success");
        var month = new Array(
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        );
        var day = new Array(7);
        day[0] = "Sun";
        day[1] = "Mon";
        day[2] = "Tue";
        day[3] = "Wed";
        day[4] = "Thu";
        day[5] = "Fri";
        day[6] = "Sat";

        var curr_date = updatedEvent.start.getDay();
        var curr_month = updatedEvent.start.getMonth();
        var curr_year = updatedEvent.start.getFullYear();
        var timeStart = moment(updatedEvent.start, "HH:mm").format("HH:mm");
        var timeEnd = moment(updatedEvent.end, "HH:mm").format("HH:mm");

        this.setState({
          events: nextEvents
        });

        await axios.post("/updateAppointment", {
          date: updatedEvent.start.getDate(),
          day: day[curr_date],
          month: month[curr_month],
          year: curr_year,
          timeStart: timeStart,
          timeEnd: timeEnd,
          appointmentId: updatedEvent.id
        });

      }

    }
    else {
      swal("Cannot!", `HN: ${event.title} cannot move to  
        ${updatedEvent.start.toString().substr(0, 24)} 
        `, "warning");
      //success
    //   swal("Success!", `HN: ${event.title} was dropped onto ${updatedEvent.start.toString().substr(0, 24)}`, "success");
    //   var month = new Array(
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec"
    //   );
    //   var day = new Array(7);
    //   day[0] = "Sun";
    //   day[1] = "Mon";
    //   day[2] = "Tue";
    //   day[3] = "Wed";
    //   day[4] = "Thu";
    //   day[5] = "Fri";
    //   day[6] = "Sat";

    //   var curr_date = updatedEvent.start.getDay();
    //   var curr_month = updatedEvent.start.getMonth();
    //   var curr_year = updatedEvent.start.getFullYear();
    //   var timeStart = moment(updatedEvent.start, "HH:mm").format("HH:mm");
    //   var timeEnd = moment(updatedEvent.end, "HH:mm").format("HH:mm");

    //   this.setState({
    //     events: nextEvents
    //   });

    //   await axios.post("/updateAppointment", {
    //     date: updatedEvent.start.getDate(),
    //     day: day[curr_date],
    //     month: month[curr_month],
    //     year: curr_year,
    //     timeStart: timeStart,
    //     timeEnd: timeEnd,
    //     appointmentId: updatedEvent.id
    //   });
    }
  }


  // resizeEvent = (resizeType, { event, start, end }) => {
  //   const { events } = this.state;

  //   const nextEvents = events.map(existingEvent => {
  //     return existingEvent.id == event.id
  //       ? { ...existingEvent, start, end }
  //       : existingEvent;
  //   });
  //   this.setState({
  //     events: nextEvents
  //   });
  // };

  setField = (field, value) => {
    this.setState({ [field]: value });
  };

  checkTimeFormat = time => {
    if (time.length == 4) {
      var timeHH = time.substring(0, 2);
      var timeMM = time.substring(2, 4);
      var timeNew = timeHH + ":" + timeMM;
      var t = moment(timeNew, "HH:mm").format("HH:mm");
      return t;
    }
  };
  getAppointment = async () => {
    var { data } = await axios.get(`/getAppointment/${this.state.departmentId}`)
    this.setState({
      appointment: data,
    })
  }

  addToQueue = async (i) => {
    // console.log(this.state.selectEvent, new Date(this.state.Date), new Date())
    const datas = await axios.post(`/getDataAppointment`, {
      appointmentId: this.state.selectEvent,
    })
    let getData = datas.data.map(item => {
      return {
        date: item.date,
        day: item.day,
        month: item.month,
        year: item.year,
        doctorId: item.doctorId,
        HN: item.HN
      }
    })
    // console.log(getData)
    const mergeData = await axios.post(`/getDataTimetable`, {
      date: getData[0].date,
      day: getData[0].day.toLowerCase(),
      month: getData[0].month.toLowerCase(),
      year: getData[0].year,
      doctorId: getData[0].doctorId
    })
    // console.log(mergeData)

    const min = this.state.queues.filter(queue => {
      queue.HN === getData[0].HN;
    });

    if (min.length === 0 && new Date(this.state.Date) === new Date()) {
      var checkHNDepartments = await axios.get(
        `/checkHNatDepartment/${this.state.departmentId}`
      );
      const checks = checkHNDepartments.data.filter(
        check => check.HN === getData[0].HN
      );
      // console.log(checks)
      if (checks.length === 0) {
        await axios.post("/addPatientQ", {
          roomId: mergeData.data[0].roomId,
          statusId: 1,
          HN: getData[0].HN,
          doctorId: mergeData.data[0].doctorId,
          nurseId: this.state.nurseId,
          departmentId: this.state.departmentId,
          queueDefault: 'queueDefault',
          step: 1
        })
        swal("Success !",
          `Add to Queue success`,
          "success")
      } else {
        swal("Cannot !",
          `Cannot add to queue`,
          "warning");
      }
    }
    // console.log('suusususus')
  }

  addAppoinment = async () => {

    const date = this.pharseDate(new Date());
    const { events, startTime, endTime, HN, timetable, appointment } = this.state

    if (this.state.appointmentDepId) {
      let tmp = this.state.appointmentDepId.split("/")
      //check Count Limit 
      let countAppointment = timetable.filter(data => data.doctorId == tmp[0]
        && data.Date === new Date(this.state.Date).getDate())
      //check ว่า ใน วันนั้น มีการแอดเวลาซ้ำกันที่หมอเดียวกันหรือป่าว
      let check = appointment.filter(data =>
        // data.doctorId == tmp[0]
        // && 
        data.timeStart.substr(0, 5) == startTime
        && data.date === new Date(this.state.Date).getDate())
      // console.log(check)

      let getSumQueue = await axios.post(`/getCountQueue`, {
        doctorId: tmp[0],
        date: new Date(this.state.Date)
      })
      // console.log(getSumQueue)
      let getSumAppointment = await axios.post(`/getCountAppointment`, {
        doctorId: tmp[0],
        date: new Date(this.state.Date).getDate()
      })
      //เอาค่า couunt ของตาราคิวมา
      let sumQueue = getSumQueue.data[0].countQueueId
      //เอาค่า couunt ของตาราง appointment มา 
      let sumAppointment = getSumAppointment.data[0].countAppointmentId
      //เอา count ของสองตารางมารวมกันเพื่อเช็คกับ limit ที่ตาราง timetable 
      let sumCount = sumQueue + sumAppointment
      // console.log(sumCount)

      var checkHNDepartments = await axios.get(
        `/checkHNatDepartment/${this.state.departmentId}`
      );
      const checks = checkHNDepartments.data.filter(
        check => check.HN === this.state.HN
      );

      debugger
      if (check.length > 0 || sumCount > this.state.doctorWithRemaining.remaining
        // || this.state.HN === "" || this.state.Date === "" || this.state.startTime === ""
        // || this.state.endTime === ""
      ) {
        swal("Cannot !",
          `Cannot add Appointment because doctor can't recieve more patient 
          Or Appointment time is duplicate in other doctor`,
          "warning");
      }
      else if (checks.length === 0) {
        const data = await axios.post("/addAppointment", {
          date: new Date(this.state.Date).getDate(),
          day: date.day,
          month: date.month,
          year: date.year,
          startTime: startTime,
          endTime: endTime,
          doctorId: tmp[0],
          roomId: tmp[1],
          HN
        });
        await this.setState({
          open: false,
          startTime: '',
          endTime: ' ',
          HN: '',
          addSuccess: true,
          errorAdd: { status: false, message: "" }
        });
        // console.log("เข้า DB");
      }
      else {
        this.setState({
          errorAdd: { status: true, message: "Cannot Add HN To Queue" }
        });
      }
    }
    else if (!this.state.appointmentDepId === 0) {
      swal("Cannot !",
        `Cannot add Appointment`,
        "warning");
    }
    else {
      swal("Cannot !",
        `Cannot add Appointment`,
        "warning");
    }
    await this.getEvents()
    await this.getAppointment()
  };

  handleSelect = async ({ start }) => {
    this.setState({
      Date: moment(start).format('YYYY-MM-DD'),
      // open: true
    })
    const date = this.pharseDate(new Date(this.state.Date))
    console.log(new Date(this.state.Date))
    console.log(new Date())

    if (new Date(this.state.Date) > new Date()) {
      const doctors = await axios.post(`/getListDoctor`, {
        Date: new Date(this.state.Date).getDate(),
        day: date.day,
        month: date.month,
        year: date.year,
        departmentId: this.state.departmentId
      });
      // console.log(doctors)
      const doctorsOption = this.dropdownDoctors(doctors);
      this.setState({
        doctors: doctorsOption,
        // doctorWithRemaining: doctors.data
      })

      //, doctorWithRemaining: doctors.data
      this.setState({ open: true })
      // console.log(this.state.doctorWithRemaining)
    }
    else {
      this.setField("open", false)
      swal("Cannot !",
        `Cannot add Appointment before Today`,
        "warning");
    }
  };

  showDetailAppointment = async (e) => {
    // console.log(e)
    this.setState({
      openDetail: true,
      selectEvent: e.id,
      Date: moment(e.start).format('YYYY-MM-DD'),
      HN: e.title
    })
    // console.log(this.state.HN)
  };

  showPatientDescription = () => {
    const { appointment, selectEvent, editStatus } = this.state
    let tmp = ""
    tmp = appointment.filter(data => data.appointmentId === selectEvent)
      .map((data, index) => {
        if (!editStatus) {
          return <div key={index}>
            <Header as='h4' style={{ marginTop: 5, fontSize: '24px' }}>
              {data.firstName} {data.lastName}
            </Header>
            <Label color="teal" style={{ fontSize: '13px' }}>
              <Icon className='time' />From : {data.timeStart.substr(0, 5)} To {data.timeEnd.substr(0, 5)}
            </Label>
            <List relaxed style={{ padding: '10px' }}>
              <List.Item>
                <List.Icon name='user' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as="h4">HN : {data.HN}</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='doctor' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as="h4">Doctor : {data.firstname} {data.lastname}  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='building' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as="h4">Department : {data.department}</List.Header>
                </List.Content>
              </List.Item>
              <List.Item >
                <List.Content floated='right' >
                  <Button color='teal' size='tiny'
                    onClick={() => this.addToQueue()}>
                    Add to queue
                  </Button>
                </List.Content>
              </List.Item>
            </List>
            <Divider />
            <center>
              <List horizontal divided relaxed='very'>
                <List.Item >
                  <List.Content >
                    <List.Header
                      onClick={() => this.setField("editStatus", true)}>
                      <Icon name="pencil" size='small' style={{ fontSize: '16px' }}></Icon>
                      Edit
                </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item >
                  <List.Content>
                    <List.Header onClick={() => this.openConfirm()}>
                      <Icon name="trash" size='small' style={{ fontSize: '16px' }}></Icon>
                      delete
                </List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </center>
          </div>
        }
        else {
          return <div key={index}>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column >
                  <Menu pointing color='teal' >
                    <Menu.Item name='Doctors' active={true} />
                    <Menu.Item name='Appointment Remaining' style={{ width: '100%' }} />
                  </Menu>
                  <Menu vertical fluid>
                    {this.listDoctors()}
                  </Menu>
                </Grid.Column>
                <Grid.Column>
                  <Form style={{ width: "100%" }}>
                    <Form.Input
                      fluid
                      required
                      name='HN'
                      placeholder="Enter HN"
                      value={this.state.HN}
                      onChange={(e, { value }) => this.setField("HN", value)}
                      onBlur={() => this.validateHN()}

                    />

                    <Form.Input
                      type="date"
                      fluid
                      defaultValue={this.state.Date}
                      onChange={(e, { value }) => this.setField("Date", value)}
                    />
                    <Form.Group widths='equal' style={{ width: '67%' }}>
                      <Form.Input
                        required
                        label="Start"
                        type="time"
                        placholder='time start'
                        value={this.state.startTime}
                        onChange={(e, { value }) => this.setField("startTime", value)}
                      />
                      <Form.Input
                        required
                        label="End"
                        type="time"
                        placholder='time end'
                        value={this.state.endTime}
                        onChange={(e, { value }) => this.setField("endTime", value)}
                      />
                    </Form.Group>
                  </Form>
                  <br />
                  <Label color='teal' style={{ marginRight: 10 }}>Choose Doctor :</Label>
                  <Dropdown
                    placeholder="Doctor"
                    options={this.state.doctors}
                    simple
                    selection
                    item
                    onChange={(e, { value }) => {
                      this.setField("appointmentDepId", value)
                      this.checkCount(value, false, undefined)
                    }}
                  />
                  <br />
                  <br />
                  <Button
                    size='small'
                    color='blue'
                    style={{ marginTop: 5, float: 'right' }}
                    onClick={() => {
                      this.setField('editStatus', false)
                      this.setField('open', false)
                      this.setField('openDetail', false)
                      this.updateAppoinment();
                    }}
                  >
                    Update
                    </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div >
        }
      })
    return tmp
  }
  updateAppoinment = async () => {

    var month = new Array(
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    );
    var day = new Array(7);
    day[0] = "Sun";
    day[1] = "Mon";
    day[2] = "Tue";
    day[3] = "Wed";
    day[4] = "Thu";
    day[5] = "Fri";
    day[6] = "Sat";

    var curr_date = new Date(this.state.Date).getDay();
    var curr_month = new Date(this.state.Date).getMonth();
    var curr_year = new Date(this.state.Date).getFullYear();

    let getDoctor
    let sumQueue
    let sumAppointment
    let sumCount
    if (this.state.appointmentDepId) {
      getDoctor = this.state.appointmentDepId.split('/')

      //check couunt ว่าทั้งหมดมีเท่าไหร่ของหมดคนที่เืลือก Dropdown มีค่าเสมอ เอาตัวแปรไป .patientLimit
      let countAppointment = this.state.timetable.filter(data => data.doctorId == getDoctor[0]
        && data.Date === new Date(this.state.Date).getDate())
      // console.log('timetable', countAppointment)

      //ดึงค่า count จาก db มาเช็ค 
      let getSumQueue = await axios.post(`/getCountQueue`, {
        doctorId: getDoctor[0],
        date: new Date(this.state.Date)
      })
      let getSumAppointment = await axios.post(`/getCountAppointment`, {
        doctorId: getDoctor[0],
        date: new Date(this.state.Date).getDate()
      })

      //เอาค่า count ของ ตารางคิวมา
      sumQueue = getSumQueue.data[0].countQueueId
      //เอาค่า count  ของ ตาราง appointment มา 
      sumAppointment = getSumAppointment.data[0].countAppointmentId
      //เอาสองค่ามารวมกัน เพื่อเช็คว่ามีค่ามากกว่า countAppointment.patientLimit ไหม ถ้ามากกว่าจะไม่ให้แอด 
      sumCount = sumQueue + sumAppointment
      // console.log('count ท้้งหมด', sumCount)

      await this.checkCount(getDoctor[0], false, undefined)
      // console.log(this.state.doctorWithRemaining)
    } else {
      swal("Cannot!", `Please fill out this form completely or doctor cant recive more patient`, "warning");
    }

    // console.log(sumCount, this.state.doctorWithRemaining.remaining)

    if (this.state.HN == "" || this.state.startTime == ""
      || this.state.endTime == ""
      || this.state.appointmentDepId == 0 || sumCount > this.state.doctorWithRemaining.remaining) {
      swal("Cannot!", `Please fill out this form completely or doctor cant recive more patient`, "warning");
      this.setState({
        editStatus: true,
        openDetail: true
      })
    }
    else {

      swal("Success!", `HN: ${this.state.HN} was update  ${this.state.startTime}`, "success");
      // console.log('เข้า up')
      const data = await axios.post("/updateAppointment", {
        date: new Date(this.state.Date).getDate(),
        day: day[curr_date],
        month: month[curr_month],
        year: curr_year,
        timeStart: this.state.startTime,
        timeEnd: this.state.endTime,
        appointmentId: this.state.selectEvent,
        doctorId: getDoctor[0],
        HN: this.state.HN
      });
      await this.getEvents()
      await this.getAppointment()
      // console.log('data update' + data)
    }
    // console.log('out')
  }

  openConfirm = () => {
    // console.log('เข้า Confirm')
    let swl = ''
    swl = swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await this.deleteAppointment()
        }
      });
    return swl
  }
  getEvents = async () => {
    // console.log('เข้า get Eve')
    var { data } = await axios.get(`/getAppointment/${this.state.departmentId}`)
    const appData = data.map(app => {
      return {
        start: new Date(`${app.month} ${app.date}, ${app.year} ${app.timeStart}`),
        end: new Date(`${app.month} ${app.date}, ${app.year} ${app.timeEnd}`),
        title: app.HN,
        id: app.appointmentId,
        doctorId: app.doctorId
      }
    })
    this.setState({
      events: appData,
    })
  }

  deleteAppointment = () => {
    // console.log("เข้า ลบ")
    this.setState({
      openDetail: false,
    })
    axios.delete(`/deleteAppointment/${this.state.selectEvent}`)
      .then(resp => {
        // console.log('success')
        this.getEvents()
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      }).catch(err => {
        // console.log('error')
      })
  }


  validateHN = async () => {
    if (this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.getName(this.state.HN);
    } else if (!this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.setState({
        errorHN: { status: true, message: "HN Does not match" },
        namePatient: "",
        lastNamePatient: "",
        errorGetName: { status: false, message: "" },
        errorAdd: { status: false, message: "" }
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
        errorGetName: { status: false, message: "" },
        errorAdd: { status: false, message: "" }
      });
    } else {
      this.setState({
        namePatient: "",
        lastNamePatient: "",
        errorGetName: { status: true, message: "" },
        errorHN: { status: false, message: "" },
        errorAdd: { status: false, message: "" }
      });
    }
  };



  listDoctors = () => {
    const { timetable, doctorWithRemaining } = this.state
    let tmp = ''
    let getDoctor = this.state.appointmentDepId.toString().split('/')
    this.checkCount()
    if (!doctorWithRemaining[0]) {
    }
    else {
      tmp =
        <div >
          <Menu.Item>
            {doctorWithRemaining[0].firstname} {doctorWithRemaining[0].lastname}
            <Label style={{ marginRight: '20px' }} color='teal'>{this.state.doctorWithRemaining.remaining <= 0
              || this.state.doctorWithRemaining.remaining == null ? 0 : this.state.doctorWithRemaining.remaining}
            </Label>
            <Label style={{ marginRight: '30px' }} color='blue'>{doctorWithRemaining[0].patientLimit == 0
              || doctorWithRemaining[0].patientLimit == null ? 0 : doctorWithRemaining[0].patientLimit}
            </Label>
          </Menu.Item>
        </div>
    }
    return tmp
  }

  checkCount = async (doctorId, statusMove, updatedEvent) => {
    debugger
    if (updatedEvent !== undefined) {
      var month = new Array(
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      );
      var day = new Array(7);
      day[0] = "Sun";
      day[1] = "Mon";
      day[2] = "Tue";
      day[3] = "Wed";
      day[4] = "Thu";
      day[5] = "Fri";
      day[6] = "Sat";

      var curr_date = updatedEvent.start.getDay();
      var curr_month = updatedEvent.start.getMonth();
      var curr_year = updatedEvent.start.getFullYear();

      if (statusMove && doctorId) {
        let getDoctor = doctorId.toString().split('/')
        const date = this.pharseDate(new Date(this.state.Date))
        const doctors = await axios.post(`/getRemainingDoctor`, {
          Date: updatedEvent.start.getDate(),
          day: day[curr_date].toLowerCase(),
          month: month[curr_month].toLowerCase(),
          year: curr_year,
          departmentId: this.state.departmentId,
          doctorId: getDoctor[0]
        });
        this.setState({
          doctorWithRemaining: doctors.data
        })
      }
    } else if (!statusMove && doctorId) {
      let getDoctor = doctorId.toString().split('/')
      const date = this.pharseDate(new Date(this.state.Date))
      const doctors = await axios.post(`/getRemainingDoctor`, {
        Date: new Date(this.state.Date).getDate(),
        day: date.day,
        month: date.month,
        year: date.year,
        departmentId: this.state.departmentId,
        doctorId: getDoctor[0]
      });
      this.setState({
        doctorWithRemaining: doctors.data
      })
    }
    else if (!doctorId) {
    } else {
      let getDoctor = doctorId.toString().split('/')
      const date = this.pharseDate(new Date(this.state.Date))
      const doctors = await axios.post(`/getRemainingDoctor`, {
        Date: new Date(this.state.Date).getDate(),
        day: date.day,
        month: date.month,
        year: date.year,
        departmentId: this.state.departmentId,
        doctorId: getDoctor[0]
      });
      this.setState({
        doctorWithRemaining: doctors.data
      })
    }
  }

  // onEventResize = (type, { event, start, end, allDay }) => {
  //   this.setState(state => {
  //     state.events[0].start = start;
  //     state.events[0].end = end;
  //     return { events: state.events };
  //   });
  // };

  logOut = () => {
    localStorage.removeItem('userData');
  }

  render() {
    return (
      <div>
        <div style={{ width: '100%' }}>
          <Responsive  {...Responsive.onlyComputer}>
            <Headerbar
              loginName={this.state.loginName}
              logOut={this.logOut}
            />
            <DropdownQueue
              // departmentId={this.state.departmentId}
              dropdownValue={this.state.dropdownValue}
              setField={this.setField} />
            <Modal
              center
              styles={{ modal: { width: 800, top: '10%', borderRadius: '10px' } }}
              open={this.state.open}
              onClose={() => { this.setField("open", false) }}>
              <FormAddAppointment
                //state
                events={this.state.events}
                Date={this.state.Date}
                doctorId={this.state.doctorId}
                doctors={this.state.doctors}
                currentDate={this.state.currentDate}
                startTime={this.state.startTime}
                endTime={this.state.endTime}
                HN={this.state.HN}
                errorHN={this.state.errorHN}
                errorGetName={this.state.errorGetName}
                errorAdd={this.state.errorAdd}
                namePatient={this.state.namePatient}
                lastNamePatient={this.state.lastNamePatient}
                //method
                setField={this.setField}
                addAppoinment={this.addAppoinment}
                checkTimeFormat={this.checkTimeFormat}
                validateHN={this.validateHN}
                listDoctors={this.listDoctors}
                // chooseDoctor={this.chooseDoctor}
                checkCount={this.checkCount}
              />

            </Modal>
            <Modal
              center
              styles={{ modal: { width: this.state.editStatus ? 800 : 400, top: "20%", borderTop: '6px solid #00b5ad' } }}
              open={this.state.openDetail}
              onClose={() => { this.setField("openDetail", false), this.setField('editStatus', false) }}>
              <ModalDetailAppointment
                showPatientDescription={this.showPatientDescription} />
            </Modal>
            <center>
              {!this.state.loading &&
                <DragAndDropCalendar
                  events={this.state.events}
                  style={{
                    height: '90vh',
                    width: '95%',
                    marginBottom: "5%",
                    marginTop: "2%"
                  }}
                  selectable
                  events={this.state.events}
                  onEventDrop={this.moveEvent}
                  resizable
                  onEventResize={this.onEventResize}
                  defaultView={BigCalendar.Views.MONTH}
                  defaultDate={this.state.date}
                  onSelectEvent={e => this.showDetailAppointment(e)}
                  onSelectSlot={this.handleSelect}
                />}
            </center>
          </Responsive>
        </div>

        <div style={{ width: '100%' }}>
          <Responsive  {...Responsive.onlyTablet}>
            <Headerbar
              loginName={this.state.loginName}
              logOut={this.logOut}
            />
            <DropdownQueue
              // departmentId={this.state.departmentId}
              dropdownValue={this.state.dropdownValue}
              setField={this.setField} />
            <Modal
              center
              styles={{ modal: { width: 800, top: '10%', borderRadius: '10px' } }}
              open={this.state.open}
              onClose={() => { this.setField("open", false) }}>
              <FormAddAppointment
                //state
                events={this.state.events}
                Date={this.state.Date}
                doctorId={this.state.doctorId}
                doctors={this.state.doctors}
                currentDate={this.state.currentDate}
                startTime={this.state.startTime}
                endTime={this.state.endTime}
                HN={this.state.HN}
                errorHN={this.state.errorHN}
                errorGetName={this.state.errorGetName}
                errorAdd={this.state.errorAdd}
                namePatient={this.state.namePatient}
                lastNamePatient={this.state.lastNamePatient}
                //method
                setField={this.setField}
                addAppoinment={this.addAppoinment}
                checkTimeFormat={this.checkTimeFormat}
                validateHN={this.validateHN}
                listDoctors={this.listDoctors}
                // chooseDoctor={this.chooseDoctor}
                checkCount={this.checkCount}
              />

            </Modal>
            <Modal
              center
              styles={{ modal: { width: this.state.editStatus ? 800 : 400, top: "20%", borderTop: '6px solid #00b5ad' } }}
              open={this.state.openDetail}
              onClose={() => { this.setField("openDetail", false), this.setField('editStatus', false) }}>
              <ModalDetailAppointment
                showPatientDescription={this.showPatientDescription} />
            </Modal>
            <center>
              {!this.state.loading &&
                <DragAndDropCalendar
                  events={this.state.events}
                  style={{
                    height: '90vh',
                    width: '95%',
                    marginBottom: "5%",
                    marginTop: "2%"
                  }}
                  selectable
                  events={this.state.events}
                  onEventDrop={this.moveEvent}
                  resizable
                  onEventResize={this.onEventResize}
                  defaultView={BigCalendar.Views.MONTH}
                  defaultDate={this.state.date}
                  onSelectEvent={e => this.showDetailAppointment(e)}
                  onSelectSlot={this.handleSelect}
                />}
            </center>
          </Responsive>
        </div>
        <Responsive {...Responsive.onlyMobile}>
          <Headerbar />
          <center>
            <Card>
              <Image src={error} />
              <Card.Content>
                <Card.Header>Don't Support</Card.Header>
                <Card.Meta>Queue Management System</Card.Meta>
                <Card.Description>Don't Support on mobile screen</Card.Description>
              </Card.Content>
              <Card.Content extra>
              </Card.Content>
            </Card>
          </center>
        </Responsive>
      </div>
    );
  }
}

// const Calendar = DragDropContext(HTML5Backend)(Appointment);
export default Appointment;
