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
  //const [data, setData] = useState(initialState)
  return (
    !data.length ? <CircularProgress /> : (
    <Container>
      <Grid className={classes.root} container justify="space-between" alignItems="stretch">
        <Grid item xs={6} sm={3}>
          <Condition data = {data[data.length - 1]} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Temperature data = {data[data.length - 1]} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Humidity data = {data[data.length - 1]} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Light data = {data[data.length - 1]} />
        </Grid>
      </Grid>
    </Container>
    )
  )
}

export default DataBar
