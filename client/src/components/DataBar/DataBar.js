import React, { useState } from 'react'
import { Container, Grid, Button, CircularProgress } from '@material-ui/core'
import useStyles from "./styles"
import Condition from './Condition/Condition'
import Temperature from './Temperature/Temperature'
import Humidity from './Humidity/Humidity'
import Light from './Light/Light'
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { getData } from '../../action/auth'

const initialState = {condition: 'null', temperature: 'null', humidity: 'null', light: 'null'}

function DataBar() {
  const data = useSelector((state) => state.data)
  const classes = useStyles()

  return (
    !data.length == 0 ? <CircularProgress /> : (
    <Container>
      <Grid className={classes.root} container justify="space-between" alignItems="stretch">
        <Grid item xs={6} sm={3}>
          <Condition data = {data.condition} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Temperature data = {data.temperature} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Humidity data = {data.humidity} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Light data = {data.light} />
        </Grid>
      </Grid>
    </Container>
    )
  )
}

export default DataBar
