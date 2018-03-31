import React, { Component } from 'react'
import { Button, Form, Segment, Header, Grid, column, Input,Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


class Login extends Component {
  state = {
    HN: '',
    phoneNumber: '',

    //validate
    errorHN: { status: false, message: '' },
    errorPhoneNumber: { status: false, message: '' }
  }
  submit = () => {
    var HN = this.state.HN
    var phoneNumber = this.state.phoneNumber


    //validate pattern
    //HN
    //เลขหลัง hn ไม่เกิน 10 
    if (this.state.HN.match(/[a-zA-Z]{2}[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.setState({ errorHN: { status: false, message: '' } })
    } else if (!this.state.HN.match(/[a-zA-Z]{2}[0-9]{4,10}[/]{1}[0-9]{2}/)) {
      this.setState({ errorHN: { status: true, message: 'HN Does note match' } })
    } 
    //phone number
    if (this.state.phoneNumber.length <= 10 && this.state.phoneNumber.match(/[0-9]{10}/)) {
        this.setState({ errorPhoneNumber: { status: false, message: '' } })
      }else if(this.state.phoneNumber.length > 10 && this.state.phoneNumber.match(/[0-9]{10}/)){
        this.setState({ errorPhoneNumber: { status: true, message: 'Phone number limit 10 number' } })
      }else if(this.state.phoneNumber.length < 10 && !(this.state.phoneNumber.match(/[0-9]{10}/))){
        this.setState({ errorPhoneNumber: { status: true, message: 'Phone number does not match' } })
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
                <label style={{ color:'red' }}>{this.state.errorHN.message}</label>

                <Form.Input fluid label='Phone Number' name="phoneNumber"
                  placeholder='Phone Number'
                  required
                  error={this.state.errorPhoneNumber.status}
                  value={this.state.phoneNumber}
                  onChange={(e, { value }) => this.setState({ phoneNumber: value })} />
                  <label style={{ color:'red' }}>{this.state.errorPhoneNumber.message}</label>
                  <br/>
                <Button color='blue' type='submit' >Enter</Button>
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
