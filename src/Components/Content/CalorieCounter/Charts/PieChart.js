import React from 'react'
import '../PreviousDataModal/PreviousDataModal.css'
import { Pie } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';

export default function PieChart(props) {
    const macrosData = {
        labels: ['protein(g)', 'carbs(g)', 'fats(g)', 'sugar(g)'],
        datasets: [
            {
                label: props.pieChartName,
                data: props.macrosValues,
                backgroundColor: [
                    'rgb(252, 84, 4)',
                    'rgb(1, 147, 124)',
                    'rgb(255, 201, 71)',
                    'rgb(4, 0, 154)',
                    // 'rgb(62, 219, 240)',
                ],
                // borderColor: [
                //     'rgb(252, 84, 4)',
                //     'rgb(1, 147, 124)',
                //     'rgb(255, 201, 71)',
                //     'rgb(4, 0, 154)',
                //     // 'rgb(62, 219, 240)',
                // ],
                borderWidth: 1,
            },
        ],
        options: {
            responsive: true,
        }
    };

    const microsData = {
        labels: ['sodium(mg)', 'potassium(mg)', 'magnesium(mg)', 'calcium(mg)', 'iron(mg)', ' zinc(mg)', 'folate(µg)', 'vitaminB6(mg)', ' vitaminC(mg)', 'vitaminD(µg)'],
        datasets: [
            {
                label: props.pieChartName,
                data: props.microsValues,
                backgroundColor: [
                    'rgb(40, 255, 191)',
                    'rgb(255, 103, 231)',
                    'rgb(245, 253, 176)',
                    'rgb(247, 230, 173)',
                    'rgb(255, 225, 148)',
                    'rgb(232, 246, 239)',
                    'rgb(184, 223, 216)',
                    'rgb(160, 60, 120)',
                    'rgb(237, 142, 124)',
                    'rgb(205, 243, 162)'
                ],
                // borderColor: [
                //     'rgb(40, 255, 191)',
                //     'rgb(255, 103, 231)',
                //     'rgb(245, 253, 176)',
                //     'rgb(247, 230, 173)',
                //     'rgb(255, 225, 148)',
                //     'rgb(232, 246, 239)',
                //     'rgb(184, 223, 216)',
                //     'rgb(160, 60, 120)',
                //     'rgb(237, 142, 124)',
                //     'rgb(205, 243, 162)'
                // ],
                borderWidth: 1,
                // width: 50,
            },
        ],
        options: {
            responsive: true,
        }
    };

    return (
        <div className={'pie-chart-div'}>
            <h2>Total calories consumed = <span style={{color:'seagreen'}} >{props.totalCalories}kcal</span></h2>
            <Grid container justify='space-around'>
                <Grid item xs={12} sm={6} md={3}>
                    <Pie data={macrosData} />
                    <h2 style={{textAlign:'center',margin:'2vh 0'}}>Macro Nutritents</h2>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Pie data={microsData} />
                    <h2 style={{textAlign:'center',margin:'2vh 0'}}>Micro Nutritents</h2>
                </Grid>
            </Grid>
         </div>
    )
}
