import React, { useState } from 'react'
import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import useStyles from "./styles"
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator' 
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

import { addUser, updateUser, deleteUser, getAdminUser } from '../../action/user'

function createData(index, id, username, name, email, phoneNum, deviceSetId, role) {
    return { index, id, username, name, email, phoneNum, deviceSetId, role };
}
  
const initialState = {id: '', username: '', password: '', name: '', email:'', phoneNum: '', deviceSetId: '', role: '', confirmPassword: ''};

const AdminUsers = ({limitPerPage}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const totalItems = useSelector((state) => state.countuser)

    let users = useSelector((state) => state.users)
    const [updateIndex, setUpdateIndex] = useState(null)

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(initialState);
    const [isUpdate, setIsUpdate] = useState(true);

    const [page, setPage] = useState(1);
    const count = Math.ceil(totalItems/limitPerPage)

    const handleChangePage = (e, value) => {
        e.preventDefault()
        setPage(value)
        dispatch(getAdminUser({page: value, limit: limitPerPage}))
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        console.log(validator.isMobilePhone(form.phoneNum));
        if ((form.password !== form.confirmPassword) ) {
          alert("Password and confirm password must match")
          return
        }
        if (form!=initialState ) {
         if (isUpdate) { 
            dispatch(updateProfile(form))
        } 
        else {
            dispatch(addUser(form))
            dispatch(getAdminUser({page: page, limit: limitPerPage})) 
            };
        }
        setIsUpdate(true);
        setOpen(!open);
    };

    const handleClose = () => {
      setIsUpdate(true);
      setOpen(false);
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
            dispatch(getAdminUser({page: page - 1, limit: limitPerPage}))
            setPage(page-1)
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
                users[i].deviceSetId, 
                users[i].role))
        }
    }

    return (rows.length == 0 && totalItems == 0) ? <CircularProgress /> : (
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
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="deviceSetId" label={rows[updateIndex].deviceSetId} onChange={handleChange}/>
                                <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="role" label={rows[updateIndex].role} onChange={handleChange}/>
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
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Device Set Id: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Role: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Password: </Typography>
                            <Typography className={classes.title1} align="right" variant="h6" gutterBottom>Confirm Password: </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="username" label="Username" onChange={handleChange}/>
                            <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="name" label="Full Name" onChange={handleChange}/>
                            <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="email" label="Email" onChange={handleChange} type="email" />
                            <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="phoneNum" label="Phone Number" onChange={handleChange} type="number" />
                            <TextField className={classes.text} autoComplete="false" fullWidth variant="outlined" name="deviceSetId" label="Device Set Id" onChange={handleChange}/>
                            <TextField required className={classes.text} autoComplete="false" fullWidth variant="outlined" name="role" label="Rolw" onChange={handleChange}/>
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
                        {/* <TableCell align="left">Device Id</TableCell> */}
                        <TableCell align="left">Username</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Phone Number</TableCell>
                        <TableCell align="left">Device Set Id</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.index}</TableCell>
                        {/* <TableCell align="left">{row.id}</TableCell> */}
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.phoneNum}</TableCell>
                        <TableCell align="left">{row.deviceSetId}</TableCell>
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
            </TableContainer>
            <div className={classes.pagination}>
                <Pagination count={count} page={page} size="large" color="primary" onChange={handleChangePage}/>
            </div>
        </div>
    )
}

export default AdminUsers