import React, { Component } from 'react';
import Rail, { Segment } from 'semantic-ui-react'
import {
    Grid, Button, Dropdown, Menu, Icon, Dimmer,
    Header, Label, Item, Form, Input, TextArea, List
} from 'semantic-ui-react'
import Modal from 'react-modal';
import axios from 'axios'
class Queue extends Component {

    submit = async () => {
        // alert("TEST")
        console.log('submit')
        var HN = this.state.HN
        var check = false;

        // if (this.state.HN.match(/[a-zA-Z]{2}[0-9]{4,10}[/]{1}[0-9]{2}/)) {
        //     this.setState({ errorHN: { status: false, message: '' } })
        //     check = true
        // } else if (!this.state.HN.match(/[a-zA-Z]{2}[0-9]{4,10}[/]{1}[0-9]{2}/)) {
        //     this.setState({ errorHN: { status: true, message: 'HN Does not match' } })
        // }

        // if (check === true) {
        var data = await axios.post(`http://localhost:3001/getHN`, {
            HN: this.state.HN
        })
        console.log(data.data)
        if (data.data.length === 0) {
            console.log('ไม่มีในระบบ')
        } else {
            console.log('มีในระบบ')
            this.setState({ modalIsOpen: false })
            axios.post('http://localhost:3001/addPatientQ', {
                queueId: this.state.queueId,
                roomId: this.state.roomId,
                Date: this.state.Date,
                statusId: this.state.statusId,
                HN: this.state.HN,
                doctorId: this.state.doctorId,
                forward: this.state.forward,
                nurseId: this.state.nurseId


                //insert แอทริบิ้วใน ตาราง คิว 
            })
            // this.setState({HN : ''})
        }
        // }
    }
    // Modal
    // constructor() {

    // super();
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
        queues: []
    };

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

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.

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
    // --------------

    showPatient = () => {
        const data = this.state.queues
        const tmp = data.map(queue => (
            <Segment >
                {queue.firstName} {queue.lastName}<br />
                Room : {queue.room}<br />
                แผนก : {queue.department}
                <Label color='blue' style={{ float: 'Right' }}>
                    <Icon name='time' /> 23 min
                 </Label>
            </Segment>
        ))

        return tmp
    }

    async componentWillMount() {
        var datas = await axios.get(`http://localhost:3001/getQueue`);
        this.setState({ queues: datas.data })
        Modal.setAppElement('body');
    }
    render() {

        return (
            <div>
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
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}

                            >
                                <Form onSubmit={this.submit}>
                                    <Form.Input
                                        fluid label='HN'
                                        name="HN"
                                        placeholder='HN'
                                        value={this.state.HN}
                                        onChange={(e, { value }) => this.setState({ HN: value })} />

                                    <br />
                                    <center>
                                        <List>
                                            <List.Item>
                                                <List.Icon name='users' />
                                                <List.Content><Header>First Name</Header></List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Icon name='users' />
                                                <List.Content><Header>Last Name</Header></List.Content>
                                            </List.Item>
                                        </List>
                                    </center>
                                    <br />
                                    <br />
                                    <center>
                                        <Button type="submit" color='green' >Add</Button>
                                    </center>
                                </Form>


                            </Modal>

                        </center>
                    </Grid.Column>

                    <Grid.Column stretched width={12} >
                        <Segment id="boxshow">
                        </Segment>
                        <center>

                            <Button primary>Call</Button>
                            <Button primary>Finish</Button>

                            <Menu vertical>
                                <Dropdown text='Option' pointing='left' className='link item'>

                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            <center>
                                                <p onClick={this.handleOpenModal}>Forward To</p>
                                                <Modal style={style}
                                                    isOpen={this.state.showModal}
                                                    contentLabel="Minimal Modal Example" >

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
        height: '300px',
    }
};
const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
]
export default Queue





