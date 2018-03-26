import _ from 'lodash'

import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'


export default class SearchPatient extends Component {

  render() {
    

    return (
      <div>
        <center>
          <Grid>

            <Grid.Column width={16}>
              <Search>HN</Search>

            </Grid.Column>

          </Grid>
        </center>
      </div>
    )
  }
}
