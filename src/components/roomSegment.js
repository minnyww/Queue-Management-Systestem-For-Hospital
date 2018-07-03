import React, { Component } from 'react'
import { Segment, Header, Grid } from 'semantic-ui-react'

const RoomSegment = (props) => {
  return (
    < Grid>
      <Grid.Column width={7} style={{ margin: '3%' }}>
        <Segment.Group style={{ width: '100%' }}>
          <Segment inverted color='blue'>
            <Header as='h3'>
              Room:1
            </Header>
          </Segment>
          <Segment>
            asdssd
          </Segment>
        </Segment.Group>
        <br/>
        <Segment.Group style={{ width: '100%' }}>
          <Segment inverted color='blue'>
            <Header as='h3'>
              Room:
            </Header>
          </Segment>
          <Segment>
            asdssd
          </Segment>
        </Segment.Group>
        <br />
        <Segment.Group style={{ width: '100%' }}>
          <Segment inverted color='blue'>
            <Header as='h3'>
              Room:
            </Header>
          </Segment>
          <Segment>
            asdssd
          </Segment>
        </Segment.Group>
        <br />
        <Segment.Group style={{ width: '100%' }}>
          <Segment inverted color='blue'>
            <Header as='h3'>
              Room:
            </Header>
          </Segment>
          <Segment>
            asdssd
          </Segment>
        </Segment.Group>
        <br />
      </Grid.Column>
      <Grid.Column width={7} style={{ margin: '3%' }}>
        <Segment.Group style={{ width: '100%' }}>
          <Segment inverted color='blue'>
            <Header as='h3'>
              Room:
            </Header>
          </Segment>
          <Segment>
            asdssd
          </Segment>
        </Segment.Group>
        <br />
        <Segment.Group style={{ width: '100%' }}>
          <Segment inverted color='blue'>
            <Header as='h3'>
              Room:
            </Header>
          </Segment>
          <Segment>
            asdssd
          </Segment>
        </Segment.Group>
        <br />
        <Segment.Group style={{ width: '100%' }}>
          <Segment inverted color='blue'>
            <Header as='h3'>
              Room:
            </Header>
          </Segment>
          <Segment>
            asdssd
          </Segment>
        </Segment.Group>
        <br />
        <Segment.Group style={{ width: '100%' }}>
          <Segment inverted color='blue'>
            <Header as='h3'>
              Room:
            </Header>
          </Segment>
          <Segment>
            asdssd
          </Segment>
        </Segment.Group>
        <br />
      </Grid.Column>
    </ Grid>
  )
}
const numofroom = [
  { key: '1', text: '1', value: '1' },
  { key: '2', text: '2', value: '2' },
  { key: '3', text: '3', value: '3' },
  { key: '4', text: '4', value: '4' },
  { key: '5', text: '5', value: '5' },
  { key: '6', text: '6', value: '6' },
  { key: '7', text: '7', value: '7' },
  { key: '8', text: '8', value: '8' },
  { key: '9', text: '9', value: '9' },
  { key: '10', text: '10', value: '10' }
]
export default RoomSegment
