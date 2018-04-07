import React, { Component } from 'react';
import Dropdownq from './Dropdownq.js'
import Rail, { Segment } from 'semantic-ui-react'
import {
    Grid, Button, Dropdown, Menu, Icon, Dimmer,
    Header, Label, Item, Form, Input, TextArea, List, Table, Image, Message, Confirm
} from 'semantic-ui-react'
import Modal from 'react-modal';
import axios from 'axios'
import * as moment from 'moment';
import _ from 'underscore'

class Queue extends Component {
    state = {
        showModal: false,
        modalIsOpen: false,
        queueId: '',
        roomId: '',
        Date: '',
        statusId: '',
        HN: '',
        doctorId: '',
        forward: '',
        nurseId: '',
        queues: [],
        errorHN: '',
        namePatient : '',
        lastNamePatient: ''
    };
    props = {
        value : ''
    };
    validateAddress = async() =>{
        console.log('submit')
        var HN = this.state.HN
        var check = false;

        if (this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
            this.setState({ errorHN: { status: false, message: '' } })
            this.check = true
            {this.getName(this.check)}
        } else if (!this.state.HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
            this.setState({ errorHN: { status: true, message: 'HN Does not match' } })
        }
        // getHN for Detail 
        

    } 
    submit = async () => {
        // alert("TEST")
        console.log('submit')
        var HN = this.state.HN
        var check = false;
        console.log(Dropdownq);
        var data = await axios.post(`http://localhost:3001/getHN`, {
            HN: this.state.HN
        })

        console.log(data.data)


        if (data.data.length === 0) {
            console.log('ไม่มีในระบบ')
        } else {
            this.setState({dataPaint : data.data[0]})
            console.log('มีในระบบ')
            this.setState({ modalIsOpen: false })
            axios.post('http://localhost:3001/addPatientQ', {
                queueId: this.state.queues.length <= 0 ? 0 : this.state.queues[this.state.queues.length - 1].queueId + 1,
                roomId: this.state.dataPaint.roomId,
                Date: this.state.dataPaint.Date,
                statusId: this.state.dataPaint.statusId,
                HN: this.state.dataPaint.HN,
                doctorId: this.state.dataPaint.doctorId,
                forward: this.state.dataPaint.forward,
                nurseId: this.state.dataPaint.nurseId
                

                //insert แอทริบิ้วใน ตาราง คิว 
            })
            console.log('add เข้า db')
        }

    }
    // Modal
    // constructor() {

