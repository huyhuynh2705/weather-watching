import React, { useState } from 'react';
import AppBarAdmin from '@components/AppBar/AppBarAdmin'
import { useDispatch } from 'react-redux';
import { signup } from '../../../action/auth'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useHistory, Link } from "react-router-dom";
import useStyles from './styles'

function Admin() {
  const classes = useStyles()

  const dispatch = useDispatch();

  const history = useHistory();

  const initialState = { username: '', password: '', name: '', email:'', phoneNum: '', deviceSetId: '', role: '', confirmPassword: ''};
  
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
      e.preventDefault();
      if (form.password !== form.confirmPassword) {
          alert("Password and confirm password must match")
      } else {
          dispatch(signup(form)).then(() => history.push('/signup'))
          console.log(form)
      }
    };

  return (
    <div>
      <AppBarAdmin />
      <Paper className={classes.root}>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={6}>
                  <Typography className={classes.title} align="right" gutterBottom>Name: </Typography>
              </Grid>
              <Grid item xs={8} sm={6}>
                  <TextField className={classes.text} autoComplete="false" label="Full Name" variant="outlined" name="name" onChange={handleChange}/>
              </Grid>
              <Grid item xs={4} sm={6}>
                  <Typography className={classes.title} align="right" gutterBottom>Email: </Typography>
              </Grid>
              <Grid item xs={8} sm={6}>
                  <TextField className={classes.text} autoComplete="false" label="Email"variant="outlined" name="email" onChange={handleChange}/>
              </Grid>
              <Grid item xs={4} sm={6}>
                  <Typography className={classes.title} align="right" gutterBottom>Phone Number: </Typography>
              </Grid>
              <Grid item xs={8} sm={6}>
                  <TextField className={classes.text} autoComplete="false" label="Phone Number" variant="outlined" name="phoneNum" onChange={handleChange}/>
              </Grid>
              <Grid item xs={4} sm={6}>
                  <Typography className={classes.title} align="right" gutterBottom>Device Set ID: </Typography>
              </Grid>
              <Grid item xs={8} sm={6}>
                  <TextField className={classes.text} disabled autoComplete="false" label="Not Defined Yet" variant="outlined" name="deviceSetId"/>
              </Grid>
              <Grid item xs={4} sm={6}>
                  <Typography className={classes.title} align="right" gutterBottom>Username: </Typography>
              </Grid>
              <Grid item xs={8} sm={6}>
                  <TextField className={classes.text} autoComplete="false" label="Username" variant="outlined" name="username" onChange={handleChange}/>
              </Grid>
              <Grid item xs={4} sm={6}>
                  <Typography className={classes.title} align="right" gutterBottom>Password: </Typography>
              </Grid>
              <Grid item xs={8} sm={6}>
                  <TextField className={classes.text} autoComplete="false" label="Password" type="password" variant="outlined" name="password" onChange={handleChange}/>
              </Grid>
              <Grid item xs={4} sm={6}>
                  <Typography className={classes.title} align="right" gutterBottom>Confirm password: </Typography>
              </Grid>
              <Grid item xs={8} sm={6}>
                  <TextField className={classes.text} autoComplete="false" label="Confirm Password" type="password" variant="outlined" name="confirmPassword" onChange={handleChange}/>
              </Grid>
              <Grid item xs={4} sm={6}>
                  <Typography className={classes.title} align="right" gutterBottom>Role: </Typography>
              </Grid>
              <Grid item xs={8} sm={6}>
                  <TextField className={classes.text} autoComplete="false" label="User / Admin" variant="outlined" name="role" onChange={handleChange}/>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.btncontainer}>
                  <Button className={classes.button} variant="contained" size="large" component={Link} to="/user">Back</Button>
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

export default Admin
