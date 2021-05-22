import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import useStyles from "./styles"
import { CardActionArea, Grid } from '@material-ui/core'

import light from './light.png'
import lightlow from './lightlow.png'
import lightmed from './lightmed.png'
import lighthigh from './lighthigh.png'

function Light({ data }) {
  const classes = useStyles()

  let icon = light
  
  if (Number(data) <= 200) {
    icon = lightlow;
  }
  else if (Number(data) > 200 && Number(data) < 500) {
    icon = lightmed;
  }
  else if (Number(data) >= 500){
    icon = lighthigh;
  }

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Grid container >
            <Grid item xs={3} sm={3}>
              <img className={classes.media} src={icon} alt="tl" />
            </Grid>
            <Grid item xs={9} sm={9}>
              <Typography variant="h5" component="h2" align="center">Light</Typography>
              <Typography variant="h6" component="h2" align="center">{ data }</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Light
