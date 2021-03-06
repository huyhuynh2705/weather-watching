import React, { useState, useEffect} from 'react'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
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
import RefreshIcon from '@material-ui/icons/Refresh';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { deleteDeviceSet, getAdminDeviceSet, getCountDeviceSet, addDeviceSet, updateDeviceSet, getCountUnusedSet } from '../../action/deviceset'
import { getTrafficlightName, getDHT11Name, getLightName } from '../../action/device'
import { getUserName, countSubscriber } from '../../action/user';
function createData(index, id, time, setName, userID, trafficLightId, DHT11Id, lightId) {
    return { index, id, time, setName, userID, trafficLightId, DHT11Id, lightId };
}
  
const initialState = {id: '', setName: '', username: '', trafficLightName: '', DHT11Name: '', lightName: ''}

const AdminDeviceSet = ({limitPerPage}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const totalItems = useSelector((state) => state.count.devicesets)

    let deviceset = useSelector((state) => state.deviceset)

    let trafficlightname = useSelector((state) => state.names.tlnames)
    let dht11name = useSelector((state) => state.names.dhtnames)
    let lightname = useSelector((state) => state.names.lnames)
    let username = useSelector((state) => state.names.usernames)

    const [updateIndex, setUpdateIndex] = useState(null)

    const [open, setOpen] = useState(false);
    const [addUser, setAddUser] = useState(false)
    const [form, setForm] = useState(initialState);
    const [isUpdate, setIsUpdate] = useState(true);

    const [page, setPage] = useState(1);
    const count = Math.ceil(totalItems/limitPerPage)

    useEffect(() => {
        dispatch(getAdminDeviceSet({page: 1, limit: limitPerPage}))
        dispatch(getCountDeviceSet());
    }, [])

    useEffect(() => {
        dispatch(getTrafficlightName());
        dispatch(getDHT11Name());
        dispatch(getLightName());
        dispatch(getUserName());
    }, [open])

    useEffect(() => {
        dispatch(getUserName());
    },[addUser])

    const handleChangePage = (e, value) => {
        e.preventDefault()
        setPage(value)
        dispatch(getAdminDeviceSet({page: value, limit: limitPerPage}))
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form!=initialState) {
            if (isUpdate) {
                dispatch(updateDeviceSet(form)).then(()=>{                 
                    dispatch(getCountDeviceSet())
                    dispatch(getCountUnusedSet())
                    dispatch(countSubscriber())
                })
            } else {
                dispatch(addDeviceSet(form))
            }
        }
        // dispatch(getAdminDeviceSet({page: page, limit: limitPerPage})) 
        setForm(initialState);
        setIsUpdate(true);
        setUpdateIndex(null)
        setOpen(false);
        setAddUser(false)
    };

    const handleClose = () => {
        setOpen(false);
        setForm(initialState);
        setIsUpdate(true);
        setAddUser(false)
    };

    const handleToggle = (value) => {
      setUpdateIndex(value)
      setForm({ ...form, id: rows[value].id });
      setOpen(!open);
    };

    const handleAddUser = (value) => {
        setForm({ ...form, id: rows[value].id });
        setAddUser(true)
    }

    const handleNewDevice = () => {
        setIsUpdate(false)
        setOpen(!open)
    }

    const handleDelete = (value) => {
        dispatch(deleteDeviceSet(rows[value].id))
        setUpdateIndex(null)
        if (rows.length == 1 &&  totalItems != 0) {
            dispatch(getAdminDeviceSet({page: page - 1, limit: limitPerPage}))
            setPage(page-1)
        }
    }
    
    const handleRefresh = () => {
        dispatch(getAdminDeviceSet({page: page, limit: limitPerPage}))
    }

    let rows = [];
    if (!!deviceset) {
        for (let i = 0; i < deviceset.length; i++) {
            rows.push(createData(
                i+1, 
                deviceset[i]._id, 
                deviceset[i].time.slice(0, 10) + " " + deviceset[i].time.slice(11, 19), 
                deviceset[i].setName, 
                deviceset[i].userID, 
                deviceset[i].trafficLightId, 
                deviceset[i].DHT11Id, 
                deviceset[i].lightId))
        }
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={addUser}> 
                <Paper className={classes.paperAddUser}>
                    <Typography align="center" variant="h6" gutterBottom>Add User</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography className={classes.title} align="right" variant="h6" gutterBottom>User: </Typography>
                            </Grid>
                                <Grid item xs={9}>
                                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                        <InputLabel id="username-new-label">Username</InputLabel>
                                        <Select
                                        labelId="username-new-label"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        >
                                        <MenuItem key="None" value="None">None</MenuItem>
                                        {username?.map((name) => (
                                            <MenuItem key={name} value={name}>
                                            {name}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button variant="outlined" color="secondary" size="large" onClick={handleClose} fullWidth>Close</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="outlined" color="primary" size="large" type="submit" fullWidth>Update</Button>
                                    </Grid>
                                </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Backdrop>
             {(updateIndex == null && isUpdate == true) ? 
             <Backdrop className={classes.backdrop} open={open}> <CircularProgress /> </Backdrop> : 
             <Backdrop className={classes.backdrop} open={open}>
                {(isUpdate) ? 
                <Paper className={classes.paper}>
                    <Typography align="center" variant="h6" gutterBottom>Update Device Set</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography className={classes.title} align="right" variant="h6" gutterBottom>Set Name: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>User: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Traffic Light: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>DHT11: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Light: </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="setName" label="Set Name" value={form.setName} onChange={handleChange}/>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel id="username-new-label">Username</InputLabel>
                                    <Select
                                    labelId="username-new-label"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    >
                                    <MenuItem key="None" value="None">None</MenuItem>
                                    {username?.map((name) => (
                                        <MenuItem key={name} value={name}>
                                        {name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel id="trafficLightName-new-label">Traffic Light</InputLabel>
                                    <Select
                                    labelId="trafficLightName-new-label"
                                    name="trafficLightName"
                                    value={form.trafficLightName}
                                    onChange={handleChange}
                                    >
                                    <MenuItem key="None" value="None">None</MenuItem>
                                    {trafficlightname?.map((trafficlight) => (
                                        <MenuItem key={trafficlight} value={trafficlight}>
                                        {trafficlight}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel id="DHT11Name-new-label">DHT11</InputLabel>
                                    <Select
                                    labelId="DHT11Name-new-label"
                                    name="DHT11Name"
                                    value={form.DHT11Name}
                                    onChange={handleChange}
                                    >
                                    <MenuItem key="None" value="None">None</MenuItem>
                                    {dht11name?.map((dht11) => (
                                        <MenuItem key={dht11} value={dht11}>
                                        {dht11}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel id="lightName-new-label">Light</InputLabel>
                                    <Select
                                    labelId="lightName-new-label"
                                    name="lightName"
                                    value={form.lightName}
                                    onChange={handleChange}
                                    >
                                    <MenuItem key="None" value="None">None</MenuItem>
                                    {lightname?.map((light) => (
                                        <MenuItem key={light} value={light}>
                                        {light}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button variant="outlined" color="secondary" size="large" onClick={handleClose} fullWidth>Close</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="outlined" color="primary" size="large" type="submit" fullWidth>Update</Button>
                            </Grid>
                        </Grid>
                    </form>
                    &nbsp;
                </Paper> 
                :
                <Paper className={classes.paper}>
                <Typography align="center" variant="h6" gutterBottom>New Device Set</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Typography className={classes.title} align="right" variant="h6" gutterBottom>Traffic Light: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>DHT11: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Light: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>User: </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl fullWidth variant="outlined" required className={classes.formControl}>
                                <InputLabel id="trafficLightName-new-label">Traffic Light</InputLabel>
                                <Select
                                labelId="trafficLightName-new-label"
                                name="trafficLightName"
                                value={form.trafficLightName}
                                onChange={handleChange}
                                >
                                <MenuItem key="None" value="None">None</MenuItem>
                                {trafficlightname?.map((trafficlight) => (
                                    <MenuItem key={trafficlight} value={trafficlight}>
                                    {trafficlight}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth required variant="outlined" className={classes.formControl}>
                                <InputLabel id="DHT11Name-new-label">DHT11</InputLabel>
                                <Select
                                labelId="DHT11Name-new-label"
                                name="DHT11Name"
                                value={form.DHT11Name}
                                onChange={handleChange}
                                >
                                <MenuItem key="None" value="None">None</MenuItem>
                                {dht11name?.map((dht11) => (
                                    <MenuItem key={dht11} value={dht11}>
                                    {dht11}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth required variant="outlined" className={classes.formControl}>
                                <InputLabel id="lightName-new-label">Light</InputLabel>
                                <Select
                                labelId="lightName-new-label"
                                name="lightName"
                                value={form.lightName}
                                onChange={handleChange}
                                >
                                <MenuItem key="None" value="None">None</MenuItem>
                                {lightname?.map((light) => (
                                    <MenuItem key={light} value={light}>
                                    {light}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="username-new-label">Username</InputLabel>
                                <Select
                                labelId="username-new-label"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                >
                                <MenuItem key="None" value="None">None</MenuItem>
                                {username?.map((name) => (
                                    <MenuItem key={name} value={name}>
                                    {name}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="secondary" size="large" onClick={handleClose} fullWidth>Close</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="primary" size="large" type="submit" fullWidth>New Device Set</Button>
                        </Grid>
                    </Grid>
                </form>
                &nbsp;
            </Paper>
                }
             </Backdrop>}
            <TableContainer className={classes.table} component={Paper}>
            <Grid container>
                <Grid item xs={2}>
                    <Button variant="outlined" fullWidth startIcon={<DeviceHubIcon />} color="primary" size="large" onClick={handleNewDevice}>New Device Set</Button>
                </Grid>
                <Grid item xs={8}>
                    <Typography style={{color: "#20339c", fontWeight: '500', fontSize: '30px'}} align="center" gutterBottom>Device Set List</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button  variant="outlined" fullWidth startIcon={<RefreshIcon />} color="primary" size="large" onClick={handleRefresh}>Refresh</Button>
                </Grid>
            </Grid>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Index</TableCell>
                        <TableCell align="left">Date Added</TableCell>
                        <TableCell align="left">Set Name</TableCell>
                        <TableCell align="left">User</TableCell>
                        <TableCell align="left">Traffic Light</TableCell>
                        <TableCell align="left">DHT11</TableCell>
                        <TableCell align="left">Light</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.index}</TableCell>
                        <TableCell align="left">{row.time}</TableCell>
                        <TableCell align="left">{row.setName}</TableCell>
                        <TableCell align="left">
                            {row.userID ? row.userID:<Button variant="outlined" fullWidth color="primary" onClick={() => handleAddUser(row.index - 1)}>Add User</Button>}
                        </TableCell>
                        <TableCell align="left">{row.trafficLightId}</TableCell>
                        <TableCell align="left">{row.DHT11Id}</TableCell>
                        <TableCell align="left">{row.lightId}</TableCell>
                        <TableCell align="left">
                            <Grid container spacing={1}>
                                <Grid item md={false} lg={6}>
                                    <Button variant="outlined" fullWidth color="primary" onClick={() => handleToggle(row.index - 1)}>Update</Button>
                                </Grid>
                                <Grid item md={false} lg={6}>
                                    <Button variant="outlined" fullWidth color="secondary" onClick={() => handleDelete(row.index - 1)}>Delete</Button>
                                </Grid>
                            </Grid>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <Typography style={{marginTop: '10px'}} variant="body1" align="center">Showing {rows.length} out of {totalItems} devices</Typography>
            </TableContainer>
            <div className={classes.pagination}>
                <Pagination count={count} page={page} size="large" color="primary" onChange={handleChangePage}/>
            </div>
        </div>
    )
}

export default AdminDeviceSet