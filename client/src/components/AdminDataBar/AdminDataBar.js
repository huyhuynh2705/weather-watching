import React from 'react'
import { Container, Grid, CircularProgress } from '@material-ui/core'
import useStyles from "./styles"
import ActiveDevice from './ActiveDevice/ActiveDevice'

function AdminDataBar() {
  const classes = useStyles()

  let data =[1]

  return (
    data.length == 0 ? <CircularProgress /> : (
    <Container>
      <Grid className={classes.root} container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <ActiveDevice data = {data} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* <Temperature data = {data.temperature} /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* <Humidity data = {data.humidity} /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* <Light data = {data.light} /> */}
        </Grid>
      </Grid>
    </Container>
    )
  )
}

export default AdminDataBar
