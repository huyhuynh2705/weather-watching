import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DeviceHubIcon from '@material-ui/icons/DeviceHub'
import useStyles from './styles'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useAuth } from '@contexts'

export default function ButtonAppBar() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" className={classes.title}>
            Weather Watching
          </Typography>
          <Button className={classes.button} variant="text" color="inherit" size="large" startIcon={<DeviceHubIcon />} >Devices</Button>
          <Button className={classes.button} variant="text" color="inherit" size="large" startIcon={<AccountCircleIcon />} onClick={handleProfileClick}>User</Button>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleProfileClose}>
            <MenuItem onClick={handleProfileClose}>My Account</MenuItem>
            <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
            <MenuItem onClick={handleProfileClose}>Close</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  )
}
