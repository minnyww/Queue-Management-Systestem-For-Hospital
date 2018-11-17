import React from "react";
import { Segment, Header, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as R from "ramda";
import girl from "./../img/girl.png";

const headerbar = props => (
  <Segment
    raised
    inverted
    clearing
    color="blue"
    style={{ borderRadius: "1px", height: "55px ", width: "100%" }}
  >
    <Link to={"/Main"}>
      <Header
        style={{ color: "white", fontWeight: "100" }}
        as="h2"
        floated="left"
      >
        Queue Management System
      </Header>
    </Link>

    {R.isEmpty(props.loginName) || !props.loginName ? (
      ""
    ) : (
      <Label
        color="blue"
        image
        style={{ float: "right", fontWeight: "100", fontSize: "13px" }}
      >
        Welcome : {props.loginName.firstname} {props.loginName.lastname}
        <Link to={"/Admin"}>
          <Label.Detail
            as="a"
            style={{ fontWeight: "100", color: "white" }}
            onClick={() => props.logOut()}
          >
            Logout
          </Label.Detail>
        </Link>
      </Label>
    )
    // <Header as='h5' style={{ float: 'right', marginTop: '3px', fontWeight: '100' }}>
    //   Welcome : {props.loginName.firstname} {props.loginName.lastname}<Link to={"/Admin"}><Label
    //     style={{ marginLeft: '10px' }}
    //     onClick={() => props.logOut()}
    //     color='teal'>Log out
    //   </Label>
    //   </Link>
    // </Header>
    }
  </Segment>
);

export default headerbar;
