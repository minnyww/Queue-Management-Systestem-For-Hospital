import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./../css/Q.css";
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

class Login extends Component {
  state = {
    HN: "",
    phoneNumber: "",

    //validate
    errorHN: { status: false, message: "" },
    errorPhoneNumber: { status: false, message: "" }
  };
  submit = async () => {
    // Push.create('Hello World!')
    var HN = this.state.HN;
    var phoneNumber = this.state.phoneNumber;
    var check = false;

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
      var data = await axios.post(`http://localhost:3001/checkHN`, {
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

  render() {
    console.log(this.state);
    return (
      <div>
        <center>
          <Grid.Column style={{ maxWidth: "450px" }}>
            <Segment color="blue">
              <Form onSubmit={this.submit.bind(this)}>
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
              <Button style={{ marginTop: "2.5%",  }} color="teal" >
                <Link to={"/Admin"} style ={{ color : 'white' }}>Admin</Link>
              </Button>
            </Segment>
          </Grid.Column>
        </center>
      </div>
    );
  }
}

export default withRouter(Login);
