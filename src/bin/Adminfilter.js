import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Headerbar from "./../components/headerbar";
import axios from "./../lib/axios";
import DropdownDepart from "./departmentDropdown";
import "moment-range";
import AddtoDepart from "./addtoModal"
import RoomSegment from "./roomSegment";
import "moment/locale/th.js";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

class Adminfilter extends Component {
  state = {
    // showModal: false,
    // modalIsOpen: false,
    // errorHN: '',
    // errorGetName: '',
    // errorAdd: '',
    departments: [{ key: "", text: "", value: "" }],
    date: new Date()
  };

  setField = (field, value) => {
    this.setState({ [field]: value });
  };
  onChange = date => this.setState({ date });
  componentWillMount = async () => {
    const department = await axios.get("/getDepartment");
    const departmentOption = department.data.map(departments => ({
      key: departments.departmentId,
      text: departments.department,
      value: departments.departmentId
    }));
    this.setState({
      departments: departmentOption
    });
    var d = this.state.clickDate;
    console.log(d);
  };
  onClick = date => this.setState({ date });
  // componentWillUpdate(nextProps, nextState){
  //   if (nextState.open == false && this.state.open == true) {
  //     this.props.onWillOpen();
  //   }
  //   const clickDate = this.state.date
  //   this.setState({
  //     date : clickDate
  //   })
  //   var d = this.state.clickDate;
  //   console.log(d);
  // }

  render() {
    return (
      <div>
        <Headerbar />

        <Grid width={7} style={{ margin: "2%" }}>
          {/* <Calendar 
          format='DD/MM/YYYY'
          date={this.state.date}
          onChange={this.onChange}
          />
        <br/> */}
          <DatePickerInput
            onChange={this.onChange}
            onClick={this.onChange}
            value={this.state.date}
          />
          <DropdownDepart department={this.state.departments} />
          <br />
        </Grid>
        <AddtoDepart />

        <RoomSegment />
      </div>
    );
  }
}

export default Adminfilter;
