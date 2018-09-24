import React, { Component } from "react";
import "./../css/Q.css";
import { Header, Grid, Step, Icon } from "semantic-ui-react";

const tablepatient = props => {
  console.log("props", props);

  return (

    <div>
      <center>
        {/* <Grid columns={2} divided style={{ width: "100%" }} celled="internally">
          <Grid.Row>
            <Grid.Column>
              <Header size="medium">รายการ</Header>
            </Grid.Column>
            <Grid.Column>
              <Header size="medium">รายละเอียด</Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>คิวปัจจุบัน</Grid.Column>
            <Grid.Column>{props.queueData.currentQueue}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>แพทย์</Grid.Column>
            <Grid.Column>
              {props.queueData.firstname} {props.queueData.lastname}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>แผนก</Grid.Column>
            <Grid.Column>
              {props.queueData.statusId === 2
                ? "lab"
                : props.queueData.department}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>ห้อง</Grid.Column>
            <Grid.Column>
              {props.queueData.statusId === 2 ? "lab" : props.queueData.roomId}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>ระยะเวลารอ </Grid.Column>
            <Grid.Column>
              {props.queueData.statusId !== 4 ?
                parseInt(props.queueData.avgtime).toFixed(0) + ` Min` : ''}
            </Grid.Column>
          </Grid.Row> */}
        {/* <Grid.Row>
            <Grid.Column>สถานะ</Grid.Column>
            <Grid.Column>{props.queueData.description}</Grid.Column>
          </Grid.Row> */}
        {/* </Grid> */}
        <Header size="medium">สถานะ</Header>
        <Step.Group style={{ marginBottom: '5%', marginTop: '1.5%' }}>
          {props.showStepQueue()}
        </Step.Group>

      </center>
    </div>
  );
};

export default tablepatient;
