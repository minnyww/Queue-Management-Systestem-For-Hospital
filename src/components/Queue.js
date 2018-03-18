import React, { Component } from 'react';

class Queue extends Component {
    render() {
        return (

            <div>
                <div class="ui vertical menu" id="box" style={{
                    overflowY: 'scroll', height: '400px', width: '300px',
                    marginLeft: '20px'
                }}>
                    <div class="item">
                        {/* ชื่อคนไข้ */}
                        <div class="header">Eric Cantona</div>

                        <div class="menu">

                            {/* แสดง Room */}
                            <p class="item">Room A01</p>
                            {/* แสดงชื่อแพทย์ */}
                            <p class="item">นาย สมศักดิ์
                            {/* แสดงเวลาที่รอ Min */}
                                <div class="ui teal left pointing label">10 min</div>
                            </p>

                        </div>

                    </div>
                    <div class="item">
                        <div class="header">Cristiano Ronaldo</div>
                        <div class="menu">
                            {/* แสดง Room */}
                            <p class="item">Room A01</p>
                            {/* แสดงชื่อแพทย์ */}
                            <p class="item">นาย สมศรี
                            {/* แสดงเวลาที่รอ Min */}
                                <div class="ui teal left pointing label">15 min</div>
                            </p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="header">Hosting</div>
                        <div class="menu">
                            {/* แสดง Room */}
                            <p class="item">Room A01</p>
                            {/* แสดงชื่อแพทย์ */}
                            <p class="item">นาย สมหมาย
                            {/* แสดงเวลาที่รอ Min */}
                                <div class="ui teal left pointing label">20 min</div>
                            </p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="header">Support</div>
                        <div class="menu">
                            {/* แสดง Room */}
                            <p class="item">Room A01</p>
                            {/* แสดงชื่อแพทย์ */}
                            <p class="item">นาย สมร้ากก
                            {/* แสดงเวลาที่รอ Min */}
                                <div class="ui teal left pointing label">30 min</div>
                            </p>
                        </div>
                    </div>
                </div>
                {/* ถึงนี้ */}

            </div>


        );
    }
}
export default Queue;