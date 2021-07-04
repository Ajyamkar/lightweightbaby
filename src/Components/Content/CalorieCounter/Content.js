import React from 'react';
import "./CalorieCounter.css";

import { DataGrid } from "@material-ui/data-grid";
import { Grid, IconButton, Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    tabletitleDiv: {
        background: ''
    },
    AddFabIcon: {
        background: green['A400'], marginRight: '5vw'
    }
})

export default function Content(props) {
    const classes = useStyles();
    // console.log(props);
    return (
        <div className="content-div">

            {/* <div classes={classes.root}>
                <TextField
                    id="standard-basic"
                    label="Enter your recipe name"
                    name="fullRecipeName"
                    onChange={props.handleChange}
                />


                <TextField
                    id="filled-textarea"
                    label="Enter all the ingridents of recipe"
                    placeholder="eg :50g chicken,100g rice"
                    name='fullRecipe'
                    onChange={props.handleChange}
                    multiline
                    disp
                    variant="filled"
                />
                <TextField
                    id="filled-textarea"
                    label="Enter only one ingrident"
                    placeholder="eg :50g chicken"
                    name='ingrident'
                    onChange={props.handleChange}
                />
            </div> */}
            {/* <button onClick={props.fullRecipeAnalysis}>Submit</button>
            <button onClick={props.individualIngridentAnalysis}>Submit</button> */}

            <Grid container alignItems='flex-start' justify='center'>
                <Grid item>
                    <Fab size='medium' className={'addFabIcon'}>
                        <AddIcon
                            fontSize="large"
                            style={{ color: 'black' }}
                            onClick={() => {
                                if (props.ingrident !== "") {
                                    props.toSetErrors("ingrident", "");
                                    setTimeout(() => {
                                        props.toSetSnackbar(true);
                                    }, 1500)
                                    props.individualIngridentAnalysis();
                                } else {
                                    props.toSetErrors("ingrident", "please enter the value");
                                }
                            }}
                        />
                    </Fab>
                </Grid>
                <Grid item>
                    <TextField
                        id="filled-textarea"
                        label="Enter only one ingrident"
                        placeholder="eg :50g chicken"
                        name='ingrident'
                        onChange={props.handleChange}
                    />
                </Grid>
            </Grid>

            <Snackbar open={props.openSnackbar} autoHideDuration={6000} onClose={props.handleCloseSnackbar}>
                {props.errors.ingridentDataNotFound !== "" ?
                    <Alert variant="filled" onClose={props.handleCloseSnackbar} severity="error">
                        {props.errors.ingridentDataNotFound}
                    </Alert> :
                    <Alert variant="filled" onClose={props.handleCloseSnackbar} severity="success">
                        Added successfully
                    </Alert>
                }
            </Snackbar>

            <p style={{ color: "red",textAlign:"center" }}>{props.errors.ingrident}</p>
            {/* <p style={{ color: "red" }}>{props.errors.ingridentDataNotFound}</p> */}
            <Grid container
                classes={{ root: "tabletitleDiv" }}
                justify='space-between'
                alignItems='baseline'
            >
                <Grid item>
                    <h1>Beakfast</h1>
                </Grid>
                <Grid item>
                    {props.nutritionRowSelectedId.length !== 0 ?
                        <IconButton
                            variant="contained"
                            style={{ background: props.nutritionRowSelectedId.length !== 0 ? 'red' : '#e6dece' }}
                            onClick={() => {
                                props.deleteSelectedRows();
                                
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


            <div style={{ height: 400, width: "100%" }}>
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
                        props.toSetSelectedRowIds(rowIds)
                    }}
                />
            </div>



        </div>
    )
}
