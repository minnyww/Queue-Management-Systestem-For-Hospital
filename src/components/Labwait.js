import React, { Component } from 'react';

class Labwait extends Component {
    render() {
        return (

            <div>
                <div class="ui vertical menu" id="box" style={{
                    overflowY: 'scroll', height: '200px', width: '300px',
                    marginLeft: '20px', marginBottom: '20px'
                }}>
                    <div class="item">
                        {/* ชื่อคนไข้ */}
                        <div class="item">Fabio Halo
                        <div class="ui teal left pointing label">10 min</div>
                            <a class="ui orange empty circular label"></a>
                        </div>

                    </div>
                    <div class="item">
                        {/* ชื่อคนไข้ */}
                        <div class="item">Devid Beck
                        <div class="ui teal left pointing label">12 min</div>
                            <a class="ui green empty circular label"></a>
                        </div>

                    </div>
                    <div class="item">
                        {/* ชื่อคนไข้ */}
                        <div class="item">Sing Ab
                        <div class="ui teal left pointing label">15 min</div>
                            <a class="ui orange empty circular label"></a>
                        </div>

                    </div>
                    <div class="item">
                        {/* ชื่อคนไข้ */}
                        <div class="item">Alex Naja
                        <div class="ui teal left pointing label">20 min</div>
                            <a class="ui orange empty circular label"></a>
                        </div>

                    </div>
                    <div class="item">
                        {/* ชื่อคนไข้ */}
                        <div class="item">Robert Pakinson
                        <div class="ui teal left pointing label">60 min</div>
                            <a class="ui orange empty circular label"></a>
                        </div>

                    </div>


                </div>
                
            </div>


        );
    }
}
export default Labwait;