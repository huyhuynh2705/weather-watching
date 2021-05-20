import React, { useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import useStyles from "./styles"
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux'


const Chart = () => {
    const classes = useStyles()
    const devicedata = useSelector((state) => state.alldevicedata)
    console.log("chart", devicedata)
    let tldata = [];
    let tllabels = [];

    if (!!devicedata.tlvalues) {
        for (let i = 0; i < devicedata.tlvalues.length; i++) {
            tldata.push(devicedata.tlvalues[i].value)
            tllabels.push(devicedata.tlvalues[i].time.slice(11, 16) + " " + devicedata.tlvalues[i].time.slice(8, 10)+ "/" + devicedata.tlvalues[i].time.slice(5, 7))
        }
    }
    console.log("tlvalues", tldata)


    let tempdata = [];
    let templabels = [];    
    let humdata = [];
    let humlabels = [];

    if (!!devicedata.dhtvalues) {
        for (let i = 0; i < devicedata.dhtvalues.length; i++) {
            tempdata.push(devicedata.dhtvalues[i].value)
            humdata.push(devicedata.dhtvalues[i].value2)
            templabels.push(devicedata.dhtvalues[i].time.slice(11, 16) + " " + devicedata.dhtvalues[i].time.slice(8, 10)+ "/" + devicedata.dhtvalues[i].time.slice(5, 7))
            humlabels.push(devicedata.dhtvalues[i].time.slice(11, 16) + " " + devicedata.dhtvalues[i].time.slice(8, 10)+ "/" + devicedata.dhtvalues[i].time.slice(5, 7))
        }
    }

    let lightdata = [];
    let lightlabels = [];

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
            borderColor: 'rgb(75, 192, 192)',
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
                    </Grid>
                    <Grid item xs={false} sm={6}>
                        <Line data={tempChartData} height={200} />
                    </Grid>
                    <Grid item xs={false} sm={6}>
                        <Line data={humChartData} height={400} width={600} />
                    </Grid>
                    <Grid item xs={false} sm={6}>
                        <Line data={lightChartData} height={400} width={600} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Chart