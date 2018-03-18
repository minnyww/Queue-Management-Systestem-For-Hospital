import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Admin.css';
class test extends Component {
    render() {
        return (

            <div>
                <div class="ui segment item">
                    <h1>ระบบจัดการผู้ป่วย</h1>
                </div>
                <br />
                <br />
                <center>
                    <form class="ui form">

                        <div class="field" style={{ paddingRight: 40, paddingLeft: 40 }}>
                            <label>Username</label>
                            <input placeholder="Username" />
                        </div>
                        <div class="field" style={{ paddingRight: 40, paddingLeft: 40 }}>
                            <label>Password</label>
                            <input placeholder="Password" />
                        </div>

                        <Link to={'/Adminhome'} class="primary ui button">Sign in</Link>

                    </form>

                </center>
            </div>


        );
    }
}
export default test;