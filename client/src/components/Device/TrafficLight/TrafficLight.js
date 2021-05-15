import React from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from "./styles"
import { Grid, Paper } from '@material-ui/core'
import tl from './tl.png'

function TrafficLight() {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Grid container >
            <Grid item xs={2} sm={2}>
              <img className={classes.media} src={tl} alt="tl" />
            </Grid>
            <Grid item xs={10} sm={10}>
              <h1>Something in here</h1>
            </Grid>
          </Grid>
    </Paper>
  )
}

export default TrafficLight
