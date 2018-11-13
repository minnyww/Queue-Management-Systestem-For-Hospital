import React, { Component } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";


const DropdownQueue = props => {
  return (
    <div>
      <Menu compact style={{ marginLeft: "3%" }}>
        <Dropdown.Menu>
          <Dropdown
            placeholder="Queue"
            options={props.userType === 3 ? typeAdmin : type}
            simple
            item
          // value={props.dropdownValue}
          // onChange={(e, { value }) => props.setField("dropdownValue", value)}
          />
          <Dropdown
            // disabled={props.type.value !== 'Queue' ? true : false}
            placeholder="Department"
            options={props.departments}
            simple
            item
            value={props.departmentId}
            disabled />
          <Dropdown
            // disabled={props.type.value !== 'Queue' ? true : false}
            placeholder="Doctor"
            options={props.doctors}
            simple
            item
            value={props.doctorId}
            onChange={async (e, { value }) => {
              props.chooseDoctor(value);
            }} />
        </Dropdown.Menu>
      </Menu>
    </div>
  );
};

const typeAdmin = [
  {
    key: 1,
    text: <Link to={"/Adminhome"}>Queue </Link>,
    value: "Queue"
  },
  {
    key: 2,
    text: <Link to={"/Appointment"}>Appointment</Link>,
    value: "Appointment"
  },
  {
    key: 3,
    text: <Link to={"/Timetable"}>Timetable</Link>,
    value: "Timetable"
  },
  {
    key: 4,
    text: <Link to={"/AddOrDeleteDepartment"}>Department Management</Link>,
    value: "Department Management"
  },
  {
    key: 5,
    text: <Link to={"/Main"}>Main</Link>,
    value: "MainMenu"
  },
];


const type = [
  {
    key: 1,
    text: <Link to={"/Adminhome"}>Queue </Link>,
    value: "Queue"
  },
  {
    key: 2,
    text: <Link to={"/Appointment"}>Appointment</Link>,
    value: "Appointment"
  },
  {
    key: 3,
    text: <Link to={"/Timetable"}>Timetable</Link>,
    value: "Timetable"
  },
  {
    key: 4,
    text: <Link to={"/Main"}>Main</Link>,
    value: "MainMenu"
  },
];
export default DropdownQueue;
