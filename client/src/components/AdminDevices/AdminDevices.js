import React from 'react'
import { Container, Grid, Paper, Typography } from '@material-ui/core'
import useStyles from "./styles"
import { useSelector } from 'react-redux';
import AdminDevice from './AdminDevice/AdminDevice'

const AdminDevices = () => {
    const classes = useStyles()
    let devices = useSelector((state) => state.device)

    return(
        <Container>
            <Paper className={classes.root}>
                <Typography style={{color: "#20339c", fontWeight: '500', fontSize: '30px'}} align="center" gutterBottom>Device List</Typography>
                <Grid container spacing={1}>
                {devices.map((device) => (
                    <Grid key={device._id} item xs={false} sm={12}>
                        <AdminDevice data={device} />
                    </Grid>
                ))}
            </Grid>
            </Paper>
        </Container>
    )
}

export default AdminDevices