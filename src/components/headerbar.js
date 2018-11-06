import React from 'react'
import { Segment, Header, Label } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import * as R from 'ramda'
const headerbar = (props) => (
  <Segment raised inverted clearing color='blue' style={{ borderRadius: '1px', height: '55px ', width: '100%' }}>
    <Header as='h2' floated='left'>Queue Management System</Header>
    {R.isEmpty(props.loginName) || !props.loginName ? '' :
      <Header as='h5' style={{ float: 'right', marginTop: '3px', fontWeight: '100' }}>
        Welcome : {props.loginName.firstname} {props.loginName.lastname}<Link to={"/Admin"}><Label
          style={{ marginLeft: '10px' }}
          onClick={() => props.logOut()}
          color='teal'>Log out
        </Label>
        </Link>
      </Header>
    }
  </Segment>
)

export default headerbar
