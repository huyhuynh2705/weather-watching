import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeviceHubIcon from '@material-ui/icons/DeviceHub'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useAuth } from '@contexts'
import { TOKEN_NAME } from '@environments';

export default function AppBarAdmin() {
  const classes = useStyles()
  const { logout } = useAuth()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem(TOKEN_NAME));

  const handleLogout = async (e) => {
    e.preventDefault();
    
    dispatch({ type: 'LOGOUT' })

    logout()
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography component={Link} to="/admin" className={classes.title}>WEATHER WATCHING</Typography>
          {/* <Button className={classes.button} variant="text" color="inherit" size="large" startIcon={<DeviceHubIcon />} component={Link} to="/admin/adddeviceset">Add Device Set</Button> */}
          {/* <Button className={classes.button} variant="text" color="inherit" size="large" startIcon={<PersonAddIcon />} component={Link} to="/admin/signup">Add User</Button> */}
          <Button className={classes.button} variant="text" color="inherit" size="large" startIcon={<AccountCircleIcon />} onClick={handleLogout}>Admin Logout</Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper className={classes.paperMenu}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem className={classes.menu} component={Link} to="/user">Profile</MenuItem>
                      <MenuItem className={classes.menu} component={Link} to="/updateprofile">Update Profile</MenuItem>
                      <MenuItem className={classes.menu} onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
    </div>
  )
}
