import React from 'react'
import { Segment, Header, Label } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import * as R from 'ramda'
const headerbar = (props) => (
  <Segment raised inverted clearing color='blue' style={{ borderRadius: '1px', height: '55px ', width: '100%' }}>
    <Header as='h2' floated='left'>Queue Management System</Header>
    {R.isEmpty(props.loginName) || !props.loginName ? '' :
      <p style={{ float: 'right', marginTop: '3px' }}>
        Welcome : {props.loginName.firstname} {props.loginName.lastname}<Link to={"/Admin"}><Label
          style={{ marginLeft: '10px' }}
          onClick={() => props.logOut()}
          basic color='red'>Log out
        </Label>
        </Link>
      </p>
    }
  </Segment>
)

export default headerbar
