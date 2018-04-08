import React from 'react';
import { Segment } from 'semantic-ui-react'
import {
    Grid, Button, Dropdown, Menu, Icon, Dimmer,
    Header, Label, Item, Form, Input, TextArea, List, Table, Image, Message, Confirm
} from 'semantic-ui-react'
import * as moment from 'moment';

const showPatient = () => {
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

export default showPatient;