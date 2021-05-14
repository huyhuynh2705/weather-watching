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

function DataBar() {
  const classes = useStyles()

  const data = useSelector((state) => state.data)

  console.log("data from databar: ", data)

  return (
    !data.length == 0 ? <CircularProgress /> : (
    <Container>
      <Grid className={classes.root} container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Condition data = {data.condition} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Temperature data = {data.temperature} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Humidity data = {data.humidity} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Light data = {data.light} />
        </Grid>
      </Grid>
    </Container>
    )
  )
}

export default DataBar
