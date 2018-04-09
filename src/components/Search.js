import _ from 'lodash'

import React, { Component } from 'react'
import { Search, Grid, Header, Table, Checkbox } from 'semantic-ui-react'


const searchPatient = (props) => {
  return (
    <div>
      <center>
        <Grid>

          <Grid.Column width={16}>
            <Header size='huge'>คัดกรองผู้ป่วย</Header>
            <br />
            <Search >HN</Search>
            <br />
            <Table color=' blue' style={{ maxWidth: '80%' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>HN</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Checkbox toggle />
                  </Table.Cell>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>12345/61</Table.Cell>
                  <Table.Cell>
                    John is an interesting boy but sometimes you don't really have enough room to describe everything you'd like
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Checkbox toggle />
                  </Table.Cell>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>12346/61</Table.Cell>
                  <Table.Cell>
                    Jamie is a kind girl but sometimes you don't really have enough room to describe everything you'd like
                </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Checkbox toggle />
                  </Table.Cell>
                  <Table.Cell>Jill</Table.Cell>
                  <Table.Cell>12347/61</Table.Cell>
                  <Table.Cell>
                    Jill is an alright girl but sometimes you don't really have enough room to describe everything you'd like
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>


          </Grid.Column>

        </Grid>
      </center>
    </div>
  )
}

export default searchPatient
