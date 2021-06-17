  
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles"
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { signUp } from '../../action/auth'
const initialState = { name: '', email:'', phoneNum: '', address: '', username: '', password: '', confirmPassword: ''};


const Contact = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [form, setForm] = useState(initialState)
  const [sent, setSent] = useState(false)
  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})

  const handleSubmit = (e) => {
    e.preventDefault()
    if ((form.password !== form.confirmPassword) ) {
        alert("Password and confirm password must match")
        return
    }
    dispatch(signUp(form))
    setSent(true)
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography variant="h4" style={{fontWeight: '600', color:'#20339c'}}> WEATHER WATCHING </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up for new account
        </Typography>
        {(sent == false) ? 
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField variant="outlined" required  fullWidth label="Full Name" name="name" onChange={handleChange}/>
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" required fullWidth label="Email Address" name="email" onChange={handleChange}/>
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" required fullWidth label="Phone Number" name="phoneNum" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth label="Address" name="address" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <TextField name="username" variant="outlined" required fullWidth id="username" label="Userame" onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" required fullWidth name="password" label="Password" type="password" onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" required fullWidth name="confirmPassword" label="Confirm Password" type="confirmPassword" onChange={handleChange}/>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign Up</Button>
          <Grid container justify="flex-end">
            <Grid item>
                <Button color="primary" href="/">Have an account? Sign in</Button>
            </Grid>
          </Grid>
        </form> :
        <>
        <Typography variant="h6" align="center" gutterBottom> Sign up request sent. A confirm email will be sent to your email. </Typography>
        <Button fullWidth variant="contained" color="primary" href="/">Back to homepage</Button>
        </>
        }
      </Paper>
    </Container>
  );
}

export default Contact
