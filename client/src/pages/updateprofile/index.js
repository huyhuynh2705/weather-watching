import React, { useState, useEffect } from 'react';
import AppBar from '../../components/AppBar/AppBar'
import { useDispatch } from 'react-redux';
import { getData } from '../../action/data'
import { TOKEN_NAME } from '@environments';
import { Button, Container, Grid, Input, Paper, TextField, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from './styles'

const initialState = { username: '', password: '', name: '', email: '', phoneNum: '', deviceSetId: '' };

const UpdateProfile = () => {
    const classes = useStyles()
    const [form, setForm] = useState(initialState);
  // const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(TOKEN_NAME));

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
      };

    return (
        <div>
            <AppBar />
            <Paper className={classes.root}>
                {/* <Typography variant="h6" gutterBottom>User Name: </Typography>
                <Typography variant="h6" gutterBottom>{user.result.name}</Typography> */}
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={false} sm={1} />
                    <Grid item xs={6} sm={5}>
                        <Typography className={classes.title} align="right" variant="h6"  gutterBottom>Name: </Typography>
                        <Typography className={classes.title2} align="right" variant="h6" gutterBottom>Email: </Typography>
                        <Typography className={classes.title2} align="right" variant="h6" gutterBottom>Phone Number: </Typography>
                        <Typography className={classes.title2} align="right" variant="h6" gutterBottom>Device Set ID: </Typography>
                        <Typography className={classes.title2} align="right" variant="h6" gutterBottom>Username: </Typography>
                        <Typography className={classes.title2} align="right" variant="h6" gutterBottom>Password: </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField className={classes.text} autoComplete="false" variant="outlined" name="name" defaultValue={user.result.name} onChange={handleChange} fullWidth/>
                            <TextField className={classes.text} autoComplete="false" variant="outlined" name="email" defaultValue={user.result.email} onChange={handleChange} fullWidth/>
                            <TextField className={classes.text} autoComplete="false" variant="outlined" name="phoneNum" defaultValue={user.result.phoneNum} onChange={handleChange} fullWidth/>
                            <TextField className={classes.text} autoComplete="false" variant="outlined" name="deviceSetId" defaultValue={user.result.deviceSetId} InputProps={{readOnly: true,}} fullWidth/>
                            <TextField className={classes.text} autoComplete="false" variant="outlined" name="username" defaultValue={user.result.username} InputProps={{readOnly: true,}} fullWidth/>
                            <TextField className={classes.text} autoComplete="false" variant="outlined" name="password" defaultValue="********" onChange={handleChange} fullWidth/>
                            {/* <Input name="email" label="Email" placeholder={user.result.email} onChange={handleChange} fullWidth/>
                            <Input name="phoneNum" label="Phone Number" placeholder={user.result.phoneNum} onChange={handleChange} fullWidth/>
                            <Input name="name" label="Name" placeholder={user.result.name} onChange={handleChange} fullWidth/>
                            <Input name="username" label="Username" placeholder={user.result.name} disabled fullWidth/> */}
                        </form>
                    </Grid>
                    <Grid item xs={false} sm={2} />
                </Grid>
                <Button className={classes.button} variant="contained" size="large" component={Link} to="/">Back</Button>
                <Button className={classes.button} variant="contained" color="primary" size="large">Done</Button>
            </Paper>
        </div>
    )
}

export default UpdateProfile