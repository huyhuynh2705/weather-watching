import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import useStyles from "./styles"

function Temperature({ data }) {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography align="center" variant="h6">Temperature</Typography>
        <Typography align="center" variant="h6">{ data.temperature }°C</Typography>
      </CardContent>
      <CardActions />
      {/* <Button size="medium" fullWidth>More</Button> */}
    </Card>
  )
}

export default Temperature
