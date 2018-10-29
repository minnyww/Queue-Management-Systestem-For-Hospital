import React, { Component } from "react";
import "./../css/Q.css";
import { Header, Grid, Step, Icon } from "semantic-ui-react";

const tablepatient = props => {
  console.log("props", props);

  return (

    <div>
      <center>
        <Header size="medium">สถานะ</Header>
        <Step.Group style={{ marginBottom: '5%', marginTop: '1.5%' }}>
          {props.showStepQueue()}
        </Step.Group>

      </center>
    </div>
  );
};

export default tablepatient;
