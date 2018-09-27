import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
const DropdownDepart = (props) => {
    
  return (
    <div>
        {/* <h1>{this.state.department}</h1> */}
      <Menu compact style={{ marginLeft: '3%' }}>
        <center>
        <Dropdown.Menu>
          <Dropdown
            placeholder='Department'
                options={props.department}
                simple item
                value={props.departmentId}
             />
        </Dropdown.Menu>
        </center>
        
      </Menu>
    </div>

  )
}

export default DropdownDepart
