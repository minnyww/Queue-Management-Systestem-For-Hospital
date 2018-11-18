import React, { Component } from "react";
import Headerbar from "../components/headerbar";
import { Statistic, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div>
        <Headerbar />
        <center>
          <Header color="brown" style={{ fontSize: "90px", marginTop: "5%" }}>
            :( OOPS!
          </Header>
          <Header color="brown" style={{ fontSize: "60px" }}>
            NOTHING TO SEE HERE.
          </Header>
          <Header color="brown" style={{ fontSize: "40px" }}>
            YOU FOUND A BROKEN LINK.
          </Header>
          <Link to={"/Admin"}>
            <Button color="teal">Home</Button>
          </Link>
        </center>
      </div>
    );
  }
}

export default NotFound;
