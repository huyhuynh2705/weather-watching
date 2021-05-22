import React, { useEffect } from 'react'
import useStyles from "./styles"
import { Grid, Paper, Typography } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import light from './light.png'

function createData(time, date, deviceId, type, temperature, humidity) {
  return { time, date, deviceId, type, temperature, humidity };
}

function DHT11({ data }) {
  const classes = useStyles()

  if (data.length == 0) {
    return (
      <Paper>
        <Typography align="center" variant="h6">DHT11 data is empty</Typography>
      </Paper>
    )
  }

  let rows1 = []
  let rows2 = []
  let divide 

  if (data.length % 2 != 0) {
    divide = (data.length +1) / 2
  } else {
    divide = data.length / 2
  }

  for (let i = 0; i < data.length/2 ; i++) {
    rows1.push(createData(data[i].time.slice(11, 19), data[i].time.slice(0, 10), data[i].deviceId, data[i].type, data[i].value, data[i].value2))
  }

  for (let i = divide; i < data.length ; i++) {
    rows2.push(createData(data[i].time.slice(11, 19), data[i].time.slice(0, 10), data[i].deviceId, data[i].type, data[i].value, data[i].value2))
  }

  return (
    <Paper className={classes.root}>
      <Typography align="center" variant="h6">DHT11</Typography>
      <Typography align="center" variant="body1" gutterBottom>Device ID: {data[0].deviceId}</Typography>
      <Grid container spacing={3}>
        {/* <Grid item xs={false} sm={12} md={2}>
          <img className={classes.media} src={light} alt="light" />
        </Grid> */}
        <Grid item xs={12} sm={12} md={6}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Temperature</TableCell>
                <TableCell align="left">Humidity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows1.map((row1) => (
                <TableRow key={row1.time}>
                  <TableCell component="th" scope="row">{row1.date}</TableCell>
                  <TableCell align="center">{row1.time}</TableCell>
                  <TableCell align="left">{row1.type}</TableCell>
                  <TableCell align="left">{row1.temperature}</TableCell>
                  <TableCell align="left">{row1.humidity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Temperature</TableCell>
                <TableCell align="left">Humidity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows2.map((row2) => (
                <TableRow key={row2.time}>
                  <TableCell component="th" scope="row">{row2.date}</TableCell>
                  <TableCell align="left">{row2.time}</TableCell>
                  <TableCell align="left">{row2.type}</TableCell>
                  <TableCell align="left">{row2.temperature}</TableCell>
                  <TableCell align="left">{row2.humidity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default DHT11
