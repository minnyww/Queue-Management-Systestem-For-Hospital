import React, { Component } from 'react';
import './../css/Q.css'
import { Card, Icon, Image, Button, Form, Segment, Header, Table, Grid } from 'semantic-ui-react'


    const tablepatient = (props) => {
    return (

      <div>
        <center>
          <Grid columns={2} divided style={{ width:'100%' }} celled='internally'>
          
            <Grid.Row >
              <Grid.Column >
                
              <Header size='medium'>รายการ</Header>
              </Grid.Column>
              <Grid.Column >
              <Header size='medium'>รายละเอียด</Header>
              </Grid.Column>
              
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                คิวปัจจุบัน
              </Grid.Column>
              <Grid.Column>
                3
              </Grid.Column>
              
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                แพทย์
              </Grid.Column>
              <Grid.Column>
                นายแพทย์ สมศรี
              </Grid.Column>
              
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                แผนก
              </Grid.Column>
              <Grid.Column>
                กุมารเวช
              </Grid.Column>
              
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                ห้อง
              </Grid.Column>
              <Grid.Column>
              A01
              </Grid.Column>
              
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                ระยะเวลารอ
              </Grid.Column>
              <Grid.Column>
                20 นาที
              </Grid.Column>
              
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                สถานะ
              </Grid.Column>
              <Grid.Column>
               รอตรวจ
              </Grid.Column>
              
            </Grid.Row>
           
          </Grid>
        </center>
        </div >


    );
  }

export default tablepatient;