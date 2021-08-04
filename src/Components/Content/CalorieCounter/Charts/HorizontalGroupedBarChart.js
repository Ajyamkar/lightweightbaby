import { Grid } from '@material-ui/core';
import React from 'react'
import { Bar } from 'react-chartjs-2';

export default function HorizontalGroupedBarChart(props) {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Protein(g)',
                data: props.protein,
                backgroundColor: 'rgb(252, 84, 4)',
            },
            {
                label: 'Carbs(g)',
                data: props.carbs,
                backgroundColor: '#BF1363',
            },
            {
                label: 'Fats(g)',
                data: props.fats,
                backgroundColor: 'rgb(255, 201, 71)',
            },
            {
                label: 'Sugar(g)',
                data: props.sugar,
                backgroundColor: 'rgb(4, 0, 154)',
            },
        ],
    };

    let delayed;
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
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
        }
    };

    // const options = {
    //     indexAxis: 'y',
    //     // Elements options apply to all of the options unless overridden in a dataset
    //     // In this case, we are setting the border of each horizontal bar to be 2px wide
    //     elements: {
    //         bar: {
    //             borderWidth: 2,
    //         },
    //     },
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             position: 'right',
    //         },
    //         title: {
    //             display: true,
    //             text: 'Chart.js Horizontal Bar Chart',
    //         },
    //     },
    // };

    const style = {
        backgroundColor:'white',
        margin:'2vh 0',
        padding:'2vh 0'
    }
    return (
        <div style={style}>
            <Grid container justify='space-around'>
                <Grid item xs={12} sm={10} md={10}>
                    <Bar data={data} options={options} />
                </Grid>
            </Grid>
        </div>
    )
}
