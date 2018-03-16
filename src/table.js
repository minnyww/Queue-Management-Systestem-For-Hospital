import React, { Component } from 'react';

class tablepatient extends Component {
  render() {
    return (

      <div>
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
                {/* ตรงนี้ดึงข้อมูลจาก คิวปัจจุบันมา (currentQueue) */}
                <td class="">2</td>
              </tr>
              <tr class="">
                <td class="">


                  <div class="content">แพทย์


                  </div>

                </td>
                {/* ตรงนี้ดึงชื่อแพทย์มาแสดง */}
                <td class="">นายแพทย์ สมศรี จริงๆ</td>
              </tr>
              <tr class="">
                <td class="">


                  <div class="content">แผนก

                  </div>

                </td>
                {/* ตรงนี้ดึงแผนกและชั้นมาแสดง */}
                <td class="">กุมารเวช ชั้น 2</td>
              </tr>
              <tr class="">
                <td class="">


                  <div class="content">ระยะเวลารอ

                  </div>

                </td>
                {/* ตรงนี้ดึงเวลาเฉลี่ยมาแสดง */}
                <td class="">10 นาที</td>
              </tr>
              <tr class="">
                <td class="">


                  <div class="content">สถานะ

                  </div>

                </td>
                {/* ตรงนี้ดึงstatusมาแสดง */}
                <td class="">รอตรวจ</td>
              </tr>

            </tbody>
          </table>
        </center>
      </div>


    );
  }
}
export default tablepatient;