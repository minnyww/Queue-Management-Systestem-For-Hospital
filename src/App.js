import React, { Component } from 'react';
import Profile from './profile';
import Tablepatient from './table';
import { Button } from 'semantic-ui-react';
//import 'semantic-ui-css/semantic.min.css';
import './css/App.css';

class App extends Component {
  render() {
    return (

        <div>
        <div class="ui segment ">
          <h1>ตรวจสอบสถานะผู้ป่วย</h1>
        </div>
        <Profile />
        <br/>
        <Tablepatient/>
         </div>





    );
  }
}

export default App;
