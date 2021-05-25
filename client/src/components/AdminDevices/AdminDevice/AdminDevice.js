import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import useStyles from "./styles"
import { CardActionArea, Grid } from '@material-ui/core'

function AdminDevice({ data }) {
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea>
        <CardContent>
            <Grid container spacing={1}>
                <Grid container>
                    <Grid item xs={2}>
                        <Typography variant="h6">Name:</Typography>
                        <Typography variant="body1">Type:</Typography>
                        <Typography variant="body1">Device Id:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h6">{ data.name }</Typography>
                        <Typography variant="body1">{ data.type }</Typography>
                        <Typography variant="body1">{ data._id }</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Typography variant="body1">Id Server: { data.idServer }</Typography>
                    <Typography variant="body1">Topic: { data.topic }</Typography>
                    <Typography variant="body1">Unit: { data.unit }</Typography>
                </Grid>
            </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default AdminDevice
