import React, { Component } from 'react'
import { Button, Form, Segment, Header, Grid, column, Input, Label, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios'

class Login extends Component {
  state = {
    HN: '',
    phoneNumber: '',

    //validate
    errorHN: { status: false, message: '' },
    errorPhoneNumber: { status: false, message: '' }
  }
  submit = async () => {
    var HN = this.state.HN
    var phoneNumber = this.state.phoneNumber
    var check = false;
    
    //validate pattern
    //Check HN
    //เลขหลัง hn ไม่เกิน 10 
    if (this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.setState({ errorHN: { status: false, message: '' } })
      check = true
    } else if (!this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.setState({ errorHN: { status: true, message: 'HN Does not match' } })
    }
    //Check phone number
    if (this.state.phoneNumber.length <= 10 && this.state.phoneNumber.match(/[0-9]{10}/)) {
      this.setState({ errorPhoneNumber: { status: false, message: '' } })
      check = true
    } else if (this.state.phoneNumber.length > 10 && this.state.phoneNumber.match(/[0-9]{10}/)) {
      this.setState({ errorPhoneNumber: { status: true, message: 'Phone number limit 10 number' } })
    } else if (this.state.phoneNumber.length < 10 && !(this.state.phoneNumber.match(/[0-9]{10}/))) {
      this.setState({ errorPhoneNumber: { status: true, message: 'Phone number does not match' } })
    }

    //Check API 
    if (check === true) {
      
      var data = await axios.post(`http://localhost:3001/checkHN`, {
        HN: this.state.HN,
        phoneNumber: this.state.phoneNumber
      })
      console.log(data.data)
      if (data.data.length === 0) {
        console.log('ไม่มีในระบบ')
      } else {
        console.log('มีในระบบ')
      }
    }


  }
  render() {
    console.log(this.state)
    return (
      <div>
        <center>

          <Grid.Column style={{ maxWidth: '450px' }}>
            <Segment color='blue'>
              <Form onSubmit={this.submit}>
                <Form.Input fluid label='HN' name="HN"
                  placeholder='HN'
                  required
                  error={this.state.errorHN.status}
                  value={this.state.HN}
                  onChange={(e, { value }) => this.setState({ HN: value })} />
                 <Message negative
                hidden = {!this.state.errorHN.status}
                >
                  HN Does not match
                </Message>

                <Form.Input fluid label='Phone Number' name="phoneNumber"
                  placeholder='Phone Number'
                  required
                  error={this.state.errorPhoneNumber.status}
                  value={this.state.phoneNumber}
                  onChange={(e, { value }) => this.setState({ phoneNumber: value })} />
                {/* <Message 
                  error
                  hidden={false}
                  content='Phone number not match'/> */}

                <Message negative
                hidden = {!this.state.errorPhoneNumber.status}
                >
                
                  Your Phone number does not match
                </Message>
                <br />
                <Link to={'/App'}>
                <Button color='blue' type='submit' >Enter</Button></Link>
                <br /><br />
                <Link to={'/Admin'} class="primary ui button">Admin</Link>
              </Form>
            </Segment>
          </Grid.Column>

        </center>
      </div>
    )
  }
}

export default Login
