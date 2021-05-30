import React, { useState } from 'react'
import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import useStyles from "./styles"
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import DeviceHubIcon from '@material-ui/icons/DeviceHub'

import { deleteDeviceSet, getAdminDeviceSet } from '../../action/deviceset'

function createData(index, id, time, userId, trafficLightId, DHT11Id, lightId) {
    return { index, id, time, userId, trafficLightId, DHT11Id, lightId };
}
  
const initialState = {id: '', type: '', idServer: '', name: '', unit: '', topic: ''}

const AdminDeviceSet = ({limitPerPage}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const totalItems = useSelector((state) => state.countdeviceset)

    let deviceset = useSelector((state) => state.deviceset)

    const [updateIndex, setUpdateIndex] = useState(null)

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(initialState);
    const [isUpdate, setIsUpdate] = useState(true);

    const [page, setPage] = useState(1);
    const count = Math.ceil(totalItems/limitPerPage)

    const handleChangePage = (e, value) => {
        e.preventDefault()
        setPage(value)
        dispatch(getAdminDevice({page: value, limit: limitPerPage}))
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form!=initialState) {
            (isUpdate) ? dispatch(updateDevice(form)) : dispatch(addDevice(form));
        }
        setIsUpdate(true);
        setOpen(!open);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleToggle = (value) => {
      setUpdateIndex(value)
      setForm({ ...form, id: rows[value].id });
      setOpen(!open);
    };

    const handleNewDevice = () => {
        setIsUpdate(false)
        setOpen(!open)
    }

    const handleDelete = (value) => {
        console.log(rows[value].id);
        dispatch(deleteDeviceSet(rows[value].id))
        setUpdateIndex(null)
        if (rows.length == 1 &&  totalItems != 0) {
            dispatch(getAdminDeviceSet({page: page - 1, limit: limitPerPage}))
            setPage(page-1)
        }
    }

    let rows = [];
    if (!!deviceset) {
        for (let i = 0; i < deviceset.length; i++) {
            rows.push(createData(
                i+1, 
                deviceset[i]._id, 
                deviceset[i].time.slice(0, 10) + " " + deviceset[i].time.slice(11, 19), 
                deviceset[i].userID, 
                deviceset[i].trafficLightId, 
                deviceset[i].DHT11Id, 
                deviceset[i].lightId))
        }
    }

    return (rows.length == 0 && totalItems == 0) ? <CircularProgress /> : (
        <div>
             {(updateIndex == null && isUpdate == true) ? 
             <Backdrop className={classes.backdrop} open={open}> <CircularProgress /> </Backdrop> : 
             <Backdrop className={classes.backdrop} open={open}>
                {(isUpdate) ? 
                <Paper className={classes.paper}>
                    <Typography align="center" variant="h6" gutterBottom>Update Device</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography className={classes.title} align="right" variant="h6" gutterBottom>Type: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Name: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Id Server: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Unit: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Topic: </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="type" label={rows[updateIndex].type} onChange={handleChange}/>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="name" label={rows[updateIndex].name} onChange={handleChange}/>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="idServer" label={rows[updateIndex].idServer} onChange={handleChange}/>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="unit" label={rows[updateIndex].unit} onChange={handleChange}/>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="topic" label={rows[updateIndex].topic} onChange={handleChange}/>
                            </Grid>
                        </Grid>
                        <Button variant="outlined" color="primary" size="large" type="submit" fullWidth>Update</Button>
                    </form>
                    &nbsp;
                    <Button variant="outlined" color="secondary" size="large" onClick={handleClose} fullWidth>Close</Button>
                </Paper> :
                <Paper className={classes.paper}>
                <Typography align="center" variant="h6" gutterBottom>New Device</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Typography className={classes.title} align="right" variant="h6" gutterBottom>Type: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Name: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Id Server: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Unit: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Topic: </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="type" label="Type" onChange={handleChange}/>
                            <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="name" label="Name" onChange={handleChange}/>
                            <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="idServer" label="Id Server" onChange={handleChange}/>
                            <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="unit" label="Unit" onChange={handleChange}/>
                            <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="topic" label="Topic" onChange={handleChange}/>
                        </Grid>
                    </Grid>
                    <Button variant="outlined" color="primary" size="large" type="submit" fullWidth>New Device</Button>
                </form>
                &nbsp;
                <Button variant="outlined" color="secondary" size="large" onClick={handleClose} fullWidth>Close</Button>
            </Paper>
                }
             </Backdrop>}
            <TableContainer className={classes.table} component={Paper}>
            <Grid container>
                <Grid item xs={5}>
                    <Button style={{marginLeft: '20px'}} variant="outlined" startIcon={<DeviceHubIcon />} color="primary" size="large" onClick={handleNewDevice}>New Device Set</Button>
                </Grid>
                <Grid item xs={7}>
                    <Typography style={{color: "#20339c", fontWeight: '500', fontSize: '30px'}} align="left" gutterBottom>Device Set List</Typography>
                </Grid>
            </Grid>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Index</TableCell>
                        {/* <TableCell align="left">Device Id</TableCell> */}
                        {/* <TableCell align="left">Device Set Id</TableCell> */}
                        <TableCell align="left">Date Added</TableCell>
                        <TableCell align="left">User Id</TableCell>
                        <TableCell align="left">Traffic Light Id</TableCell>
                        <TableCell align="left">DHT11 Id</TableCell>
                        <TableCell align="left">Light Id</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.index}</TableCell>
                        {/* <TableCell align="left">{row.id}</TableCell> */}
                        {/* <TableCell align="left">{row.id}</TableCell> */}
                        <TableCell align="left">{row.time}</TableCell>
                        <TableCell align="left">{row.userId}</TableCell>
                        <TableCell align="left">{row.trafficLightId}</TableCell>
                        <TableCell align="left">{row.DHT11Id}</TableCell>
                        <TableCell align="left">{row.lightId}</TableCell>
                        <TableCell align="left">
                            <Button variant="outlined" color="primary" onClick={() => handleToggle(row.index - 1)}>Update</Button>
                            &nbsp;
                            <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.index - 1)}>Delete</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.pagination}>
                <Pagination count={count} page={page} size="large" color="primary" onChange={handleChangePage}/>
            </div>
        </div>
    )
}

export default AdminDeviceSet