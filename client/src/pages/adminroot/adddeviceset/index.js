import React, { useState } from 'react';
import AppBarAdmin from '@components/AppBar/AppBarAdmin'
import { useDispatch } from 'react-redux';
import { addDeviceSet } from '../../../action/device'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useHistory, Link } from "react-router-dom";
import useStyles from './styles'

function AddDeviceSet() {
    const classes = useStyles()

    const dispatch = useDispatch();

    const history = useHistory();

    const initialState = { deviceSetId: '', userID: '', trafficLightId: '', DHT11Id: '', lightId: '' };
    
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addDeviceSet(form)).then(() => history.push('/admin/adddeviceset'))
        console.log(form)
    };

  return (
    <div>
      <AppBarAdmin />
      <Paper className={classes.root}>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={5}>
                  <Typography className={classes.title} align="right" gutterBottom>Device Set ID: </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                  <TextField className={classes.text} required autoComplete="false" label="SET" variant="outlined" name="deviceSetId" onChange={handleChange}/>
              </Grid>
              <Grid item xs={4} sm={5}>
                  <Typography className={classes.title} align="right" gutterBottom>Traffic Light ID: </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                  <TextField className={classes.text} required autoComplete="false" label="TL"variant="outlined" name="trafficLightId" onChange={handleChange}/>
              </Grid>
              <Grid item xs={4} sm={5}>
                  <Typography className={classes.title} align="right" gutterBottom>DHT11 ID: </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                  <TextField className={classes.text} required autoComplete="false" label="DTH" variant="outlined" name="DHT11Id" onChange={handleChange}/>
              </Grid>
              <Grid item xs={4} sm={5}>
                  <Typography className={classes.title} align="right" gutterBottom>Light ID: </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                  <TextField className={classes.text} required autoComplete="false" label="L"variant="outlined" name="lightId" onChange={handleChange}/>
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

export default AddDeviceSet
