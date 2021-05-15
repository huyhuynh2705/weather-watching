import React, { useState, useEffect } from 'react';
import AppBar from '../../components/AppBar/AppBar'
import DataBar from '../../components/DataBar/DataBar'
import Chart from '../../components/Chart/Chart'
import { useDispatch } from 'react-redux';
import { getData } from '../../action/data'
import { TOKEN_NAME } from '@environments';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from './styles'

const User = () => {
    const classes = useStyles()
  // const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(TOKEN_NAME));

    // useEffect(() => {
    //   dispatch(getData(user.result._id));
    // }, []);

    return (
        <div>
            <AppBar />
            <Paper className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={4} sm={6}>
                        <Typography align="right" gutterBottom>Name: </Typography>
                    </Grid>
                    <Grid item xs={8} sm={6}>
                        <Typography gutterBottom>{user.result.name}</Typography>
                    </Grid>
                    <Grid item xs={4} sm={6}>
                        <Typography align="right" gutterBottom>Email: </Typography>
                    </Grid>
                    <Grid item xs={8} sm={6}>
                        <Typography gutterBottom>{user.result.email}</Typography>
                    </Grid>
                    <Grid item xs={4} sm={6}>
                        <Typography align="right" gutterBottom>Phone Number: </Typography>
                    </Grid>
                    <Grid item xs={8} sm={6}>
                        <Typography gutterBottom>{user.result.phoneNum}</Typography>
                    </Grid>
                    <Grid item xs={4} sm={6}>
                        <Typography align="right" gutterBottom>Device Set ID: </Typography>
                    </Grid>
                    <Grid item xs={8} sm={6}>
                    <Typography gutterBottom>{user.result.deviceSetId}</Typography>
                    </Grid>
                    <Grid item xs={4} sm={6}>
                        <Typography align="right" gutterBottom>Username: </Typography>
                    </Grid>
                    <Grid item xs={8} sm={6}>
                        <Typography gutterBottom>{user.result.username}</Typography>
                    </Grid>
                    <Grid item xs={4} sm={6}>
                        <Typography align="right" gutterBottom>Password: </Typography>
                    </Grid>
                    <Grid item xs={8} sm={6}>
                        <Typography gutterBottom>********</Typography>
                    </Grid>
                </Grid>
                <Button className={classes.button} variant="contained" size="large" component={Link} to="/">Back</Button>
                <Button className={classes.button} variant="contained" color="primary" size="large" component={Link} to="/updateprofile">Update</Button>
            </Paper>
        </div>
    )
}

export default User