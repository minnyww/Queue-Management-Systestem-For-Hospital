import React, { Component } from 'react';
import Dropdownq from './Dropdownq'
import Rail, { Segment } from 'semantic-ui-react'
import {
    Grid, Button, Dropdown, Menu, Icon, Dimmer,
    Header, Label, Item, Form, Input, TextArea, List, Table, Image, Message, Confirm
} from 'semantic-ui-react'
import Modal from 'react-modal';
import axios from './../lib/axios'
import * as moment from 'moment';
import _ from 'underscore'

class Queue extends Component {
    state = {
        showModal: false,
        modalIsOpen: false,
        queues: [],
        errorHN: '',
        namePatient: '',
        lastNamePatient: '',
        allPatient:[]
        //room:''
    }

    validateHN = async (HN) => {
        console.log('submit >> ' + HN)
        if (HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
            this.setState({ errorHN: { status: false, message: '' } })
            this.getName(HN)
        } else if (!HN.match(/[0-9]{4,10}[/]{1}[0-9]{2}/)) {
            this.setState({ errorHN: { status: true, message: 'HN Does not match' } })
        }
    }

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

    getName = (HN) => {
        const patient = this.state.allPatient.filter(data => data.HN === HN)[0]
        if (patient) {
            this.setState({
                namePatient: patient.firstName,
                lastNamePatient: patient.lastName
            })
        } else {
            this.setState({
                namePatient: <Message negative>Not have in DataBase</Message>,
                lastNamePatient: ''
            })
        }
    }

    // showPatient = () => {
    //     const now = moment().startOf('hour').fromNow();
    //     const data = this.state.queues
    //     const tmp = data.map(queue => (
    //         <Segment >
    //             {queue.firstName} {queue.lastName}<br />
    //             Room : {queue.room}<br />
    //             แผนก : {queue.department}
    //             <Label attached='bottom right' color='blue'>
    //                 <Icon name='time' />{now}</Label>
    //         </Segment>
    //     ))
    //     return tmp
    // }

    async componentWillMount() {
        var datas = await axios.get(`/getQueue`);
        var dataPatient = await axios.get(`/getPatient`);
        console.log(dataPatient)
        this.setState({
            allPatient: dataPatient.data,
            queues: datas.data,
        })
        Modal.setAppElement('body');

    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div id="app"></div>
                < Grid >
                    <Grid.Column width={4}>
                        <Segment.Group id="box">
                            <Segment color='blue'><Header>Queue</Header></Segment>
                            <Segment.Group >
                                {this.props.showPatient()}
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
                                        onBlur={({ value }) => this.validateHN(this.props.HN)}
                                        icon='search'
                                        fluid label='HN'
                                        name="HN"
                                        placeholder='HN'
                                        value={this.props.HN}
                                        onChange={(e, { value }) => this.props.setField('HN', value)} />
                                    <Message negative
                                        hidden={!this.state.errorHN.status}
                                    >
                                        HN Does not match
                                        </Message>
                                    <br />

                                    <center>
                                        <List>
                                            <List.Item>

                                                <List.Content><Header> Name: {this.state.namePatient} {this.state.lastNamePatient} </Header></List.Content>

                                            </List.Item>

                                        </List>
                                    </center>
                                    <br />
                                    <br />
                                    <center>
                                        <Button type="submit"
                                                onClick={() => {
                                                    this.setState({modalIsOpen : false})
                                                    this.props.addQueue()
                                                }}
                                                color='green'>
                                            Add
                                        </Button>
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





