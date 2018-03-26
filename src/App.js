import React, { Component } from 'react';
import Profile from './components/profile';
import Tablepatient from './components/table';

import './css/Q.css';
//import 'semantic-ui-css/semantic.min.css';
import './css/App.css';
import Headerbaruser from './components/headerbaruser';

class App extends Component {
  render() {
    return (

      <div>
        <Headerbaruser/>
        <Profile />
        <br />
        <Tablepatient />

        

      </div>





    );
  }
}

export default App;
