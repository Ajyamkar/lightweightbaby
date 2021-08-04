import React from 'react';
import "./Content.css";

import { DataGrid } from "@material-ui/data-grid";
import { Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { totalMacroNutritionCol, totalMicroNutritionCol } from './Lists/TotalNutritionColumnList';
import PieChart from './Charts/PieChart';



export default function Content(props) {

    const totalMacroNutritionRow = [{
        id: 1,
        protein: props.totalNutrients.protein === undefined ? 0 : props.totalNutrients.protein,
        carbs: props.totalNutrients.carbs === undefined ? 0 : props.totalNutrients.carbs,
        fats: props.totalNutrients.fats === undefined ? 0 : props.totalNutrients.fats,
        sugar: props.totalNutrients.sugar === undefined ? 0 : props.totalNutrients.sugar,
        water: props.totalNutrients.water === undefined ? 0 : props.totalNutrients.water,
    }]

    const totalMicroNutritionRow = [{
        id: 1,
        sodium: props.totalNutrients.sodium === undefined ? 0 : props.totalNutrients.sodium,
        potassium: props.totalNutrients.potassium === undefined ? 0 : props.totalNutrients.potassium,
        magnesium: props.totalNutrients.magnesium === undefined ? 0 : props.totalNutrients.magnesium,
        calcium: props.totalNutrients.calcium === undefined ? 0 : props.totalNutrients.calcium,
        zinc: props.totalNutrients.zinc === undefined ? 0 : props.totalNutrients.zinc,
        iron: props.totalNutrients.iron === undefined ? 0 : props.totalNutrients.iron,
        folate: props.totalNutrients.folate === undefined ? 0 : props.totalNutrients.folate,
        vitaminB6: props.totalNutrients.vitaminB6 === undefined ? 0 : props.totalNutrients.vitaminB6,
        vitaminC: props.totalNutrients.vitaminC === undefined ? 0 : props.totalNutrients.vitaminC,
        vitaminD: props.totalNutrients.vitaminD === undefined ? 0 : props.totalNutrients.vitaminD,
    }]


    return (
        <div className="content-div">

            <Grid style={{ marginBottom: '4vh' }} container alignItems='flex-start' justify='center'>
                <Grid item>
                    <Fab size='medium' className={'addFabIcon'}>
                        <AddIcon
                            fontSize="large"
                            style={{ color: 'black' }}
                            onClick={() => {
                                if (props.ingrident !== "") {
                                    props.individualIngridentAnalysis(props.mealName);
                                    props.toSetErrors(props.mealName, "");
                                    setTimeout(() => {
                                        props.toSetSnackbar(true);
                                    }, 1500)
                                } else {
                                    props.toSetErrors(props.mealName, "please enter the value");
                                }
                            }}
                        />
                    </Fab>
                </Grid>
                <Grid item>
                    <TextField
                        key={props.index}
                        id="filled-textarea"
                        label="Enter only one food item"
                        placeholder="eg :50g chicken"
                        name={props.mealName}
                        onChange={props.handleChange}
                        value={props.ingrident}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                if (props.ingrident !== "") {
                                    props.toSetErrors(props.mealName, "");
                                    setTimeout(() => {
                                        props.toSetSnackbar(true);
                                    }, 1500)
                                    props.individualIngridentAnalysis(props.mealName);
                                } else {
                                    props.toSetErrors(props.mealName, "please enter the value");
                                }
                            }
                        }}
                    />
                </Grid>
            </Grid>

            <Snackbar open={props.openSnackbar} autoHideDuration={4000} onClose={props.handleCloseSnackbar}>
                {props.errors.ingridentDataNotFound !== "" ?
                    <Alert variant="filled" onClose={props.handleCloseSnackbar} severity="error">
                        {props.errors.ingridentDataNotFound}
                    </Alert> :
                    <Alert variant="filled" onClose={props.handleCloseSnackbar} severity="success">
                        Added successfully
                    </Alert>
                }
            </Snackbar>

            {props.errors[props.mealName] ? <p className={"error"} >{props.errors[props.mealName]}</p> : null}



            <div className={'calories-table-div'} >
                <Grid container
                    classes={{ root: "tabletitleDiv" }}
                    justify='space-between'
                    alignItems='flex-end'
                >
                    <Grid item>
                        {props.mealName === 'MorningSnack' || props.mealName === 'EveningSnack' ?
                            props.mealName === "MorningSnack" ?
                                <h1>Morning Snack</h1> :
                                <h1>Evening Snack</h1>
                            :
                            <h1>{props.mealName}</h1>
                        }
                    </Grid>
                    <Grid item>
                        {props.nutritionRowSelectedId.length !== 0 ?
                            <IconButton
                                variant="contained"
                                style={{ background: props.nutritionRowSelectedId.length !== 0 ? 'red' : '#e6dece' }}
                                onClick={() => {
                                    props.deleteSelectedRows(props.mealName);

                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                            :
                            <IconButton>
                                < FilterListIcon />
                            </IconButton>
                        }

                    </Grid>
                </Grid>
                <DataGrid
                    rows={props.rows}
                    columns={props.columns}
                    pageSize={5}
                    checkboxSelection
                    autoHeight
                    onSelectionModelChange={({ selectionModel }) => {
                        const rowIds = selectionModel.map((rowId) =>
                            parseInt(String(rowId), 10)
                        );
                        props.toSetSelectedRowIds(rowIds, props.mealName)
                    }}
                />
            </div>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h1 style={{ fontSize: "1.5rem" }}>Analysis </h1>
                    <h2>
                        <span style={{color:props.totalNutrients.totalCalories<=props.caloriesRequiredToBeConsumedForAMeal?'seagreen':'red'}}>
                            {Math.round(props.totalNutrients.totalCalories === undefined ? 0 : props.totalNutrients.totalCalories)}
                        </span>
                        /
                        <span style={{color:'seagreen'}}>
                        {Math.round(props.caloriesRequiredToBeConsumedForAMeal)}
                        </span>
                         kcal
                    </h2>

                </AccordionSummary>
                <AccordionDetails>
                    {props.rows.length == 0 ?
                        <p>Enter food item you had. In order to show analysis. </p> :
                        <div>
                            <h2 className={"macronutritents-heading"}>Macro Nutritents</h2>
                            <DataGrid
                                rows={totalMacroNutritionRow}
                                columns={totalMacroNutritionCol}
                                hideFooterPagination
                                hideFooterSelectedRowCount
                                hideFooter
                                autoHeight
                            />
                            <h2 className={"micronutritents-heading"}>Micro Nutritents</h2>
                            <DataGrid
                                rows={totalMicroNutritionRow}
                                columns={totalMicroNutritionCol}
                                hideFooterPagination
                                hideFooterSelectedRowCount
                                hideFooter
                                autoHeight
                            />

                            <PieChart
                                totalCalories={props.totalNutrients.totalCalories === undefined ? 0 : props.totalNutrients.totalCalories}
                                pieChartName={`analysis of ${props.mealName}`}
                                macrosValues={[
                                    props.totalNutrients.protein === undefined ? 0 : props.totalNutrients.protein,
                                    props.totalNutrients.carbs === undefined ? 0 : props.totalNutrients.carbs,
                                    props.totalNutrients.fats === undefined ? 0 : props.totalNutrients.fats,
                                    props.totalNutrients.sugar === undefined ? 0 : props.totalNutrients.sugar,
                                ]}

                                microsValues={[
                                    props.totalNutrients.sodium === undefined ? 0 : props.totalNutrients.sodium,
                                    props.totalNutrients.potassium === undefined ? 0 : props.totalNutrients.potassium,
                                    props.totalNutrients.magnesium === undefined ? 0 : props.totalNutrients.magnesium,
                                    props.totalNutrients.calcium === undefined ? 0 : props.totalNutrients.calcium,
                                    props.totalNutrients.zinc === undefined ? 0 : props.totalNutrients.zinc,
                                    props.totalNutrients.iron === undefined ? 0 : props.totalNutrients.iron,
                                    props.totalNutrients.folate === undefined ? 0 : props.totalNutrients.folate,
                                    props.totalNutrients.vitaminB6 === undefined ? 0 : props.totalNutrients.vitaminB6,
                                    props.totalNutrients.vitaminC === undefined ? 0 : props.totalNutrients.vitaminC,
                                    props.totalNutrients.vitaminD === undefined ? 0 : props.totalNutrients.vitaminD,
                                ]}
                            />
                        </div>
                    }
                </AccordionDetails>
            </Accordion>


        </div>
    )
}
