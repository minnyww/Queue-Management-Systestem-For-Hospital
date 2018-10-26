import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Headerbar from "./../components/headerbar";

import DropdownQueue from "./../components/Dropdown";
import Modal from 'react-responsive-modal';
import swal from 'sweetalert'
import {
  Grid, Button, Form, List, Label,
  Dropdown, Menu, Header, Icon, Divider, Message, Segment
} from "semantic-ui-react";

import axios from "./../lib/axios";

import moment from "moment";
import "./../css/Q.css";

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
    selectEvent: 0,
    errorHN: "",
    addSuccess: false,
    editStatus: false,

    //check Limit
    sumQueueCountLimit: 0,
    doctorWithRemaining: {},

    departmentId: 0,
    roomId: 0,
    appointmentDepId: 0,

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

    this.setState({
      loading: false,
      events: appData,
      appointment: data,
      timetable: timeTableData.data,
      nurseId: empId,
      departmentId,
      userType: type
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

    const doctorsOption = this.dropdownDoctors(doctors);
    this.setState({
      doctors: doctorsOption,
      roomId: doctors.data[0].roomId,
      doctorId: doctors.data[0].doctorId,
      sumQueueCountLimit: getSumQueue
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
    console.log(doctors)
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

    console.log(events, updatedEvent)
    let result = events.filter(data => (data.title == updatedEvent.title
      && data.start.getDate() == updatedEvent.start.getDate()
      && data.start.getMonth() == updatedEvent.start.getMonth()
      && data.start.getHours() == updatedEvent.start.getHours()
    ))

    //check Count Limit 
    let countAppointment = this.state.timetable.filter(data => data.doctorId == updatedEvent.doctorId
      && data.Date === updatedEvent.start.getDate())
    console.log('timetable count', countAppointment)

    // let getSumQueue = await axios.get(`/getCountQueue/${updatedEvent.doctorId}`)
    let getSumQueue = await axios.post(`/getCountQueue`, {
      doctorId: updatedEvent.doctorId,
      date: new Date(this.state.Date)
    })
    console.log(getSumQueue)
    let getSumAppointment = await axios.post(`/getCountAppointment`, {
      doctorId: updatedEvent.doctorId,
      date: new Date(this.state.Date).getDate()
    })
    //เอาค่า couunt ของตาราคิวมา
    let sumQueue = getSumQueue.data[0].countQueueId
    //เอาค่า couunt ของตาราง appointment มา 
    let sumAppointment = getSumAppointment.data[0].countAppointmentId
    //เอา count ของสองตารางมารวมกันเพื่อเช็คกับ limit ที่ตาราง timetable 
    let sumCount = sumQueue + sumAppointment
    console.log(sumCount)


    await this.checkCount(updatedEvent.doctorId)
    console.log(this.state.doctorWithRemaining)



    //fail
    if (countAppointment[0]) {
      console.log('no data')
      if (result.length > 0 || sumCount >= this.state.doctorWithRemaining.remaining) {
        //fail
        console.log('cannot')
        swal("Cannot!", `HN: ${event.title} cannot move to  
        ${updatedEvent.start.toString().substr(0, 24)} 
        because doctor cant recieve more patient
        `, "warning");
      }
      else {
        //success
        console.log('success1')
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
      //success
      console.log('success2')
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

  addAppoinment = async () => {

    const date = this.pharseDate(new Date());
    const { events, startTime, endTime, HN, timetable, appointment } = this.state
    // const currentDate = new Date(this.state.Date)
    // const getDayDate = currentDate.getDate();
    let tmp = this.state.appointmentDepId.split("/")

    //check Count Limit 
    let countAppointment = timetable.filter(data => data.doctorId == tmp[0]
      && data.Date === new Date(this.state.Date).getDate())

    //check ว่า ใน วันนั้น มีการแอดเวลาซ้ำกันที่หมอเดียวกันหรือป่าว
    let check = appointment.filter(data => data.doctorId == tmp[0]
      && data.timeStart.substr(0, 5) == startTime
      && data.date === new Date(this.state.Date).getDate())
    console.log(check)

    let getSumQueue = await axios.post(`/getCountQueue`, {
      doctorId: tmp[0],
      date: new Date(this.state.Date)
    })
    console.log(getSumQueue)
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
    console.log(sumCount)

    debugger
    if (check.length > 0 || sumCount > this.state.doctorWithRemaining.remaining) {
      swal("Cannot !",
        `Cannot add Appointment because doctor can't recieve more patient`,
        "warning");
    }
    else {
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
      });
      console.log("เข้า DB");
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

    if (new Date(this.state.Date).getDate() >= new Date().getDate() && new Date(this.state.Date).getMonth() == new Date().getMonth()) {
      // const doctors = await axios.post(`/getListDoctor`, {
      //   Date: new Date(this.state.Date).getDate(),
      //   day: date.day,
      //   month: date.month,
      //   year: date.year,
      //   departmentId: this.state.departmentId
      // });
      // console.log(doctors)
      // const doctorsOption = this.dropdownDoctors(doctors);
      // this.setState({
      //   doctors: doctorsOption,
      //   doctorWithRemaining: doctors.data
      // })

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
    this.setState({
      openDetail: true,
      selectEvent: e.id
    })
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
                    <Message positive hidden={!this.state.errorHN.status}>
                      {this.state.errorHN.message}
                    </Message>
                    <Form.Input
                      type="date"
                      fluid
                      value={this.state.Date}
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
                    onChange={(e, { value }) => this.setField("appointmentDepId", value)}
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
    console.log(this.state.HN)
    console.log(this.state.Date)
    console.log(this.state.startTime)
    console.log(this.state.endTime)
    console.log(this.state.appointmentDepId)
    console.log(this.state.selectEvent)

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

    let getDoctor = this.state.appointmentDepId.split('/')

    //check couunt ว่าทั้งหมดมีเท่าไหร่ของหมดคนที่เืลือก Dropdown มีค่าเสมอ เอาตัวแปรไป .patientLimit
    let countAppointment = this.state.timetable.filter(data => data.doctorId == getDoctor[0]
      && data.Date === new Date(this.state.Date).getDate())
    console.log('timetable', countAppointment)

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
    let sumQueue = getSumQueue.data[0].countQueueId
    //เอาค่า count  ของ ตาราง appointment มา 
    let sumAppointment = getSumAppointment.data[0].countAppointmentId
    //เอาสองค่ามารวมกัน เพื่อเช็คว่ามีค่ามากกว่า countAppointment.patientLimit ไหม ถ้ามากกว่าจะไม่ให้แอด 
    let sumCount = sumQueue + sumAppointment
    console.log('count ท้้งหมด', sumCount)

    debugger
    if (this.state.HN == "" || this.state.startTime == ""
      || this.state.endTime == ""
      || this.state.appointmentDepId == "" || sumCount > countAppointment[0].patientLimit) {
      swal("Cannot!", `Please fill out this form completely or doctor cant recive more patient`, "warning");
      this.setState({
        editStatus: true,
        openDetail: true
      })
    }
    else {
      await this.getEvents()
      await this.getAppointment()
      swal("Success!", `HN: ${this.state.HN} was update  ${this.state.startTime}`, "success");
      console.log('เข้า up')

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
      console.log(data)
    }
    console.log('out')
  }

  openConfirm = () => {
    console.log('เข้า Confirm')
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
    console.log('เข้า get Eve')
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
    console.log("เข้า ลบ")
    this.setState({
      openDetail: false,
    })
    axios.delete(`/deleteAppointment/${this.state.selectEvent}`)
      .then(resp => {
        console.log('success')
        this.getEvents()
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      }).catch(err => {
        console.log('error')
      })
  }


  validateHN = async () => {
    if (this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.setState({
        errorHN: { status: true, message: "Right" }
      });
    } else if (!this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.setState({
        errorHN: { status: true, message: "HN Does not match" }
      });
    }
  };



  listDoctors = () => {
    const { timetable, doctorWithRemaining } = this.state
    let tmp = ''
    // //count ของ queue
    // console.log(sumQueueCountLimit)
    // // if (this.state.addSuccess) {
    let getDoctor = this.state.appointmentDepId.toString().split('/')
    // console.log(getDoctor)
    // debugger
    // let remaining = timetable.filter(data => data.doctorId == getDoctor[0] && data.Date === new Date(this.state.Date).getDate()).map(data => (data.patientLimit))
    // console.log(remaining)

    // let sumRemaining = remaining
    // if (this.state.addSuccess) {
    //   sumRemaining = remaining - 1
    //   this.setState({
    //     addSuccess: false
    //   })
    //   console.log(sumRemaining)
    // }

    this.checkCount()
    if (!doctorWithRemaining[0]) {

    }
    else {
      tmp =
        // filter(data => data.Date === new Date(this.state.Date).getDate())
        // .map((data, index) => (
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
      // ))
    }
    // }
    return tmp
  }

  checkCount = async (doctorId) => {
    debugger
    if (!doctorId) {
      console.log('ไม่มี')
    } else {
      debugger
      console.log('เข้า checkCount ')
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
      console.log(doctors)
      this.setState({
        doctorWithRemaining: doctors.data
      })
    }

    // this.setState({ doctorWithRemaining: doctors.data })
    console.log(this.state.doctorWithRemaining)
  }


  // onEventResize = (type, { event, start, end, allDay }) => {
  //   this.setState(state => {
  //     state.events[0].start = start;
  //     state.events[0].end = end;
  //     return { events: state.events };
  //   });
  // };



  render() {
    return (
      <div style={{ width: '100%' }}>
        <Headerbar />
        <DropdownQueue />
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
      </div>
    );
  }
}

// const Calendar = DragDropContext(HTML5Backend)(Appointment);
export default Appointment;
