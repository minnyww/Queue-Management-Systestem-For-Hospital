import React, { Component } from 'react';

class Dropdownq extends Component {
    render() {
        return (
            

            
            <div>
                {/* กดละต้องเปลี่ยน content ด้วย */}
                <div class="ui compact menu" style={{ marginLeft:'20px'}}>
                    <div role="listbox" aria-expanded="false" class="ui item simple dropdown" tabindex="0">
                        <div class="text" role="alert" aria-live="polite">Queues</div>
                        <i aria-hidden="true" class="dropdown icon"></i>
                        <div class="menu transition">
                            <div style={{ pointerEvents: 3 }} role="option" aria-checked="false" aria-selected="true" class="selected item">
                                <span class="text">Apoointment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
export default Dropdownq;