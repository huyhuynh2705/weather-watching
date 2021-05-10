import React from 'react'
import { Container, Grid } from '@material-ui/core'
import useStyles from "./styles"
import Condition from './Condition/Condition'
import Temperature from './Temperature/Temperature'
import Humidity from './Humidity/Humidity'
import Light from './Light/Light'

function DataBar() {
  const classes = useStyles()
  return (
    <Container>
      <Grid className={classes.root} container justify="space-between" alignItems="stretch">
        <Grid item xs={6} sm={3}>
          <Condition />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Temperature />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Humidity />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Light />
        </Grid>
      </Grid>
    </Container>
  )
}

export default DataBar
