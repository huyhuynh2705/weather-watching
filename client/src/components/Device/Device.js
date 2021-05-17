import React  from 'react'
import { Container, Grid } from '@material-ui/core'
import useStyles from "./styles"
import TrafficLight from '@components/Device/TrafficLight/TrafficLight'
import DHT11 from '@components/Device/DHT11/DHT11'
import Light from '@components/Device/Light/Light'
import { useSelector } from 'react-redux'


function Device() {
  const classes = useStyles()

  const data = useSelector((state) => state.trafficlightdata)

  return (
    <Container>
      <Grid className={classes.root} container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <TrafficLight data={data}/>
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
