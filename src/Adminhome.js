import React, { Component } from 'react';
import Queue from './components/Queue';

import Dropdownq from './components/Dropdownq';
import Labwait from './components/Labwait';
class Adminhome extends Component {
    render() {
        return (
            <div>
                <div class="ui segment ">

                    <h1>ระบบจัดการผู้ปวย</h1>

                </div>
                {/* dropdown ตรงนี้ Dropdownq.js*/}
                {/* กดละต้องเปลี่ยน content ด้วย Dropdownq.js*/}
                <Dropdownq/>
                <br/>
                
                {/* แสดงคิวอันนี้ Queue.js*/}
                <Queue />

                {/* แสดงคิวถึงนี้ */}
                <br/>
                <button class="ui primary button" style={{ marginLeft:'100px' }}>Add Patient</button>
                <br/>
                
                <h2 style={{ marginLeft:'113px' }}>Labwait</h2>
                <Labwait/>
                <center>
                    <button class="ui primary button" style={{ marginBottom: '20px' }}>Call</button>
                </center>
            </div>


        );
    }
}
export default Adminhome;