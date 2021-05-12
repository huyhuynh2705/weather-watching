import React, { useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import useStyles from "./styles"

const Chart = () => {
    const classes = useStyles()
    return(
        <Container>
            <Grid>
                <Paper>
                    <h1>Chart Chart Chart Chart Chart Chart Chart Chart Chart Chart Chart Chart </h1>
                </Paper>
            </Grid>
        </Container>
    )
}

export default Chart