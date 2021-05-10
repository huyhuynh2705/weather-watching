import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import useStyles from "./styles"

function Humidity() {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography align="center" variant="h6">Humidity</Typography>
        <Typography align="center" variant="h6">50%</Typography>
      </CardContent>
      <CardActions />
      {/* <Button size="medium" fullWidth>More</Button> */}
    </Card>
    )
}

export default Humidity
