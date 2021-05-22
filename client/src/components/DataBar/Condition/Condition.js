import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import useStyles from "./styles"
import { CardActionArea, Grid } from '@material-ui/core'
import tlr from './tlr.png'
import tlg from './tlg.png'
import tly from './tly.png'
import tl from './tl.png'

function Condition({ data }) {
  const classes = useStyles()
  let condition
  let icon = tl
  switch (data) {
    case '10':
      icon = tlr;
      condition = 'Bad'
      break;
    case '11':
      icon = tly;
      condition = 'Normal'
      break;
    case '01':
      icon = tlg;
      condition = 'Fine'
      break;
    default:
      break;
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
              <Typography variant="h5" component="h2" align="center">Condition</Typography>
              <Typography variant="h6" component="h2" align="center">{ condition }</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Condition
