import React, { Component } from 'react';
import Queue from './components/Queue';
import Dropdownq from './components/Dropdownq';
import Labwait from './components/Labwait';
import './css/Q.css'
import CardExampleCard from './components/Queue';
import Headerbar from './components/headerbar';
class Adminhome extends Component {
    render() {
        return (
            <div>
                <Headerbar/>
                {/* dropdown ตรงนี้ Dropdownq.js*/}
                {/* กดละต้องเปลี่ยน content ด้วย Dropdownq.js*/}
                <Dropdownq/>
                <br/>
                
                {/* แสดงคิวอันนี้ Queue.js*/}
                <Queue />
                
                
                
                
                
                
                <br/>
                <br/>
                
                
            </div>


        );
    }
}
export default Adminhome;