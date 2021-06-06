import React, { useEffect } from 'react'
import { Container, Grid, CircularProgress } from '@material-ui/core'
import useStyles from "./styles"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useSelector, useDispatch } from 'react-redux'
import { getCountAllUser, countSubscriber } from '../../action/user'
import { getCountDevice } from '../../action/device'
import { getCountDeviceSet, getCountUnusedSet } from '../../action/deviceset'


function AdminDataBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const allDevices = useSelector((state) => state.count.devices)
  const allDeviceSets = useSelector((state) => state.count.devicesets)
  const allUsers = useSelector((state) => state.count.users)
  const unUsedSet = useSelector((state) => state.count.unusedsets)
  const subscriber = useSelector((state) => state.count.subscribers)

  useEffect(() => {
    dispatch(getCountAllUser())
    dispatch(countSubscriber())
    dispatch(getCountDevice())
    dispatch(getCountDeviceSet())
    dispatch(getCountUnusedSet())
  }, [dispatch])

  return (
    <Container >
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">All Devices</TableCell>
              <TableCell align="center">All Device Sets</TableCell>
              <TableCell align="center">Unused Device Set</TableCell>
              <TableCell align="center">All Users</TableCell>
              <TableCell align="center">User Has Device Set</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                <TableCell align="center">{allDevices}</TableCell>
                <TableCell align="center">{allDeviceSets}</TableCell>
                <TableCell align="center">{unUsedSet}</TableCell>
                <TableCell align="center">{allUsers}</TableCell>
                <TableCell align="center">{subscriber}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default AdminDataBar
