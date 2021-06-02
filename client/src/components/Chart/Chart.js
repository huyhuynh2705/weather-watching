import React, { useState } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import useStyles from "./styles"
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux'


const Chart = () => {
    const classes = useStyles()
    const devicedata = useSelector((state) => state.alldevicedata)
    let tldata = [];
    let tllabels = [];

    if (!!devicedata.tlvalues) {
        for (let i = devicedata.tlvalues.length - 1 ; i >= 0 ; i--) {
            tldata.push(devicedata.tlvalues[i].value)
            tllabels.push(devicedata.tlvalues[i].time.slice(11, 16) + " " + devicedata.tlvalues[i].time.slice(8, 10)+ "/" + devicedata.tlvalues[i].time.slice(5, 7))
        }
    }

    for (let i = 0; i < tldata.length; i++) {
        if (tldata[i] == '10') { tldata[i] = '-1'}
        else if (tldata[i] == '11') { tldata[i] = '0'}
        else if (tldata[i] == '01') { tldata[i] = '1'}
    }

    let tempdata = [];
    let templabels = [];    
    let humdata = [];
    let humlabels = [];

    if (!!devicedata.dhtvalues) {
        for (let i = devicedata.dhtvalues.length - 1 ; i >= 0 ; i--) {
            tempdata.push(devicedata.dhtvalues[i].value)
            humdata.push(devicedata.dhtvalues[i].value2)
            templabels.push(devicedata.dhtvalues[i].time.slice(11, 16) + " " + devicedata.dhtvalues[i].time.slice(8, 10)+ "/" + devicedata.dhtvalues[i].time.slice(5, 7))
            humlabels.push(devicedata.dhtvalues[i].time.slice(11, 16) + " " + devicedata.dhtvalues[i].time.slice(8, 10)+ "/" + devicedata.dhtvalues[i].time.slice(5, 7))
        }
    }

    let lightdata = [];
    let lightlabels = [];

    if (!!devicedata.lvalues) {
        for (let i = devicedata.lvalues.length - 1 ; i >= 0 ; i--) {
            lightdata.push((devicedata.lvalues[i].value*100)/1023)
            lightlabels.push(devicedata.lvalues[i].time.slice(11, 16) + " " + devicedata.lvalues[i].time.slice(8, 10)+ "/" + devicedata.lvalues[i].time.slice(5, 7))
        }
    }

    const tlChartData = {
        labels: tllabels,
        datasets: [{
            label: 'Condition',
            data: tldata,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const tempChartData = {
        labels: templabels,
        datasets: [{
            label: 'Temperature',
            data: tempdata,
            fill: false,
            borderColor: 'rgb(100, 192, 250)',
            tension: 0.1
        }, 
        {
            label: 'Humidity',
            data: humdata,
            fill: false,
            borderColor: 'rgb(75, 19, 255)',
            tension: 0.1
        }, 
        {
            label: 'Light',
            data: lightdata,
            fill: false,
            borderColor: 'rgb(255, 255, 100)',
            tension: 0.1
        }]
    };

    const humChartData = {
        labels: humlabels,
        datasets: [{
            label: 'Humidity',
            data: humdata,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const lightChartData = {
        labels: lightlabels,
        datasets: [{
            label: 'Light',
            data: lightdata,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return(
        <Container>
            <Paper className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={false} sm={6}>
                        <Line data={tlChartData} height={200} />
                        <Typography align="center" variant="h6">Condition Chart</Typography>
                    </Grid>
                    <Grid item xs={false} sm={6}>
                        <Line data={tempChartData} height={200} />
                        <Typography align="center" variant="h6">Data Chart</Typography>
                    </Grid>
                    {/* <Grid item xs={false} sm={6}>
                        <Line data={humChartData} height={200} />
                        <Typography align="center" variant="h6">Humidity Chart</Typography>
                    </Grid>
                    <Grid item xs={false} sm={6}>
                        <Line data={lightChartData} height={200} />
                        <Typography align="center" variant="h6">Light Chart</Typography>
                    </Grid> */}
                </Grid>
            </Paper>
        </Container>
    )
}

export default Chart