import React from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from "./styles"
import { Paper } from '@material-ui/core'


function DHT11() {
  const classes = useStyles()
  
  return (
    <Paper>
      <Typography variant="h5" component="h2" align="center">DHT11</Typography>
      <Typography variant="h5" component="h2" align="center">DHT11</Typography>
      <Typography variant="h5" component="h2" align="center">DHT11</Typography>
      <Typography variant="h5" component="h2" align="center">DHT11</Typography>
    </Paper>
  )
}

export default DHT11