    // super();


    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);

    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);


    // }
    
    openModal = () => {
        this.setState({ modalIsOpen: true });
        console.log('open')
    }
    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }


    showPatient = () => {
        const now = moment().startOf('hour').fromNow();
        const data = this.state.queues
        const tmp = data.map(queue => (
            <Segment >
                {queue.firstName} {queue.lastName}<br />
                Room : {queue.room}<br />
                แผนก : {queue.department}
                <Label attached='bottom right' color='blue'>
                    <Icon name='time' />{now}</Label>
            </Segment>
        ))
        return tmp
    }

    getName = (check) => {
        var tmp = ''
        
        if(check === true){
            //this.state.HN
            const data = this.state.allPatient
            var test = _.findWhere(data,{HN : this.state.HN})
            if(test != undefined){
                this.state.namePatient = test.firstName,
                this.state.lastNamePatient = test.lastName
            }else{
                this.state.namePatient = 'Not have in DataBase',
                this.state.lastNamePatient = 'not have'
            }
            
        }else{
            this.state.namePatient = '',
            this.state.lastNamePatient = ''
        }
    }

    async componentWillMount() {
        var datas = await axios.get(`http://localhost:3001/getQueue`);
        this.setState({ queues: datas.data })
        var dataPatient = await axios.get(`http://localhost:3001/getPatient`);
        this.setState({ allPatient: dataPatient.data })
        Modal.setAppElement('body');
    }
    
    render() {
        
        return (
            <div>
                <div id="app"></div>
                < Grid >
                    <Grid.Column width={4}>
                        <Segment.Group id="box">
                            <Segment color='blue'><Header>Queue</Header></Segment>
                            <Segment.Group >
                                {this.showPatient()}
                            </Segment.Group>

                        </Segment.Group>
                        <Segment.Group id="boxLab" >
                            <Segment color='blue'><Header>Lab Wait</Header></Segment>
                            <Segment.Group >
                                <Segment > Nested Top
                                    <Label circular color='orange' style={{ float: 'Right' }}></Label>
                                </Segment >
                                <Segment >Nested Middle
                                    <Label circular color='green' style={{ float: 'Right' }}></Label>
                                </Segment >
                                <Segment >Nested Bottom
                                    <Label circular color='green' style={{ float: 'Right' }}></Label>
                                </Segment>
                            </Segment.Group>

                        </Segment.Group>

                        <center>
                            <Button color='blue' onClick={this.openModal}>Add Patient</Button>
                            
                            
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onRequestClose={this.closeModal}
                                style={customStyles}

                            >
                            
                                <Form>
                                    <Form.Input
                                        onBlur={this.validateAddress}
                                        icon='search'
                                        fluid label='HN'
                                        name="HN"
                                        placeholder='HN'
                                        value={this.state.HN}
                                        onChange={(e, { value }) => this.setState({ HN: value })} />
                                    <Message negative
                                        hidden={!this.state.errorHN.status}
                                    >
                                        HN Does not match
                                        </Message>
                                    <br />

                                    <center>
                                        <List>
                                            <List.Item>
                                                <List.Icon name='users' />
                                                <List.Content><Header> Name: {this.state.namePatient} {this.state.lastNamePatient} </Header></List.Content>
                                                
                                            </List.Item>

                                        </List>
                                    </center>
                                    <br />
                                    <br />
                                    <center>
                                        <Button type="submit" onClick= {this.submit} color='green' >Add</Button>
                                    </center>
                                </Form>


                            </Modal>

                        </center>
                    </Grid.Column>

                    <Grid.Column stretched width={12} >
                        <Segment id="boxshow">
                            {/* show q */}


                        </Segment>
                        <center>

                            <Button primary>Call</Button>


                            <Menu vertical>
                                <Dropdown text='Option' pointing='left' className='link item'>

                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            <center>
                                                <p onClick={this.handleOpenModal}>Forward To</p>
                                                    <Modal style={style}
                                                    isOpen={this.state.showModal}
                                                    isClose={this.state.handleCloseModal}
                                                    >

                                                    <Dropdown placeholder='Select Country' fluid search selection options={options} />
                                                    <br />
                                                    <center>
                                                        <Button color='blue' onClick={this.handleCloseModal}>
                                                            Forward
                                                    </Button>
                                                    </center>
                                                </Modal>
                                            </center>

                                        </Dropdown.Item>
                                        <Dropdown.Item>Call Again</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </Menu>

                        </center>
                    </Grid.Column>
                </Grid >





            </div >
        );
    }
}

const style = {
    content: {
        margin: 'auto',
        width: '60%',
        height: '250px',


    }
};
const customStyles = {
    content: {
        margin: 'auto',
        maxWidth: '450px',
        height: '350px',
    }
};
const options = [
    { key: '1', text: 'Angular', value: 'angular' },
    { key: '2', text: 'CSS', value: 'css' },
    { key: '3', text: 'Graphic Design', value: 'design' },
    { key: '4', text: 'Ember', value: 'ember' },
    { key: '5', text: 'HTML', value: 'html' },
    { key: '6', text: 'Information Architecture', value: 'ia' },
    { key: '7', text: 'Javascript', value: 'javascript' },
    { key: '8', text: 'Mechanical Engineering', value: 'mech' },
    { key: '9', text: 'Meteor', value: 'meteor' },
    { key: '10', text: 'NodeJS', value: 'node' },
    { key: '11', text: 'Plumbing', value: 'plumbing' },
    { key: '12', text: 'Python', value: 'python' },
    { key: '13', text: 'Rails', value: 'rails' },
    { key: '14', text: 'React', value: 'react' },
    { key: '15', text: 'Kitchen Repair', value: 'repair' },
    { key: '16', text: 'Ruby', value: 'ruby' },
    { key: '17', text: 'UI Design', value: 'ui' },
    { key: '18', text: 'User Experience', value: 'ux' },
]
export default Queue





