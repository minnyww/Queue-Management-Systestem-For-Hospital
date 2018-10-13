import React from 'react'
import { Segment, Header, Label } from 'semantic-ui-react'
import { Link } from "react-router-dom";
const headerbar = (props) => (
  <Segment raised inverted clearing color='blue' style={{ borderRadius: '1px', height: '55px ',width:'100%' }}>
    <Header as='h2' floated='left'>Queue Management System</Header>
    {/* <Header as='h4' floated='right' style={{ marginTop: '0.4%' }} >
      {props.loginName.firstname === undefined ? '' : 'Welcome :' + props.loginName.firstname}
      <Label color="teal" onclick={() => localStorage.removeItem('userData')}>
        <Link to={"/Admin"} style={{ color: 'white' }}>Logout</Link>
      </Label>
    </Header> */}
  </Segment>
)

export default headerbar
