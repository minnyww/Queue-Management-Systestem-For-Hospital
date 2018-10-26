import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./../css/Q.css";
import Modal from 'react-responsive-modal';
import FormAddAppointment from "../components/formAddAppointment";
import {
  Card,
  Icon,
  Image,
  Button,
  Form,
  Segment,
  Header,
  Grid,
  Message,
  Label
} from "semantic-ui-react";
import axios from "./../lib/axios";
import { Link } from "react-router-dom";
import { type } from "os";

class Login extends Component {
  state = {
    HN: "",
    phoneNumber: "",
    recipient: '',
    textmessage: '',
    OTP: '',
    OTPfield: '',
    //modal
    open: false,
    openOTP: false,
    //validate
    errorHN: { status: false, message: "" },
    errorPhoneNumber: { status: false, message: "" },
    errorOTP: { status: false, message: "" }
  };

  showOTPModal = async () => {
    const recipient = await this.cutPhoneNumber()
    const OTP = await this.generateOTP()
    await this.setState({
      openOTP: true,
      recipient: recipient,
      OTP: OTP,
    })

    const text = await this.sendOTP()
    await this.setState({
      textmessage: text,
    })
    console.log(this.state.textmessage)
    await this.sendText()
  }


  submit = async () => {
    var HN = this.state.HN;
    var phoneNumber = this.state.phoneNumber;
    var check = false;
    if (this.validateOTP() === 'success') {

      if (this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
        this.setState({ errorHN: { status: false, message: "" } });
        check = true;
      } else if (!this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
        this.setState({
          errorHN: { status: true, message: "HN Does not match" }
        });
      }
      //Check phone number
      if (
        this.state.phoneNumber.length <= 10 &&
        this.state.phoneNumber.match(/[0-9]{10}/)
      ) {
        this.setState({ errorPhoneNumber: { status: false, message: "" } });
        check = true;
      } else if (
        this.state.phoneNumber.length > 10 &&
        this.state.phoneNumber.match(/[0-9]{10}/)
      ) {
        this.setState({
          errorPhoneNumber: {
            status: true,
            message: "Phone number limit 10 number"
          }
        });
      } else if (
        this.state.phoneNumber.length < 10 &&
        !this.state.phoneNumber.match(/[0-9]{10}/)
      ) {
        this.setState({
          errorPhoneNumber: {
            status: true,
            message: "Phone number does not match"
          }
        });
      }

      //Check API
      if (check === true) {
        var data = await axios.post(`/checkHN`, {
          HN: this.state.HN,
          phoneNumber: this.state.phoneNumber
        });
        console.log(data.data);
        if (data.data.length === 0) {
          this.setState({
            errorHN: { status: true, message: "HN Does not match" }
          });
        } else {
          console.log(data.data[0]);
          // let dataEmp = splice(fruits.length-1)
          console.log("aaaaaa:", this.props);
          localStorage.setItem('getUserData', JSON.stringify(data.data[0]))
          this.props.history.push({
            pathname: "/Home",
            state: {
              HN: data.data[0].HN,
              phoneNumber: data.data[0].phonenumber
            }
          });
        }
      }

    } else if (
      this.state.OTPfield.length > 4 &&
      this.state.OTPfield.match(/[0-9]{4}/)
    ) {
      this.setState({
        errorOTP: { status: true, message: "OTP too long" }
      })
    } else if (
      this.state.OTPfield.length < 4 &&
      this.state.OTPfield.match(/[0-9]/)
    ) {
      this.setState({
        errorOTP: { status: true, message: "OTP too short" }
      })
    } else if (
      this.state.OTPfield.length <= 4 &&
      !this.state.OTPfield.match(/[0-9]{4}/)
    ) {
      this.setState({
        errorOTP: { status: true, message: "OTP is not Charaters and Symbols" }
      })
    } else if (this.state.OTPfield !== this.state.OTP) {
      this.setState({
        errorOTP: { status: true, message: "Wrong OTP!!" }
      })
    }

    //Check API
    if (check === true) {
      var data = await axios.post("/checkHN", {
        HN: this.state.HN,
        phoneNumber: this.state.phoneNumber
      });
      console.log(data.data);
      if (data.data.length === 0) {
        this.setState({
          errorHN: { status: true, message: "HN Does not match" }
        });
      } else {
        console.log(data.data[0]);
        console.log("aaaaaa:", this.props);
        localStorage.setItem('getUserData', JSON.stringify(data.data[0]))
        this.props.history.push({
          pathname: "/Home",
          state: {
            HN: data.data[0].HN,
            phoneNumber: data.data[0].phonenumber
          }
        });
      }
    }
  };
  setField = (field, value) => {
    this.setState({ [field]: value });
  };
  cutPhoneNumber = () => {
    let phone = "";
    var number = this.state.phoneNumber
    let tmp = "+66"
    phone = number.substr(1, 10)
    let recipient = tmp + phone
    return recipient;
  }
  generateOTP = () => {
    var min = 1;
    var max = 9999;
    var rand = (Math.random() * (max - min) + min) + ""
    rand = rand.substr(0, 3)
    if (rand.length === 1) {
      rand = "000" + rand
    } else if (rand.length === 2) {
      rand = "00" + rand
    } else if (rand.length === 3) {
      rand = "0" + rand
    }
    return rand;
  }
  validateOTP = () => {
    if (this.state.OTPfield === this.state.OTP) {
      console.log("success")
      return "success";
    } else {
      console.log("fail")
      return "fail";
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
  sendOTP = () => {
    var text = "OTP: "
    var OTP = this.state.OTP
    var textOTP = text + OTP
    console.log(OTP)
    console.log(this.state.textmessage)
    console.log(this.state.recipient)
    console.log(textOTP)
    return textOTP;
  }

  render() {
    console.log(this.OTPfield)
    // console.log(this.generateOTP())
    return (
      <div >
        <center>
          <Grid.Column style={{ maxWidth: "450px" }}>
            <Segment color="blue" >
              <Form onSubmit={this.showOTPModal.bind(this)} style={{ marginBottom: '15px' }}>
                <Form.Input
                  fluid
                  label="HN"
                  name="HN"
                  placeholder="HN"
                  type="text"
                  required
                  value={this.state.HN}
                  onChange={(e, { value }) => this.setState({ HN: value })}
                />

                <Message negative hidden={!this.state.errorHN.status}>
                  {this.state.errorHN.message}
                </Message>

                <Form.Input
                  fluid
                  label="Phone number"
                  name="Phone number"
                  placeholder="Phone number"
                  type="number"
                  required
                  value={this.state.phoneNumber}
                  onChange={(e, { value }) =>
                    this.setState({ phoneNumber: value })
                  }
                />
                <Message negative hidden={!this.state.errorPhoneNumber.status}>
                  {this.state.errorPhoneNumber.message}
                </Message>
                <Button color="blue" type="submit">
                  Sign in
                </Button>

              </Form>
              {/* <Button style={{ marginTop: "2.5%", float: 'right' }} color="teal" size='tiny'> */}
              <Label color='teal' size='tiny' attached='bottom right' style={{ marginTop: "2.5%" }}>
                <Link to={"/Admin"}>Admin</Link>
              </Label>
              {/* </Button> */}
            </Segment>

            <Modal
              center
              styles={{ modal: { width: 400, top: '40%', borderRadius: '10px' } }}
              open={this.state.openOTP}
              onClose={() => this.setField("openOTP", false)}>
              <Form.Input
                fluid
                name='OTP'
                placeholder="Enter OTP"
                value={this.OTPfield}
                onChange={(e, { value }) => this.setField("OTPfield", value)}
              />
              <Message negative hidden={!this.state.errorOTP.status}>
                {this.state.errorOTP.message}
              </Message>
              <center>
                <Button style={{ marginTop: "2.5%" }} color="blue" type="submit" onClick={() => { this.submit() }} >
                  Verify OTP
                </Button>
              </center>
            </Modal>
          </Grid.Column>
        </center>
      </div>
    );
  }
}

export default withRouter(Login);
