import React  from 'react'
import { CircularProgress, Container, Grid } from '@material-ui/core'
import useStyles from "./styles"
import TrafficLight from '@components/Device/TrafficLight/TrafficLight'
import DHT11 from '@components/Device/DHT11/DHT11'
import Light from '@components/Device/Light/Light'
import { useSelector } from 'react-redux'


function Device() {
  const classes = useStyles()

  const data = useSelector((state) => state.alldevicedata)

  return data.length == 0 ? <CircularProgress /> : (
    <Container>
      <Grid className={classes.root} container justify="space-between" alignItems="stretch" spacing={2}>
        <Grid item xs={12}>
          <TrafficLight data={data.tlvalues}/>
        </Grid>
        <Grid item xs={12}>
            <DHT11 data={data.dhtvalues}/>
        </Grid>
        <Grid item xs={12}>
            <Light data={data.lvalues}/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Device
