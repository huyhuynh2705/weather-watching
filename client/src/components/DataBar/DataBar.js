import React from 'react'
import { Container, Grid, CircularProgress } from '@material-ui/core'
import useStyles from "./styles"
import Condition from './Condition/Condition'
import Temperature from './Temperature/Temperature'
import Humidity from './Humidity/Humidity'
import Light from './Light/Light'
import { useSelector } from 'react-redux';

function DataBar() {
  const classes = useStyles()

  let data = useSelector((state) => state.data)

  // console.log("data from databar: ", data)

  if (data.length == 0) {
    data = {condition: "null", temperature: "null", humidity: "null", light:"null"}
  }

  return (
    data.length == 0 ? <CircularProgress /> : (
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
