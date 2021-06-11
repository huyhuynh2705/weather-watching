import React, { useState } from 'react';
import AppBar from '@components/AppBar/AppBarUser'
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../action/auth'
import { TOKEN_NAME } from '@environments';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useHistory, Link } from "react-router-dom";
import useStyles from './styles'


const UpdateProfile = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(TOKEN_NAME));
    const history = useHistory();

    const initialState = { name: user.result.name, email: user.result.email, phoneNum: user.result.phoneNum, address: user.result.address, deviceSetName: user.result.deviceSetName, password: '', confirmPassword: ''};
    
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Password and confirm password must match")
        } else {
            dispatch(updateProfile(user.result._id, form)).then(() => history.push('/user'))
        }
      };

    return (
        <div>
            <AppBar />
            <Paper className={classes.root}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={4} sm={5}>
                            <Typography className={classes.title} align="right" gutterBottom>Name: </Typography>
                        </Grid>
                        <Grid item xs={8} sm={7}>
                            <TextField className={classes.text} autoComplete="false" variant="outlined" name="name" defaultValue={user.result.name} onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={4} sm={5}>
                            <Typography className={classes.title} align="right" gutterBottom>Email: </Typography>
                        </Grid>
                        <Grid item xs={8} sm={7}>
                            <TextField className={classes.text} autoComplete="false" variant="outlined" name="email"  type="email" defaultValue={user.result.email} onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={4} sm={5}>
                            <Typography className={classes.title} align="right" gutterBottom>Phone Number: </Typography>
                        </Grid>
                        <Grid item xs={8} sm={7}>
                            <TextField className={classes.text} autoComplete="false" variant="outlined" name="phoneNum" defaultValue={user.result.phoneNum} onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={4} sm={5}>
                            <Typography className={classes.title} align="right" gutterBottom>Address: </Typography>
                        </Grid>
                        <Grid item xs={8} sm={7}>
                            <TextField className={classes.text} autoComplete="false" variant="outlined" name="address" defaultValue={user.result.address} onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={4} sm={5}>
                            <Typography className={classes.title} align="right" gutterBottom>Device Set Name: </Typography>
                        </Grid>
                        <Grid item xs={8} sm={7}>
                            <TextField className={classes.text} disabled autoComplete="false" variant="outlined" name="deviceSetName" defaultValue={user.result.deviceSetName}/>
                        </Grid>
                        <Grid item xs={4} sm={5}>
                            <Typography className={classes.title} align="right" gutterBottom>Username: </Typography>
                        </Grid>
                        <Grid item xs={8} sm={7}>
                            <TextField className={classes.text} disabled autoComplete="false" variant="outlined" name="username" defaultValue={user.result.username}/>
                        </Grid>
                        <Grid item xs={4} sm={5}>
                            <Typography className={classes.title} align="right" gutterBottom>Password: </Typography>
                        </Grid>
                        <Grid item xs={8} sm={7}>
                            <TextField className={classes.text} autoComplete="false" type="password" variant="outlined" name="password" onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={4} sm={5}>
                            <Typography className={classes.title} align="right" gutterBottom>Confirm password: </Typography>
                        </Grid>
                        <Grid item xs={8} sm={7}>
                            <TextField className={classes.text} autoComplete="false" type="password" variant="outlined" name="confirmPassword" onChange={handleChange}/>
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

export default UpdateProfile