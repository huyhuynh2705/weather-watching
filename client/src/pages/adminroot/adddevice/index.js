import React, { useState } from 'react';
import AppBarAdmin from '@components/AppBar/AppBarAdmin'
import { useDispatch } from 'react-redux';
import { addDevice } from '../../../action/device'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useHistory, Link } from "react-router-dom";
import useStyles from './styles'

function AddDevice() {
    const classes = useStyles()

    const dispatch = useDispatch();

    const history = useHistory();

    const initialState = { deviceId: '', type: '' };
    
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addDevice(form)).then(() => history.push('/admin'))
    };

  return (
    <div>
      <AppBarAdmin />
      <Paper className={classes.root}>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={5}>
                  <Typography className={classes.title} align="right" gutterBottom>Device ID: </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                  <TextField className={classes.text} required autoComplete="false" label="TL/DTH/L" variant="outlined" name="deviceId" onChange={handleChange}/>
              </Grid>
              <Grid item xs={4} sm={5}>
                  <Typography className={classes.title} align="right" gutterBottom>Type: </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                  <TextField className={classes.text} required autoComplete="false" label="Traffic Light/DHT11/Light"variant="outlined" name="type" onChange={handleChange}/>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.btncontainer}>
                  <Button className={classes.button} variant="contained" size="large" component={Link} to="/admin">Back</Button>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.updatebtncontainer}>
                  <Button className={classes.button} variant="contained" color="primary" size="large" type="submit">Update</Button>
              </Grid>
            </Grid>
        </form>
      </Paper>
    </div>
  )
}

export default AddDevice
