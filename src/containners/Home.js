import React, { Component } from 'react';
import Profile from './../components/profile';
import Tablepatient from './../components/table';
import './../css/Q.css';
//import 'semantic-ui-css/semantic.min.css';
import './../css/App.css';
import Headerbaruser from './../components/headerbaruser';
import Modal from 'react-modal';
class Home extends Component {
  state = {
    showIsModal: false
  }

  // handleOpenModal = () => {
  //   this.setState({ showModal: true });
  // }

  // handleCloseModal = () => {
  //   this.setState({ showModal: false });
  // }
  componentWillMount = () => {
    Modal.setAppElement('body');
  }

  setField = (field, value) => {
    console.log(field + ' / ' + value)
    this.setState({ [field]: value })
  }

  render() {
    console.log(this.state)
    return (

      <div>
        <Headerbaruser />
        <Profile
          showIsModal={this.state.showIsModal}
          setField={this.setField}
        />
        <br />
        <Tablepatient />
      </div>





    );
  }
}

export default Home;
