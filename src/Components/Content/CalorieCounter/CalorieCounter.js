import React, { Component } from 'react';
import "./CalorieCounter.css";
import api from "../../Axios/axios";
import Content from './Content';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'foodItem',
        headerName: 'Food Item',
        width: 150
    },
    {
        field: 'serving',
        headerName: 'Serving(g)',
        width: 150
    },
    {
        field: 'totalCalories',
        headerName: 'TotalCalories(kcal)',
        width: 150
    },
    {
        field: 'protein',
        headerName: 'Protein(g)',
        width: 150
    },
    {
        field: 'carbs',
        headerName: 'Carbs(g)',
        width: 150
    },
    {
        field: 'fats',
        headerName: 'Fats(g)',
        width: 150
    },
    {
        field: 'sugar',
        headerName: 'Sugar(g)',
        width: 150
    }

]

export default class CalorieCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                ingrident: "",
                ingridentDataNotFound: ""
            },
            openSnackbar: false,
            fullRecipeName: "",
            fullRecipe: "",
            fullRecipeNutritionAnalysis: {},
            ingrident: "",
            nutritionRow: [],
            nutritionRowSelectedId: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.fullRecipeAnalysis = this.fullRecipeAnalysis.bind(this);
        this.individualIngridentAnalysis = this.individualIngridentAnalysis.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.toSetSelectedRowIds = this.toSetSelectedRowIds.bind(this);
        this.deleteSelectedRows = this.deleteSelectedRows.bind(this);
        this.toSetErorrs = this.toSetErorrs.bind(this);
        this.toSetSnackbar = this.toSetSnackbar.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);

    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    fullRecipeAnalysis() {

        const recipe = this.state.fullRecipe.split(',');
        const data = {
            dishName: this.state.fullRecipeName,
            ingridents: recipe
        }

        api.post('/caloriesCounter/fullRecipe', data).then(result => {
            console.log(result);
            this.setState({
                ...this.state, fullRecipeNutritionAnalysis: result.data

            })
        }).catch(err => {
            console.log(err);
        })
    }

    individualIngridentAnalysis() {
        const data = {
            foodItem: this.state.ingrident
        }

        api.post('/caloriesCounter/individualFoodItem', data).then(result => {
            console.log(result.data);
            const val = result.data;

            if (val.calories === 0) {
                this.toSetErorrs('ingridentDataNotFound', 'Something went wrong.Please check the spelling of food item or check the serving size');
                return;
            }

            if (this.state.errors.ingridentDataNotFound !== "") {
                this.toSetErorrs('ingridentDataNotFound', '');
            }

            this.addNewRow({
                id: this.state.nutritionRow.length + 1,
                foodItem: this.state.ingrident,
                serving: val.totalWeight,
                totalCalories: val.calories,
                protein: val.totalNutrients.PROCNT === undefined ? 0 : parseFloat(val.totalNutrients.PROCNT.quantity).toPrecision(4),
                carbs: val.totalNutrients.CHOCDF === undefined ? 0 : parseFloat(val.totalNutrients.CHOCDF.quantity).toPrecision(4),
                fats: val.totalNutrients.FAT === undefined ? 0 : parseFloat(val.totalNutrients.FAT.quantity).toPrecision(4),
                sugar: val.totalNutrients.SUGAR === undefined ? 0 : parseFloat(val.totalNutrients.SUGAR.quantity).toPrecision(4)
            });
        }).catch(err => {
            console.log(err);
        })
    }

    addNewRow(data) {
        this.setState({
            ...this.state,
            nutritionRow: [
                ...this.state.nutritionRow, data
            ]
        })
    }

    toSetSelectedRowIds(rowIds) {
        this.setState({
            ...this.state,
            nutritionRowSelectedId: rowIds
        })
    }

    deleteSelectedRows() {
        const newRowsafterDeleting = this.state.nutritionRow.filter((row) => !this.state.nutritionRowSelectedId.includes(row.id));
        this.setState({
            ...this.state,
            nutritionRow: newRowsafterDeleting
        })
        console.log(newRowsafterDeleting);
    }

    toSetErorrs(errName, errMsg) {
        this.setState({
            ...this.state,
            errors: {
                ...this.state.errors,
                [errName]: errMsg
            }
        })
    }

    toSetSnackbar(val) {
        this.setState({
            ...this.state,
            openSnackbar: val
        })
    }

    handleCloseSnackbar(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.toSetSnackbar(false);
    };

    render() {
        return (
            <div className="calorieCounter-main-div">
                <h1>Calorie Counter</h1>
                <Content
                    ingrident={this.state.ingrident}
                    errors={this.state.errors}
                    handleChange={this.handleChange}
                    fullRecipeAnalysis={this.fullRecipeAnalysis}
                    individualIngridentAnalysis={this.individualIngridentAnalysis}
                    rows={this.state.nutritionRow}
                    columns={columns}
                    addNuritionRow={this.addNewRow}
                    nutritionRowSelectedId={this.state.nutritionRowSelectedId}
                    toSetSelectedRowIds={this.toSetSelectedRowIds}
                    deleteSelectedRows={this.deleteSelectedRows}
                    toSetErrors={this.toSetErorrs}
                    openSnackbar = {this.state.openSnackbar}
                    handleCloseSnackbar={this.handleCloseSnackbar}
                    toSetSnackbar = {this.toSetSnackbar}
                />
            </div>
        )
    }
}
