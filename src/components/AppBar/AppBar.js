import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DeviceHubIcon from '@material-ui/icons/DeviceHub'
import useStyles from './styles'

export default function ButtonAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Weather Watching
          </Typography>
          <Button className={classes.button} variant="text" color="inherit" size="large" startIcon={<DeviceHubIcon />}>Devices</Button>
          <Button className={classes.button} variant="text" color="inherit" size="large" startIcon={<AccountCircleIcon />}>User</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
