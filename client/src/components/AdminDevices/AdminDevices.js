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
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

import { updateDevice, deleteDevice, getAdminDevice, addDevice } from '../../action/device'

function createData(index, id, type, name, time, idServer, unit, topic) {
    return { index, id, type, name, time, idServer, unit, topic };
}
  
const initialState = {id: '', type: '', idServer: '', name: '', unit: '', topic: ''}

const AdminDevices = ({limitPerPage}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const totalItems = useSelector((state) => state.countdevice)

    let devices = useSelector((state) => state.devices)
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
        dispatch(deleteDevice(rows[value].id))
        setUpdateIndex(null)
        if (rows.length == 1 &&  totalItems != 0) {
            dispatch(getAdminDevice({page: page - 1, limit: limitPerPage}))
            setPage(page-1)
        }
    }

    let rows = [];
    if (!!devices) {
        for (let i = 0; i < devices.length; i++) {
            rows.push(createData(i+1, devices[i]._id, devices[i].type, devices[i].name, devices[i].time.slice(0, 10) + " " + devices[i].time.slice(11, 19), devices[i].idServer, devices[i].unit, devices[i].topic))
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
                    <Button style={{marginLeft: '20px'}} variant="outlined" startIcon={<DevicesOtherIcon />} color="primary" size="large" onClick={handleNewDevice}>New Device</Button>
                </Grid>
                <Grid item xs={7}>
                    <Typography style={{color: "#20339c", fontWeight: '500', fontSize: '30px'}} align="left" gutterBottom>Device List</Typography>
                </Grid>
            </Grid>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Index</TableCell>
                        {/* <TableCell align="left">Device Id</TableCell> */}
                        <TableCell align="left">Type</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Date Added</TableCell>
                        <TableCell align="left">Id Server</TableCell>
                        <TableCell align="left">Unit</TableCell>
                        <TableCell align="left">Topic</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.index}</TableCell>
                        {/* <TableCell align="left">{row.id}</TableCell> */}
                        <TableCell align="left">{row.type}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.time}</TableCell>
                        <TableCell align="left">{row.idServer}</TableCell>
                        <TableCell align="left">{row.unit}</TableCell>
                        <TableCell align="left">{row.topic}</TableCell>
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

export default AdminDevices