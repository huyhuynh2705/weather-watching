import React, { useState } from 'react'
import { Container, Grid, Typography, CircularProgress } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import useStyles from "./styles"
import { useSelector } from 'react-redux'
import ReactApexChart  from 'react-apexcharts'

const Chart = () => {
    const classes = useStyles()
    const dataChart = useSelector((state) => state.data.dataChart)
    // console.log(dataChart);
    const temperatureChartData = {
        series: [{
            name: 'Min temperature',
            data: dataChart? dataChart.temperature.min: [0,0,0,0,0,0,0]
          }, {
            name: 'Max temperature',
            data: dataChart? dataChart.temperature.max: [0,0,0,0,0,0,0]
          }, {
            name: 'Average temperature',
            data: dataChart? dataChart.temperature.avg: [0,0,0,0,0,0,0]
          }],
          options: {
            chart: {
              type: 'bar',
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            yaxis: {
                title: {
                  text: 'Celsius degree'
                }
            },
            xaxis: {
              categories: ['1', '2', '3', '4', '5', '6', '7'],
              title: {
                text: 'Hour(s) ago'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "°C"
                }
              }
            }
        }
    }

    const humidityChartData = {
        series: [{
            name: 'Min humidity',
            data: dataChart? dataChart.humidity.min: [0,0,0,0,0,0,0]
          }, {
            name: 'Max humidity',
            data: dataChart? dataChart.humidity.max: [0,0,0,0,0,0,0]
          }, {
            name: 'Average humidity',
            data: dataChart? dataChart.humidity.avg: [0,0,0,0,0,0,0]
          }],
          options: {
            chart: {
              type: 'bar',
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            yaxis: {
                title: {
                  text: '% humidity'
                }
            },
            xaxis: {
              categories: ['1', '2', '3', '4', '5', '6', '7'],
              title: {
                text: 'Hour(s) ago'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "%"
                }
              }
            }
        }
    }

    const lightChartData = {
        series: [{
            name: 'Min light unit',
            data: dataChart? dataChart.light.min: [0,0,0,0,0,0,0]
          }, {
            name: 'Max light unit',
            data: dataChart? dataChart.light.max: [0,0,0,0,0,0,0]
          }, {
            name: 'Average light unit',
            data: dataChart? dataChart.light.avg: [0,0,0,0,0,0,0]
          }],
          options: {
            chart: {
              type: 'bar',
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            yaxis: {
                title: {
                  text: 'Unit'
                }
            },
            xaxis: {
              categories: ['1', '2', '3', '4', '5', '6', '7'],
              title: {
                text: 'Hour(s) ago'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "unit"
                }
              }
            }
        }
    }

    const tlChartData = {
        series: dataChart? dataChart.trafficLight: [100,0,0],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Fine (Green light)', 'Normal (Yellow light)', 'Bad (Red light)'],
            responsive: [{
                breakpoint: 480,
                options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
            }]
        }
    }

    return (
        <Container>
            <Paper className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={false} sm={6}>
                        <div id="chart">
                            <ReactApexChart options={tlChartData.options} series={tlChartData.series} type="pie" />
                        </div>
                        <Typography align="center" variant="h6">Condition</Typography>
                    </Grid>
                    <Grid item xs={false} sm={6}>
                        <ReactApexChart options={temperatureChartData.options} series={temperatureChartData.series} type="bar" />
                        <Typography align="center" variant="h6">Temperature</Typography>
                    </Grid>
                    <Grid item xs={false} sm={6}>
                        <ReactApexChart options={humidityChartData.options} series={humidityChartData.series} type="bar" />
                        <Typography align="center" variant="h6">Humidity</Typography>
                    </Grid>
                    <Grid item xs={false} sm={6}>
                        <ReactApexChart options={lightChartData.options} series={lightChartData.series} type="bar" />
                        <Typography align="center" variant="h6">Light</Typography>
                    </Grid> 
                </Grid>
            </Paper>
        </Container>
    )
}

export default Chart