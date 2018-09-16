import React, { Component } from "react";
import Modal from 'react-responsive-modal';
import { Grid, Button, Form, List, Label, Dropdown, Input } from "semantic-ui-react";

const modalDetailAppointment = props => {
    console.log("props", props)
    return (
        <div>
            <ceter>
                {props.showPatientDescription()}
            </ceter>



        </div>
    );
};

export default modalDetailAppointment;
