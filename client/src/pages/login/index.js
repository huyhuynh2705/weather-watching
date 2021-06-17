import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import useStyles from "./styles"
import { signIn } from '../../action/auth';
import { useDispatch } from 'react-redux'
import { useAuth } from '@contexts'
const initialState = { username: '', password: '' }

const Login = () => {
  const classes = useStyles()
  const [form, setForm] = useState(initialState)
  const dispatch = useDispatch()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(signIn(form)).then(() => login())
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div>
    <Grid container component="main" className={classes.root}>
      {/* <CssBaseline /> */}
      <Grid item xs={false} sm={3} md={5} className={classes.image} />
      <Grid item xs={12} sm={9} md={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h4" style={{fontWeight: '600', color:'#20339c'}}> WEATHER WATCHING </Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="User Name"
              name="username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={false} sm={4}>
                <Button color="primary" href="/forgotpassword" fullWidth align="center">Forgot password?</Button>
              </Grid>
              <Grid item xs={false} sm={8}>
                <Button color="primary" href="/contact" fullWidth align="center">Don't have an account? Contact us!</Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
    </div>
  )
}

export default Login
