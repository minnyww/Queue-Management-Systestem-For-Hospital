import React, { Component } from 'react';
import Rail, { Segment } from 'semantic-ui-react'
import { Grid, Button, Dropdown, Menu, Icon, Dimmer, 
        Header, Label, Item, Form, Input, TextArea,List } from 'semantic-ui-react'
import Modal from 'react-modal';
class Queue extends Component {

    // Modal
    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.state = {
            modalIsOpen: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle;
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }
    // --------------

    render() {

        return (
            <div>
                < Grid >
                    <Grid.Column width={4}>
                        <Segment.Group id="box">
                            <Segment color='blue'><Header>Queue</Header></Segment>
                            <Segment.Group >
                                <Segment >

                                    ท้าวทอง กีมา<br />
                                    Room : A01<br />
                                    แผนก : จิตเวช
                        <Label color='blue' style={{ float: 'Right' }}>
                                        <Icon name='time' /> 23 min

                        </Label>
                                </Segment>
                                <Segment >

                                    Nested Middle<br />
                                    Nested Middle<br />
                                    Nested Middle
                        <Label color='blue' style={{ float: 'Right' }}>
                                        <Icon name='time' /> 23 min

                        </Label>
                                </Segment>
                                <Segment >

                                    Nested Bottom<br />
                                    Nested Bottom<br />
                                    Nested Bottom
                        <Label color='blue' style={{ float: 'Right' }}>
                                        <Icon name='time' /> 23 min

                        </Label>
                                </Segment>

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
                                contentLabel="Example Modal"
                            >
                                
                                <Form>
                                    <Form.Group widths='equal'>
                                        <Form.Field id='' control={Input} label='กรอก HN' placeholder='HN' />
                                        <br />

                                    </Form.Group>
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
                                </Form>
                                <br/>
                                <br/>
                                <center>
                                <Button   color='green' onClick={this.closeModal}>Add</Button>
                                </center>

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
                                                    <i class="large window close icon" onClick={this.handleCloseModal}
                                                        style={{ float: 'right', marginBottom: '5%', color: 'red' }}>
                                                    </i>
                                                    <br />
                                                    <br />
                                                    
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





