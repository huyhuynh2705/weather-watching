import React, { useEffect } from 'react'
import useStyles from "./styles"
import { Grid, Paper, Typography } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import light from './light.png'

function createData(time, deviceId, type, light) {
  return { time, deviceId, type, light };
}

function Light({ data }) {
  const classes = useStyles()

  if (data.length == 0) {
    return (
      <Paper>
        <Typography align="center">Light data is empty</Typography>
      </Paper>
    )
  }

  let rows1 = []
  let rows2 = []
  let divide 

  if (data.length % 2 != 0) {
    divide = (data.length +1) / 2
  }

  for (let i = 0; i < data.length/2 ; i++) {
    rows1.push(createData(data[i].time.slice(11, 19) + " " + data[i].time.slice(0, 10), data[i].deviceId, data[i].type, data[i].value))
  }

  for (let i = divide; i < data.length ; i++) {
    rows2.push(createData(data[i].time.slice(11, 19) + " " + data[i].time.slice(0, 10), data[i].deviceId, data[i].type, data[i].value))
  }

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
            <Grid item xs={2} sm={2}>
              <img className={classes.media} src={light} alt="light" />
            </Grid>
            <Grid item xs={5} sm={5}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Time</TableCell>
                    <TableCell align="left">Device Id</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Light</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows1.map((row1) => (
                    <TableRow key={row1.name}>
                      <TableCell component="th" scope="row">{row1.time}</TableCell>
                      <TableCell align="left">{row1.deviceId}</TableCell>
                      <TableCell align="left">{row1.type}</TableCell>
                      <TableCell align="left">{row1.light}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={5} sm={5}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Time</TableCell>
                    <TableCell align="left">Device Id</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Light</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows2.map((row2) => (
                    <TableRow key={row2.name}>
                      <TableCell component="th" scope="row">{row2.time}</TableCell>
                      <TableCell align="left">{row2.deviceId}</TableCell>
                      <TableCell align="left">{row2.type}</TableCell>
                      <TableCell align="left">{row2.light}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
    </Paper>
  )
}

export default Light
