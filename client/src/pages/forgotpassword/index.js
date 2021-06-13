  
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from "./styles"
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../action/auth'

const ForgotPassword = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [email, setEmail] = useState({email: ''})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setEmail({[e.target.name]: e.target.value})

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
    setSent(true)
    // alert("Password has been sent to your email")
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        {(sent == false) ? 
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField autoComplete="false" variant="outlined" required name="email" label="Email" fullWidth onChange={handleChange} type="email"/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Get Password
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Button color="primary" href="/">Have an account? Sign in</Button>
            </Grid>
          </Grid>
        </form> : 
        <div>
          <Typography style={{marginTop: '10px', marginBottom: '20px'}} variant="h6">A new password has been sent to your email.</Typography>
          <Button fullWidth variant="contained" color="primary" href="/">Back to Sign In</Button>
        </div>
        }
      </div>
    </Container>
  );
}

export default ForgotPassword
