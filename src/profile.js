import React, { Component } from 'react';


class profile extends Component {
  render() {
    return (
      <div>
        <center>
          <div class="ui card">
            <img src="https://cbsnews2.cbsistatic.com/hub/i/r/2016/10/11/4a8c782f-b02e-486c-a3a9-f15049617512/thumbnail/620x350/c8c9686798e52f059876c8b897cacc6c/istock-67470795-large.jpgg" class="ui image" />
            <div class="content">

              {/* ตรงนี้ดึงชื่อ นามสกุล */}
              <div class="header">Eric Cantona</div>
              <div class="meta">
                {/* ตรงนี้ต้องดึง HN */}
                <span class="date">HN : 12345/61</span>
              </div>
              <div class="extra content">
                <a>
                  {/* ตรงนี้ดึงข้อมูลบัตรนัดของผู้ป่วยมา */}
                  <i aria-hidden="true" class="user icon"></i>ดูบัตรนัด</a>

              </div>
            </div>

          </div>
        </center>
      </div>
    );
  }
}
export default profile;



