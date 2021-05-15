import React, { useState } from 'react'
import { Container, Grid, Button, CircularProgress } from '@material-ui/core'
import useStyles from "./styles"
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { getData } from '../../action/auth'
import TrafficLight from '@components/Device/TrafficLight/TrafficLight'
import DHT11 from '@components/Device/DHT11/DHT11'
import Light from '@components/Device/Light/Light'

function Device() {
  const classes = useStyles()

  return (
    <Container>
      <Grid className={classes.root} container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <TrafficLight />
        </Grid>
        <Grid item xs={12}>
            <DHT11 />
        </Grid>
        <Grid item xs={12}>
            <Light />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Device
