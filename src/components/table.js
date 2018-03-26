import React, { Component } from 'react';
import './../css/Q.css'
import { Card, Icon, Image, Button, Form, Segment, Header, Table, Grid } from 'semantic-ui-react'
class tablepatient extends Component {
  render() {
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
        {/* 
        <center>
          <table class="ui celled collapsing very basic table">
            <thead class="">
              <tr class="">
                <th class="">รายการ</th>
                <th class="">รายละเอียด</th>
              </tr>
            </thead>
            <tbody class="">
              <tr class="">
                <td class="">

                  <div class="content">คิวปัจจุบัน

                  </div>

                </td>
                {/* ตรงนี้ดึงข้อมูลจาก คิวปัจจุบันมา (currentQueue) 
                <td class="">2</td>
              </tr>
              <tr class="">
                <td class="">


                  <div class="content">แพทย์


                  </div>

                </td>
                {/* ตรงนี้ดึงชื่อแพทย์มาแสดง 
                <td class="">นายแพทย์ สมศรี จริงๆ</td>
              </tr>
              <tr class="">
                <td class="">


                  <div class="content">แผนก

                  </div>

                </td>
                {/* ตรงนี้ดึงแผนกและชั้นมาแสดง
                <td class="">กุมารเวช ชั้น 2</td>
              </tr>
              <tr class="">
                <td class="">


                  <div class="content">ระยะเวลารอ

                  </div>

                </td>
                {/* ตรงนี้ดึงเวลาเฉลี่ยมาแสดง 
                <td class="">10 นาที</td>
              </tr>
              <tr class="">
                <td class="">


                  <div class="content">สถานะ

                  </div>

                </td>
                {/* ตรงนี้ดึงstatusมาแสดง 
                <td class="">รอตรวจ</td>
              </tr>

            </tbody>
          </table>   
        </center>
         */}

        {/* <div class="ui inverted divided padded equal width grid" id="tableUser" style={{ borderColor:'black' }}>
          <div class="center aligned row" >
            <div class="column">
              <div class="ui  grey row">1</div>
            </div>
            <div class="column">
              <div class="ui  grey row">2</div>
            </div>
            
          </div>
        </div> */}
        <br />
        <br />

        {/* ตารางบอกรายละเอียดต่างๆหน้า User */}
        {/* <div class="container" style={{ marginLeft:'5%',marginRight:'4%',marginBottom:'3%'}}>
        <table class="ui unstackable table center aligned" id="tableUser">
          <thead>
            <tr>
              <th>รายการ</th>
              <th>รายระเอียด</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>คิวปัจจุบัน</td>
              <td>2</td>
              
            </tr>
            <tr>
              <td>แพทย์</td>
              <td>นายแพทย์ สมศรี</td>
              
            </tr>
            <tr>
              <td>แผนก</td>
              <td>กุมารเวช ชั้น 2</td>
              
            </tr>
            <tr>
              <td>ระยะเวลารอ</td>
              <td>10 นาที</td>
              
            </tr>
            <tr>
              <td>สถานะ</td>
              <td>รอตรวจ</td>
              
            </tr>
          </tbody>
        </table>
        </div>
        

       */}</div >


    );
  }
}
export default tablepatient;