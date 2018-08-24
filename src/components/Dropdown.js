import React, { Component } from "react";
import { Dropdown, Menu, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DropdownQueue = props => {
  return (
    <div>
      <Menu compact style={{ marginLeft: "3%" }}>
        <Dropdown.Menu>
          <Dropdown
            placeholder="Queue"
            options={type}
            simple
            item
            value={props.type}
          />

          <Dropdown
            placeholder="Department"
            options={props.departments}
            simple
            item
            value={props.departmentId}
            disabled
          />
          {/* <Dropdown
                        placeholder='Room'
                        options={props.rooms}
                        simple item
                        value={props.roomId}
                        onChange={async (e, { value }) => {
                            console.log(value)
                            await props.setField('roomId', value)
                            // props.getDoctorId()
                        }} /> */}
          <Dropdown
            placeholder="Doctor"
            options={props.doctors}
            simple
            item
            value={props.doctorId}
            onChange={async (e, { value }) => {
              props.chooseDoctor(value);
            }}
          />
        </Dropdown.Menu>
      </Menu>
    </div>
  );
};

const type = [
  { key: 1, text: "Queue", value: "Queue" },
  {
    key: 2,
    text: <Link to={"/Adminfilter"}>คัดกรองผู้ป่วย</Link>,
    value: "คัดกรองผู้ป่วย"
  },
  { key: 3, text: "Appointment", value: "Appointment" }
];
export default DropdownQueue;
