import React, { Component } from 'react';
import logo1 from './img/logo1.png';
import './css/home.css';

class Homeuser extends Component {
    render() {
        return (

            <div class="">
                <br/>
                <br/>
                <br/>
                <img src={logo1} class="ui small centered image" />
                <br/>
                <br/>
                <br/>
                <br/>
                <form class="ui form">
                    <div class="field" style={{ paddingRight:40, paddingLeft:40 }}>
                        <center><label>HN</label></center>
                        <input placeholder="HN Number" />
                    </div>
                    <div class="field" style={{ paddingRight:40, paddingLeft:40 }}>
                        <center><label>Tel Number</label></center>
                        <input placeholder="Phone Number" />
                    </div>
                    <center>
                    <br/>
                    <br/>
                    <a href="./App.js"  class="ui primary button" role="button">Enter</a>
                    </center>
                </form>
            </div>


        );
    }
}
export default Homeuser;