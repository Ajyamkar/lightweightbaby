import { Grid } from '@material-ui/core';
import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChart(props) {

    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Total Calories consumed(kcal)',
                data: props.data,
                backgroundColor: 'rgb(1, 147, 124)'
            }
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const style = {
        backgroundColor:'white',
        margin:'2vh 0',
        padding:'2vh 0'
    }
    return (
        <div style={style}>
            <Grid container justify='space-around' >
                <Grid item xs={12} sm={10} md={10}>
                    <Bar data={data} options={options} />
                </Grid>
            </Grid>
        </div>
    )
}
