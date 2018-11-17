import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../css/Q.css";
import Login from "./../components/login";
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
  Label,
  Input,
  Responsive
} from "semantic-ui-react";
import Headerbar from "./../components/headerbar";
import logo1 from "./../img/logo1.png";
import welcome from "./../img/welcomenurse.png";
import axios from "./../lib/axios";
import error from "./../img/drug.png";
class Admin extends Component {
  state = {
    Username: "",
    Password: "",
    HN: "",
    //validate
    errorUsername: { status: false, message: "" },
    errorPassword: { status: false, message: "" }
  };

  submit = async () => {
    var Username = this.state.Username;
    var Password = this.state.Password;
    var check = false;

    if (this.state.Username.length <= 10) {
      this.setState({ errorUsername: { status: false, message: "" } });
      check = true;
    }

    if (check === true) {
      var data = await axios.post(`/checkUsername`, {
        Username: this.state.Username,
        Password: this.state.Password
      });
      // console.log(data.data)
      if (data.data.length === 0) {
        this.setState({ errorUsername: { status: true, message: "" } });
      } else {
        const datas = data.data[0];
        delete datas.password;
        localStorage.setItem("userData", JSON.stringify(data.data[0]));
        this.props.history.push({
          pathname: "/Main"
        });
      }
    }
  };
  render() {
    return (
      <div
        style={{
          // backgroundImage: 'url(https://www.picz.in.th/images/2018/10/11/kum9gq.png)',
          backgroundColor: "white",
          height: "100vh"
        }}
      >
        <Responsive {...Responsive.onlyComputer}>
          <br />
          <br />
          <br />
          <center>
            <Grid divided="vertically" centered>
              <Grid.Row
                columns={2}
                style={{
                  marginLeft: "3%",
                  marginRight: "3%",
                  border: "1px solid rgba(34,36,38,.15)",
                  borderRadius: "7px"
                }}
              >
                <Grid.Column style={{ maxWidth: "450px",marginTop : '2%' }}>
                  <br />
                  <Header as="h2" color="blue" style={{ fontSize: "36px" }}>
                    Queue Management System
                  </Header>
                  <br />
                  <br />
                  <Header as="h2" color="blue" style={{ fontSize: "24px" }}>
                    Login
                  </Header>
                  <Form onSubmit={this.submit}>
                    <Input
                      action={{ color: "blue", icon: "user" }}
                      actionPosition="left"
                      fluid
                      // label='Username'
                      name="Username"
                      placeholder="Username"
                      type="text"
                      required
                      error={this.state.errorUsername.status}
                      value={this.state.Username}
                      onChange={(e, { value }) =>
                        this.setState({ Username: value })
                      }
                    />
                    <br />
                    <Form.Input
                      action={{ color: "blue", icon: "lock" }}
                      actionPosition="left"
                      fluid
                      // label='Password'
                      name="Password"
                      placeholder="Password"
                      type="password"
                      required
                      value={this.state.Password}
                      onChange={(e, { value }) =>
                        this.setState({ Password: value })
                      }
                    />
                    <Message negative hidden={!this.state.errorUsername.status}>
                      Username or Password does not match
                    </Message>
                    <Button
                      color="blue"
                      type="submit"
                      style={{ width: "100%" }}
                    >
                      Sign in
                    </Button>
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <Image src={welcome} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </center>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <center>
            <Grid divided="vertically" centered>
              <Grid.Row
                columns={2}
                style={{ marginLeft: "3%", marginRight: "3%" }}
              >
                <Grid.Column style={{ maxWidth: "450px" }}>
                  <br />
                  <Header as="h2" color="blue" style={{ fontSize: "36px" }}>
                    Queue Management System
                  </Header>
                  <br />
                  <br />
                  <Header as="h2" color="blue" style={{ fontSize: "24px" }}>
                    Login
                  </Header>
                  <Form onSubmit={this.submit}>
                    <Input
                      action={{ color: "teal", icon: "user" }}
                      actionPosition="left"
                      fluid
                      // label='Username'
                      name="Username"
                      placeholder="Username"
                      type="text"
                      required
                      error={this.state.errorUsername.status}
                      value={this.state.Username}
                      onChange={(e, { value }) =>
                        this.setState({ Username: value })
                      }
                    />
                    <br />
                    <Form.Input
                      action={{ color: "teal", icon: "lock" }}
                      actionPosition="left"
                      fluid
                      // label='Password'
                      name="Password"
                      placeholder="Password"
                      type="password"
                      required
                      value={this.state.Password}
                      onChange={(e, { value }) =>
                        this.setState({ Password: value })
                      }
                    />
                    <Message negative hidden={!this.state.errorUsername.status}>
                      Username or Password does not match
                    </Message>
                    <Button
                      color="teal"
                      type="submit"
                      style={{ width: "100%" }}
                    >
                      Sign in
                    </Button>
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <Image src={welcome} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </center>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <Headerbar />
          <center>
            <Card>
              <Image src={error} />
              <Card.Content>
                <Card.Header>Don't Support</Card.Header>
                <Card.Meta>Queue Management System</Card.Meta>
                <Card.Description>
                  Don't Support on mobile screen
                </Card.Description>
              </Card.Content>
              <Card.Content extra />
            </Card>
          </center>
        </Responsive>
      </div>
    );
  }
}
export default Admin;
