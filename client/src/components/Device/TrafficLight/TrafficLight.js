import React, { useEffect } from 'react'
import useStyles from "./styles"
import { Grid, Paper } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import tl from './tl.png'
import { useSelector } from 'react-redux';

function createData(time, deviceId, type, condition) {
  return { time, deviceId, type, condition };
}

// const rows = [
//   createData(159, 6.0, 24, 4.0),
//   createData(237, 9.0, 37, 4.3),
//   createData(262, 16.0, 24, 6.0),
//   createData(305, 3.7, 67, 4.3),
//   createData(356, 16.0, 49, 3.9),
// ];

function TrafficLight({ data }) {
  const classes = useStyles()

  // let rows = [
  //   createData(data[0].time, data[0].deviceId, data[0].type, data[0].value),
  //   createData(data[1].time, data[1].deviceId, data[1].type, data[1].value),
  //   createData(data[2].time, data[2].deviceId, data[2].type, data[2].value),
  //   createData(data[3].time, data[3].deviceId, data[3].type, data[3].value),
  //   createData(data[4].time, data[4].deviceId, data[4].type, data[4].value),
  // ];
  let rows = []

  for (let i = data.length; i >= 0; i--) {
    rows.push(createData(data[i].time, data[i].deviceId, data[i].type, data[i].value))
  }

  console.log(data.length)

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
            <Grid item xs={2} sm={2}>
              <img className={classes.media} src={tl} alt="tl" />
            </Grid>
            <Grid item xs={5} sm={5}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Time</TableCell>
                    <TableCell align="left">Device Id</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Condition</TableCell>
                    {/* <TableCell align="left">Condition</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">{row.time}</TableCell>
                      <TableCell align="left">{row.deviceId}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.condition}</TableCell>
                      {/* <TableCell align="left">{row.protein}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            {/* <Grid item xs={5} sm={5}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Time</TableCell>
                    <TableCell align="left">Device Id</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Condition</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows2.map((row2) => (
                    <TableRow>
                      <TableCell component="th" scope="row">{row2.time}</TableCell>
                      <TableCell align="left">{row2.deviceId}</TableCell>
                      <TableCell align="left">{row2.type}</TableCell>
                      <TableCell align="left">{row2.condition}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid> */}
          </Grid>
    </Paper>
  )
}

export default TrafficLight
