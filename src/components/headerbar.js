import React from 'react'
import { Segment, Header, Label } from 'semantic-ui-react'
import { Link } from "react-router-dom";
const headerbar = (props) => (
  <Segment raised inverted clearing color='blue' style={{ borderRadius: '1px', height: '55px ',width:'100%' }}>
    <Header as='h2' floated='left'>Queue Management System</Header>
  </Segment>
)

export default headerbar
