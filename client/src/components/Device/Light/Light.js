import React from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from "./styles"
import { Paper } from '@material-ui/core'


function Light() {
  const classes = useStyles()
  
  return (
    <Paper>
      <Typography variant="h5" component="h2" align="center">Light</Typography>
      <Typography variant="h5" component="h2" align="center">Light</Typography>
      <Typography variant="h5" component="h2" align="center">Light</Typography>
      <Typography variant="h5" component="h2" align="center">Light</Typography>
    </Paper>
  )
}

export default Light
