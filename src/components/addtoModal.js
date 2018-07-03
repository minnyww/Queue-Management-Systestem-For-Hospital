import React, { Component } from 'react'
import Modal from 'react-modal'
import { Grid, Button, Dropdown, Menu, Icon, Dimmer, Header, Label, Item, Form, Input, TextArea, List, Table, Image, Message, Confirm, Card } from 'semantic-ui-react'
import swal from 'sweetalert';


const AddtoDepart = (props) => {
  const setField = props.setField
  return (

    <div>
          <Grid style={{ margin: '3%' }}>
          <Button color='teal' onClick={() => swal( 
              {
                content: {
                      element: "input",
                      attributes: {
                          placeholder: "Please enter HN",
                          type: "HN",
                      },
                  },
                closeModal: false,
                dangerMode: true,
                button: "Add",  
                }
            )}
            //   onBlur={() => props.validateHN()}
            //   value={props.HN}
            //   onChange={(e, { value }) => setField('HN', value)}
            >
              Add To</Button></Grid>
          <Modal
              isOpen={props.modalIsOpen}
              onRequestClose={() => setField('modalIsOpen', false)}
              style={customStyles}>

              <Form onSubmit={(e) => {
                  props.addQueue(e)
              }}>
                  <Form.Input
                    //   onBlur={() => props.validateHN()}
                      icon='search'
                      fluid label='HN'
                      name="HN"
                      placeholder='HN'
                      value={props.HN}
                      onChange={(e, { value }) => setField('HN', value)} />
                  
                  <br />
                  <center>
                      <List>
                          <List.Item>
                              <List.Content>

                                  Name: {props.namePatient}
                                  {props.lastNamePatient}


                              </List.Content>
                          </List.Item>

                      </List>
                  </center>
                  <br />
                  <br />
                  <center>
                      <Button type="submit" color='green'>
                          Add
                                    </Button>
                  </center>
              </Form>
          </Modal>
    </div>
  )
}

const customStyles = {
  content: {
    margin: 'auto',
    maxWidth: '450px',
    height: '350px',
    borderRadius: '25px',
    border: '2px solid #1976D2'
  }
}

export default AddtoDepart
