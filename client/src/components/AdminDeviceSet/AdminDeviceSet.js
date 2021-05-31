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
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { deleteDeviceSet, getAdminDeviceSet, getCountDeviceSet } from '../../action/deviceset'

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

    useEffect(() => {
        dispatch(getAdminDeviceSet({page: 1, limit: limitPerPage}))
        dispatch(getCountDeviceSet());
    }, [])

    const handleChangePage = (e, value) => {
        e.preventDefault()
        setPage(value)
        dispatch(getAdminDeviceSet({page: value, limit: limitPerPage}))
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
                deviceset[i].userID, 
                deviceset[i].trafficLightId, 
                deviceset[i].DHT11Id, 
                deviceset[i].lightId))
        }
    }

    return (
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
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel id="type-update-label">{(updateIndex==null) ? "Type" : rows[updateIndex].type}</InputLabel>
                                    <Select
                                    labelId="type-update-label"
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                    >
                                        <MenuItem value="Traffic Light">Traffic Light</MenuItem>
                                        <MenuItem value="DHT11">DHT11</MenuItem>
                                        <MenuItem value="Light">Light</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="name" value={form.name} label={rows[updateIndex].name} onChange={handleChange}/>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="idServer" value={form.idServer} label={rows[updateIndex].idServer} onChange={handleChange}/>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <Select
                                    labelId="unit-label"
                                    name="unit"
                                    value={form.unit}
                                    onChange={handleChange}
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="C-%">C-%</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="topic" value={form.topic} label={rows[updateIndex].topic} onChange={handleChange}/>
                            </Grid>
                        </Grid>
                        <Button variant="outlined" color="primary" size="large" type="submit" fullWidth>Update</Button>
                    </form>
                    &nbsp;
                    <Button variant="outlined" color="secondary" size="large" onClick={handleClose} fullWidth>Close</Button>
                </Paper> 
                :
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
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="type-new-label">Type</InputLabel>
                                <Select
                                labelId="type-new-label"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                >
                                    <MenuItem value="Traffic Light">Traffic Light</MenuItem>
                                    <MenuItem value="DHT11">DHT11</MenuItem>
                                    <MenuItem value="Light">Light</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="name" label="Name" value={form.name} onChange={handleChange}/>
                            <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="idServer" label="Id Server" value={form.idServer} onChange={handleChange}/>
                            <FormControl fullWidth label="Unit" variant="outlined" className={classes.formControl}>
                                <InputLabel id="unit-new-label">Unit</InputLabel>
                                <Select
                                labelId="unit-new-label"
                                name="unit"
                                value={form.unit}
                                onChange={handleChange}>
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="C-%">C-%</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="topic" label="Topic" value={form.topic} onChange={handleChange}/>
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
                <Grid item xs={2}>
                    <Button variant="outlined" fullWidth startIcon={<DevicesOtherIcon />} color="primary" size="large" onClick={handleNewDevice}>New Device</Button>
                </Grid>
                <Grid item xs={8}>
                    <Typography style={{color: "#20339c", fontWeight: '500', fontSize: '30px'}} align="center" gutterBottom>Device List</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button  variant="outlined" fullWidth startIcon={<RefreshIcon />} color="primary" size="large" onClick={handleRefresh}>Refresh</Button>
                </Grid>
            </Grid>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Index</TableCell>
                        <TableCell align="left">Type</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Date Added</TableCell>
                        <TableCell align="left">Id Server</TableCell>
                        <TableCell align="left">Unit</TableCell>
                        <TableCell align="left">Topic</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.index}</TableCell>
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
                <Typography style={{marginTop: '10px'}} variant="body1" align="center">Showing {rows.length} out of {totalItems} devices</Typography>
            </TableContainer>
            <div className={classes.pagination}>
                <Pagination count={count} page={page} size="large" color="primary" onChange={handleChangePage}/>
            </div>
        </div>
    )
}

export default AdminDeviceSet