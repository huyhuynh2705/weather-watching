import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import useStyles from "./styles"
import { CardActionArea, Grid } from '@material-ui/core'

import icon from './hud.png'

function Humidity({ data }) {
  const classes = useStyles()
  
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Grid container >
            <Grid item xs={3} sm={3}>
              <img className={classes.media} src={icon} alt="tl" />
            </Grid>
            <Grid item xs={9} sm={9}>
              <Typography variant="h5" component="h2" align="center">Humidity</Typography>
              <Typography variant="h6" component="h2" align="center">{ data }</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Humidity
