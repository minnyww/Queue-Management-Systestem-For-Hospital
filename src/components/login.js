import React from 'react'
import { Button, Form, Segment, Header, Grid, column } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
const FormExampleInverted = () => (
  <center>
    
  <Grid.Column style={{ maxWidth:'450px'}}>
  <Segment   color='blue'>
    
    <Form >
      
        <Form.Input fluid label='HN' placeholder='HN' />
        
        <Form.Input fluid label='Phone Number' placeholder='Phone Number' />
        
      
      <Link to={'/App'} class="primary ui button">Enter</Link>
      <br/><br/>
      <Link to={'/Admin'} class="primary ui button">Admin</Link>
      
      
    </Form>
  </Segment>
  </Grid.Column>
  
  </center>
)


export default FormExampleInverted
