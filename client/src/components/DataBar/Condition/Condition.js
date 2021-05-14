import React from 'react'
import Card from '@material-ui/core/Card'
// import { Button } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import useStyles from "./styles"

function Condition({ data }) {
  const classes = useStyles()
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography align="center" variant="h6">Condition</Typography>
          <Typography align="center" variant="h6">{ data }</Typography>
        </CardContent>
        <CardActions />
        {/* <Button size="medium" fullWidth>More</Button> */}
      </Card>
    </div>
  )
}

export default Condition
