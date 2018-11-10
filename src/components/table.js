import React, { Component } from "react";
import "./../css/Q.css";
import { Header, Grid, Step, Icon, Message } from "semantic-ui-react";

const tablepatient = props => {
  console.log("props", props);

  return (

    <div>
      <center>
        <Header size="medium">สถานะ</Header>
        {props.queueData.statusId === 6 ?
          <Message
            style={{ width: '90%', marginLeft: '5%', marginRight: '5%' }}
            icon='info'
            warning
            header='Your are busy or absent ? ' content="Please contact staff"
          />
          : ''}
        <Step.Group style={{ marginBottom: '5%', marginTop: '1.5%' }}>
          {props.showStepQueue()}
        </Step.Group>

      </center>
    </div>
  );
};

export default tablepatient;
