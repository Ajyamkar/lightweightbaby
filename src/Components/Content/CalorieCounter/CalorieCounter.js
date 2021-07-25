import React, { Component } from 'react';
import "./Content.css";
import api from "../../Axios/axios";
import Content from './Content';
import Columns from './Lists/NutritionColumnsList';
import Cookies from 'universal-cookie';
import { Accordion, AccordionSummary, AccordionDetails, Button, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import NutritionBasic from './NutritionBasic';
import TotalNutrientsOfWholeDay from './TotalNutrientsOfWholeDay';


const mealArr = ['Breakfast', 'MorningSnack', 'Lunch', 'EveningSnack', 'Dinner'];

export default class CalorieCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                Breakfast: "",
                Lunch: "",
                Dinner: "",
                MorningSnack: "",
                EveningSnack: "",
                ingridentDataNotFound: ""
            },
            openSnackbar: false,
            expandAccordian: false,
            fullRecipeName: "",
            fullRecipe: "",
            fullRecipeNutritionAnalysis: {},
            Breakfast: "",
            Lunch: "",
            Dinner: "",
            MorningSnack: "",
            EveningSnack: "",
            nutritionRow: {
                Breakfast: [],
                MorningSnack: [],
                Lunch: [],
                EveningSnack: [],
                Dinner: [],
            },
            nutritionRowSelectedId: {
                Breakfast: [],
                MorningSnack: [],
                Lunch: [],
                EveningSnack: [],
                Dinner: [],
            },
            totalNutrientsForAMeal: {
                Breakfast: {},
                MorningSnack: {},
                Lunch: {},
                EveningSnack: {},
                Dinner: {}
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.fullRecipeAnalysis = this.fullRecipeAnalysis.bind(this);
        this.individualIngridentAnalysis = this.individualIngridentAnalysis.bind(this);
        this.sumOfIndividualNutrientsForAMeal = this.sumOfIndividualNutrientsForAMeal.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.toSetSelectedRowIds = this.toSetSelectedRowIds.bind(this);
        this.deleteSelectedRows = this.deleteSelectedRows.bind(this);
        this.toSetErorrs = this.toSetErorrs.bind(this);
        this.toSetSnackbar = this.toSetSnackbar.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
        this.handleExpandAccordian = this.handleExpandAccordian.bind(this);
        this.saveMealData = this.saveMealData.bind(this);
    }

    componentDidMount() {
        const cookie = new Cookies();
        console.log(cookie.get('token'));

        api.post('/saveMealsData/getSavedMealsData', {
            token: cookie.get('token')
        }).then(data => {
            console.log(data);

            this.setState({
                ...this.state,
                nutritionRow: data.data
            })

            mealArr.map(meal => {
                this.sumOfIndividualNutrientsForAMeal(this.state.nutritionRow, meal, false);
            })

        }).catch(err => {
            console.log(err);
        })
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

    individualIngridentAnalysis(meal) {
        const data = {
            foodItem: this.state[meal]
        }

        api.post('/caloriesCounter/individualFoodItem', data).then(result => {
            const val = result.data;

            if (val.calories === 0) {
                this.toSetErorrs('ingridentDataNotFound', 'Something went wrong.Please check the spelling of food item or check the serving size');
                return;
            }

            if (this.state.errors.ingridentDataNotFound !== "") {
                this.toSetErorrs('ingridentDataNotFound', '');
            }

            // console.log(this.state.nutritionRow[meal].length);
            // console.log(this.state)
            this.addNewRow({
                id: this.state.nutritionRow[meal].length + 1,
                foodItem: this.state[meal],
                serving: val.totalWeight,
                totalCalories: val.calories,
                protein: val.totalNutrients.PROCNT === undefined || val.totalNutrients.PROCNT === 0 ? 0 : parseFloat(val.totalNutrients.PROCNT.quantity).toPrecision(4),
                carbs: val.totalNutrients.CHOCDF === undefined || val.totalNutrients.CHOCDF === 0 ? 0 : parseFloat(val.totalNutrients.CHOCDF.quantity).toPrecision(4),
                fats: val.totalNutrients.FAT === undefined || val.totalNutrients.FAT === 0 ? 0 : parseFloat(val.totalNutrients.FAT.quantity).toPrecision(4),
                sugar: val.totalNutrients.SUGAR === undefined || val.totalNutrients.SUGAR === 0 ? 0 : parseFloat(val.totalNutrients.SUGAR.quantity).toPrecision(4),

                cholesterol: (val.totalNutrients.CHOLE === undefined || val.totalNutrients.CHOLE === 0) ? 0 : parseFloat(val.totalNutrients.CHOLE.quantity).toPrecision(4),
                sodium: val.totalNutrients.NA === undefined || val.totalNutrients.NA === 0 ? 0 : parseFloat(val.totalNutrients.NA.quantity).toPrecision(4),
                potassium: val.totalNutrients.K === undefined || val.totalNutrients.K === 0 ? 0 : parseFloat(val.totalNutrients.K.quantity).toPrecision(4),
                magnesium: val.totalNutrients.MG === undefined || val.totalNutrients.MG === 0 ? 0 : parseFloat(val.totalNutrients.MG.quantity).toPrecision(4),
                calcium: val.totalNutrients.CA === undefined || val.totalNutrients.CA === 0 ? 0 : parseFloat(val.totalNutrients.CA.quantity).toPrecision(4),
                zinc: val.totalNutrients.ZN === undefined || val.totalNutrients.ZN === 0 ? 0 : parseFloat(val.totalNutrients.ZN.quantity).toPrecision(4),
                iron: val.totalNutrients.FE === undefined || val.totalNutrients.FE === 0 ? 0 : parseFloat(val.totalNutrients.FE.quantity).toPrecision(4),
                folate: val.totalNutrients.FOLFD === undefined || val.totalNutrients.FOLFD === 0 ? 0 : parseFloat(val.totalNutrients.FOLFD.quantity).toPrecision(4),
                vitaminB6: val.totalNutrients.VITB6A === undefined || val.totalNutrients.VITB6A === 0 ? 0 : parseFloat(val.totalNutrients.VITB6A.quantity).toPrecision(4),
                vitaminC: val.totalNutrients.VITC === undefined || val.totalNutrients.VITC === 0 ? 0 : parseFloat(val.totalNutrients.VITC.quantity).toPrecision(4),
                vitaminD: val.totalNutrients.VITD === undefined || val.totalNutrients.VITD === 0 ? 0 : parseFloat(val.totalNutrients.VITD.quantity).toPrecision(4),
                water: val.totalNutrients.WATER === undefined || val.totalNutrients.WATER === 0 ? 0 : parseFloat(val.totalNutrients.WATER.quantity).toPrecision(4),
            }, meal);

            this.setState({
                ...this.state,
                [meal]: ''
            })
            this.sumOfIndividualNutrientsForAMeal(this.state.nutritionRow, meal, false);


        }).catch(err => {
            console.log(err);
        })
    }

    addNewRow(data, meal) {
        this.setState({
            ...this.state,
            nutritionRow: {
                ...this.state.nutritionRow,
                [meal]: [
                    ...this.state.nutritionRow[meal], data
                ]
            }
        })
    }

    sumOfIndividualNutrientsForAMeal(nutritionRow, meal, afterDeleting) {
        let protein = 0, carbs = 0, calories = 0, fats = 0, sugar = 0;
        let cholesterol = 0, sodium = 0, potassium = 0, magnesium = 0, calcium = 0, iron = 0, zinc = 0, folate = 0, vitaminB6 = 0, vitaminC = 0, vitaminD = 0, water = 0;
        if (afterDeleting) {
            nutritionRow.map(nutrients => {
                protein = protein + parseFloat(nutrients.protein);
                carbs = carbs + parseFloat(nutrients.carbs);
                calories = calories + parseFloat(nutrients.totalCalories);
                fats = fats + parseFloat(nutrients.fats);
                sugar = sugar + parseFloat(nutrients.sugar);

                cholesterol = cholesterol + parseFloat(nutrients.cholesterol);
                sodium = sodium + parseFloat(nutrients.sodium);
                potassium = potassium + parseFloat(nutrients.potassium);
                calcium = calcium + parseFloat(nutrients.calcium);
                magnesium = magnesium + parseFloat(nutrients.magnesium);
                iron = iron + parseFloat(nutrients.iron);
                zinc = zinc + parseFloat(nutrients.zinc);
                folate = folate + parseFloat(nutrients.folate);
                vitaminB6 = vitaminB6 + parseFloat(nutrients.vitaminB6);
                vitaminC = vitaminC + parseFloat(nutrients.vitaminC);
                vitaminD = vitaminD + parseFloat(nutrients.vitaminD);
                water = water + parseFloat(nutrients.water);

            });
        } else {
            nutritionRow[meal].map(nutrients => {
                protein = protein + parseFloat(nutrients.protein);
                carbs = carbs + parseFloat(nutrients.carbs);
                calories = calories + parseFloat(nutrients.totalCalories);
                fats = fats + parseFloat(nutrients.fats);
                sugar = sugar + parseFloat(nutrients.sugar);

                cholesterol = cholesterol + parseFloat(nutrients.cholesterol);
                sodium = sodium + parseFloat(nutrients.sodium);
                potassium = potassium + parseFloat(nutrients.potassium);
                calcium = calcium + parseFloat(nutrients.calcium);
                magnesium = magnesium + parseFloat(nutrients.magnesium);
                iron = iron + parseFloat(nutrients.iron);
                zinc = zinc + parseFloat(nutrients.zinc);
                folate = folate + parseFloat(nutrients.folate);
                vitaminB6 = vitaminB6 + parseFloat(nutrients.vitaminB6);
                vitaminC = vitaminC + parseFloat(nutrients.vitaminC);
                vitaminD = vitaminD + parseFloat(nutrients.vitaminD);
                water = water + parseFloat(nutrients.water);
            });
        }

        setTimeout(() => {
            this.setState({
                ...this.state,
                totalNutrientsForAMeal: {
                    ...this.state.totalNutrientsForAMeal,
                    [meal]: {
                        totalCalories: calories.toPrecision(4),
                        protein: protein.toPrecision(4),
                        carbs: carbs.toPrecision(4),
                        fats: fats.toPrecision(4),
                        sugar: sugar.toPrecision(4),
                        cholesterol: cholesterol.toPrecision(4),
                        sodium: sodium.toPrecision(4),
                        potassium: potassium.toPrecision(4),
                        magnesium: magnesium.toPrecision(4),
                        calcium: calcium.toPrecision(4),
                        iron: iron.toPrecision(4),
                        zinc: zinc.toPrecision(4),
                        folate: folate.toPrecision(4),
                        vitaminB6: vitaminB6.toPrecision(4),
                        vitaminC: vitaminC.toPrecision(4),
                        vitaminD: vitaminD.toPrecision(4),
                        water: water.toPrecision(4)
                    }
                }
            })

            // console.log("protein=" + protein);
            // console.log("cal=" + calories);
            // console.log("carbs=" + carbs);
            // console.log("fats=" + fats);
            // console.log("sugar=" + sugar);
            // console.log(this.state.totalNutrientsForAMeal);
        }, 1000)


    }

    toSetSelectedRowIds(rowIds, meal) {
        this.setState({
            ...this.state,
            nutritionRowSelectedId: {
                ...this.state.nutritionRowSelectedId,
                [meal]: rowIds
            }

        })
    }

    deleteSelectedRows(meal) {
        const newRowsafterDeleting = this.state.nutritionRow[meal].filter((row) => !this.state.nutritionRowSelectedId[meal].includes(row.id));
        this.setState({
            ...this.state,
            nutritionRow: {
                ...this.state.nutritionRow,
                [meal]: newRowsafterDeleting
            }

        })
        console.log(newRowsafterDeleting.length);
        this.sumOfIndividualNutrientsForAMeal(newRowsafterDeleting, meal, true);

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

    handleExpandAccordian(meal) {
        return function (event, isExpanded) {
            this.setState({
                ...this.state,
                expandAccordian: isExpanded ? meal : false
            })
        }.bind(this);
    }

    saveMealData() {
        const cookie = new Cookies();
        const token = cookie.get('token');

        api.post('/saveMealsData/', {
            token: token,
            allMealsData: this.state.nutritionRow
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })

        // api.post('/auth/me',{
        //     token:token
        // }).then(result=>{
        //     res.data.data.
        // })
    }

    render() {

        return (
            <div className="calorieCounter-main-div">
                <h1 className="top-heading">Calorie Counter</h1>

                {mealArr.map((meal, index) => {
                    return <Accordion
                        key={index}
                        expanded={this.state.expandAccordian === meal}
                        onChange={this.handleExpandAccordian(meal)}
                        className={"Accordian"}
                    >
                        <AccordionSummary
                            expandIcon={this.state.expandAccordian === meal ? <RemoveIcon className='accordion-expandIcon' style={{ color: 'red' }} /> : <AddIcon className='accordion-expandIcon' fontSize='large' />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            {meal === 'MorningSnack' || meal === 'EveningSnack' ?
                                meal === "MorningSnack" ?
                                    <h1>Morning Snack</h1> :
                                    <h1>Evening Snack</h1>
                                :
                                <h1>{meal}</h1>
                            }
                        </AccordionSummary>
                        <AccordionDetails>
                            <Content
                                key={index}
                                index={index}
                                mealName={meal}
                                ingrident={this.state[meal]}
                                errors={this.state.errors}
                                handleChange={this.handleChange}
                                fullRecipeAnalysis={this.fullRecipeAnalysis}
                                individualIngridentAnalysis={this.individualIngridentAnalysis}
                                rows={this.state.nutritionRow[meal]}
                                columns={Columns}
                                addNuritionRow={this.addNewRow}
                                nutritionRowSelectedId={this.state.nutritionRowSelectedId[meal]}
                                toSetSelectedRowIds={this.toSetSelectedRowIds}
                                deleteSelectedRows={this.deleteSelectedRows}
                                toSetErrors={this.toSetErorrs}
                                openSnackbar={this.state.openSnackbar}
                                handleCloseSnackbar={this.handleCloseSnackbar}
                                toSetSnackbar={this.toSetSnackbar}
                                totalNutrients={this.state.totalNutrientsForAMeal[meal]}
                            />
                        </AccordionDetails>
                    </Accordion>

                })}

                {/* <Accordion
                    expanded={this.state.expandAccordian === "totalNutrients"}
                    onChange={this.handleExpandAccordian("totalNutrients")}
                    className={"Accordian"}
                >
                    <AccordionSummary
                        expandIcon={this.state.expandAccordian === "totalNutrients" ? <RemoveIcon className='accordion-expandIcon' style={{ color: 'red' }} /> : <AddIcon className='accordion-expandIcon' fontSize='large' />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <h1>ALL Meals Nutritents</h1>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h2>Total calories consumed = {sum} </h2>
                    </AccordionDetails>
                </Accordion> */}

                <TotalNutrientsOfWholeDay
                    expandAccordian={this.state.expandAccordian}
                    handleExpandAccordian={this.handleExpandAccordian}
                    totalNutrients={this.state.totalNutrientsForAMeal}
                    mealArr={mealArr}
                />

                <div style={{textAlign:'center'}}>
                    <Button className={'save-meal-data-btn'} onClick={this.saveMealData}> Save Meal Data</Button>
                </div>

                <NutritionBasic />

            </div>
        )
    }
}
