import React, { useState, useEffect } from 'react'
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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RefreshIcon from '@material-ui/icons/Refresh';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { addUser, updateUser, deleteUser, getAdminUser, getCountAllUser } from '../../action/user'
import { getNameSet } from '../../action/deviceset'

function createData(index, id, username, name, email, phoneNum, deviceSetName, role) {
    return { index, id, username, name, email, phoneNum, deviceSetName, role };
}
  
const initialState = {id: '', username: '', password: '', name: '', email:'', phoneNum: '', deviceSetName: '', role: '', confirmPassword: ''};

const AdminUsers = ({limitPerPage}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const totalItems = useSelector((state) => state.count.users)
    let users = useSelector((state) => state.users)
    let devicesetname = useSelector((state) => state.names.setnames)

    const [updateIndex, setUpdateIndex] = useState(null)

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(initialState);
    const [isUpdate, setIsUpdate] = useState(true);

    const [page, setPage] = useState(1);
    const count = Math.ceil(totalItems/limitPerPage)

    useEffect(() => {
        dispatch(getCountAllUser());
        dispatch(getAdminUser({page: 1, limit: limitPerPage}))
    }, [])

    useEffect(() => {
        dispatch(getNameSet());
    }, [open])

    const handleChangePage = (e, value) => {
        e.preventDefault()
        setPage(value)
        dispatch(getAdminUser({page: value, limit: limitPerPage}))
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((form.password !== form.confirmPassword) ) {
          alert("Password and confirm password must match")
          return
        }
        if (form!=initialState ) {
         if (isUpdate) { 
             dispatch(updateUser(form))
        } 
        else {
            dispatch(addUser(form))
            dispatch(getAdminUser({page: page, limit: limitPerPage})) 
            };
        }
        setForm(initialState);
        setIsUpdate(true);
        setUpdateIndex(null)
        setOpen(false);
    };

    const handleClose = () => {
        setForm(initialState);
        setOpen(false);
        setIsUpdate(true);
    };

    const handleToggle = (value) => {
      setUpdateIndex(value)
      setForm({ ...form, id: rows[value].id });
      setOpen(!open);
    };

    const handleNewUser = () => {
        setIsUpdate(false)
        setOpen(!open)
    }

    const handleDelete = (value) => {
        dispatch(deleteUser(rows[value].id))
        setUpdateIndex(null)
        if (rows.length == 1 &&  totalItems != 0) {
            if (page > 1) {
                dispatch(getAdminUser({page: page - 1, limit: limitPerPage}));
                setPage(page-1)
            }
        }
    }

    const handleRefresh = () => {
        dispatch(getAdminUser({page: page, limit: limitPerPage}))
    }

    let rows = [];
    if (!!users) {
        for (let i = 0; i < users.length; i++) {
            rows.push(createData(
                i+1, 
                users[i]._id, 
                users[i].username, 
                users[i].name, 
                users[i].email, 
                users[i].phoneNum, 
                users[i].deviceSetName, 
                users[i].role))
        }
    }

    return (
        <div>
             {(updateIndex == null && isUpdate == true) ? 
             <Backdrop className={classes.backdrop} open={open}> <CircularProgress /> </Backdrop> : 
             <Backdrop className={classes.backdrop} open={open}>
                {(isUpdate) ? 
                    <Paper className={classes.paper}>
                    <Typography align="center" variant="h6" gutterBottom>Update User</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography className={classes.title} align="right" variant="h6" gutterBottom>Username: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Name: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Email: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Phone Number: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Device Set Id: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Role: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Password: </Typography>
                                <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Confirm Password: </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="username" label={rows[updateIndex].username} onChange={handleChange}/>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="name" label={rows[updateIndex].name} onChange={handleChange}/>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="email" label={rows[updateIndex].email} onChange={handleChange} type="email" />
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="phoneNum" label={rows[updateIndex].phoneNum} onChange={handleChange} type="number"/>
                                {/* <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="deviceSetName" label={rows[updateIndex].deviceSetName} onChange={handleChange}/> */}
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel id="deviceSetName-new-label">{(updateIndex==null) ? "Device Set Name" : rows[updateIndex].deviceSetName}</InputLabel>
                                    <Select
                                    labelId="deviceSetName-new-label"
                                    name="deviceSetName"
                                    value={form.deviceSetName}
                                    onChange={handleChange}
                                    >
                                    <MenuItem key="None" value="None">None</MenuItem>
                                    {devicesetname.map((set) => (
                                        <MenuItem key={set} value={set}>
                                        {set}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                {/* <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="role" label={rows[updateIndex].role} onChange={handleChange}/> */}
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel id="role-new-label">Role</InputLabel>
                                    <Select
                                    labelId="role-new-label"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    >
                                        <MenuItem value="User">User</MenuItem>
                                        <MenuItem value="Admin">Admin</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="password" label={rows[updateIndex].password} onChange={handleChange}/>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="confirmPassword" label={rows[updateIndex].confirmPassword} onChange={handleChange}/>
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
                </Paper> :
                <Paper className={classes.paper}>
                <Typography align="center" variant="h6" gutterBottom>New User</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Typography className={classes.title} align="right" variant="h6" gutterBottom>Username: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Name: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Email: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Phone Number: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Device Set Name: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Role: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Password: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Confirm Password: </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="username" label="Username" onChange={handleChange}/>
                            <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="name" label="Full Name" onChange={handleChange}/>
                            <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="email" label="Email" onChange={handleChange} type="email" />
                            <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="phoneNum" label="Phone Number" onChange={handleChange} type="number" />
                            {/* <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="deviceSetName" label="Device Set Id" onChange={handleChange}/> */}
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="deviceSetName-new-label">Device Set Name</InputLabel>
                                <Select
                                labelId="deviceSetName-new-label"
                                name="deviceSetName"
                                value={form.deviceSetName}
                                onChange={handleChange}
                                >
                                <MenuItem key="None" value="None">None</MenuItem>
                                {devicesetname.map((set) => (
                                    <MenuItem key={set} value={set}>
                                    {set}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            {/* <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="role" label="Rol" onChange={handleChange}/> */}
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="role-new-label">Role</InputLabel>
                                <Select
                                labelId="role-new-label"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                >
                                    <MenuItem value="User">User</MenuItem>
                                    <MenuItem value="Admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="password" label="Password" onChange={handleChange}/>
                            <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="confirmPassword" label="Confirm Password" onChange={handleChange}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button variant="outlined" color="secondary" size="large" onClick={handleClose} fullWidth>Close</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="outlined" color="primary" size="large" type="submit" fullWidth>Add User</Button>
                            </Grid>
                        </Grid>
                </form>
                </Paper>
                }
            </Backdrop>}
            <TableContainer className={classes.table} component={Paper}>
                <Grid container>
                    <Grid item xs={2}>
                        <Button variant="outlined" fullWidth startIcon={<PersonAddIcon />} color="primary" size="large" onClick={handleNewUser}>New User</Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography style={{color: "#20339c", fontWeight: '500', fontSize: '30px'}} align="center" gutterBottom>Users List</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button  variant="outlined" fullWidth startIcon={<RefreshIcon />} color="primary" size="large" onClick={handleRefresh}>Refresh</Button>
                    </Grid>
                </Grid>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Index</TableCell>
                        <TableCell align="left">Username</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Phone Number</TableCell>
                        <TableCell align="left">Device Set Name</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.index}</TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.phoneNum}</TableCell>
                        <TableCell align="left">{row.deviceSetName}</TableCell>
                        <TableCell align="left">{row.role}</TableCell>
                        <TableCell align="left">
                            <Button variant="outlined" color="primary" onClick={() => handleToggle(row.index - 1)}>Update</Button>
                            &nbsp;
                            <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.index - 1)}>Delete</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <Typography style={{marginTop: '10px'}} variant="body1" align="center">Showing {rows.length} out of {totalItems} users</Typography>
            </TableContainer>
            <div className={classes.pagination}>
                <Pagination count={count} page={page} size="large" color="primary" onChange={handleChangePage}/>
            </div>
        </div>
    )
}

export default AdminUsers