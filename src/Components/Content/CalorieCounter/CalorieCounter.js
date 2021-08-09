import React, { Component } from 'react';
import "./Content.css";
import api from "../../Axios/axios";
import Content from './Content';
import Columns from './Lists/NutritionColumnsList';
import Cookies from 'universal-cookie';
import { Accordion, AccordionSummary, AccordionDetails, Button, Grid, Snackbar, RadioGroup, Radio, FormControlLabel, Tooltip, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import NutritionBasic from './NutritionBasic';
import TotalNutrientsOfWholeDay from './TotalNutrientsOfWholeDay';
import Alert from '@material-ui/lab/Alert';
import PreviousDataModal from './PreviousDataModal/PreviousDataModal';


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
                ingridentDataNotFound: "",
                unableToSaveMealData: false
            },
            maintenanceCalories: 0,
            wantToLoseOrGainWeight: "",
            onAMission: 'toMaintainWeight',
            cuurentChallengeDay: 0,
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
            },
            caloriesRequiredToBeConsumedForAMeal: {
                Breakfast: 0,
                MorningSnack: 0,
                Lunch: 0,
                EveningSnack: 0,
                Dinner: 0
            },
            showFeedbackForSavingData: false
        }

        this.changeMaintenanceCalories = this.changeMaintenanceCalories.bind(this);
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
        console.log(this.props);
        const cookie = new Cookies();
        const userCredintials = this.props.userCredintials;
        const fitnessCondition = userCredintials.fitnessCondition
        let activityLevelValue = 0;

        if (fitnessCondition === 'Not Active') {
            activityLevelValue = 1.3;
        } else if (fitnessCondition === 'Active') {
            activityLevelValue = 1.5;
        } else {
            activityLevelValue = 1.7;
        }
        const BMR = ((userCredintials.currentWeight * 10) + (6.25 * userCredintials.height) - (5 * userCredintials.age) +
            (userCredintials.gender === 'male' ? 5 : 161));

        let maintenanceCalories = Math.round(BMR * activityLevelValue);
        let onAMission = 'toMaintainWeight';
        let dayDifference = 0;

        if (this.props.userCredintials.wantToLoseOrGainWeight !== undefined) {

            const date1 = new Date();
            const date2 = new Date(this.props.userCredintials.wantToLoseOrGainWeight.changedAt);

            dayDifference = Math.ceil((Math.abs(date1 - date2)) / (1000 * 60 * 60 * 24));

            if (this.props.userCredintials.wantToLoseOrGainWeight.lose && dayDifference <= 30) {
                maintenanceCalories = maintenanceCalories - 500;
                onAMission = 'toLoseWeight';
            } else if (this.props.userCredintials.wantToLoseOrGainWeight.gain && dayDifference <= 30) {
                maintenanceCalories = maintenanceCalories + 500;
                onAMission = 'toGainWeight';
            }
        }

        this.setState({
            ...this.state,
            onAMission: onAMission,
            maintenanceCalories: maintenanceCalories,
            cuurentChallengeDay: dayDifference,
            caloriesRequiredToBeConsumedForAMeal: {
                Breakfast: maintenanceCalories * 0.2, //20% of calories required for breakfast
                MorningSnack: maintenanceCalories * 0.05, //5% of calories required for morning Snacks & evening snacks
                Lunch: maintenanceCalories * 0.35, //35% of calories required for lunch & dinner
                EveningSnack: maintenanceCalories * 0.05,
                Dinner: maintenanceCalories * 0.35
            }
        })

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

        this.saveMealData();
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
        this.saveMealData();
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
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    unableToSaveMealData: false
                },
                showFeedbackForSavingData: true
            })
            console.log(result);

            setTimeout(() => {
                this.setState({
                    ...this.state,
                    showFeedbackForSavingData: false
                })
            }, 3000)
        }).catch(err => {
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    unableToSaveMealData: true
                },
                showFeedbackForSavingData: true
            })
            console.log(err);
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    showFeedbackForSavingData: false
                })
            }, 3000)
        })

    }

    changeMaintenanceCalories() {

        const cookie = new Cookies();
        let maintenanceCalories = this.state.maintenanceCalories;
        let onAMission = 'toMaintainWeight';
        if (this.state.wantToLoseOrGainWeight === "lose") {
            maintenanceCalories = maintenanceCalories - 500;
            onAMission = 'toLoseWeight';
        } else if (this.state.wantToLoseOrGainWeight === "gain") {
            maintenanceCalories = maintenanceCalories + 500;
            onAMission = 'toGainWeight';
        }


        this.setState({
            ...this.state,
            onAMission: onAMission,
            maintenanceCalories: maintenanceCalories,
            cuurentChallengeDay: 0,
            caloriesRequiredToBeConsumedForAMeal: {
                Breakfast: maintenanceCalories * 0.2, //20% of calories required for breakfast
                MorningSnack: maintenanceCalories * 0.05, //5% of calories required for morning Snacks & evening snacks
                Lunch: maintenanceCalories * 0.35, //35% of calories required for lunch & dinner
                EveningSnack: maintenanceCalories * 0.05,
                Dinner: maintenanceCalories * 0.35
            }
        })

        api.post('/caloriesCounter/changeMaintenanceCalories', {
            token: cookie.get('token'),
            wantToLoseOrGainWeight: this.state.wantToLoseOrGainWeight
        }).catch(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })

    }

    render() {

        return (
            <div className="calorieCounter-main-div">
                {this.state.onAMission !== "toMaintainWeight" ?
                    <div>
                        <h1 style={{ textAlign: 'center', fontSize: '3.5rem' }}>Day {this.state.cuurentChallengeDay}</h1>
                        {/* <p style={{ color: 'red', textAlign: "center", fontStyle: 'italic', fontSize: '0.7rem' }}>You have accepted the challenge  {this.state.onAMission === "toGainWeight" ? " to Gain weight " : " to Lose weight "} for 30 days</p> */}
                    </div>
                    : null
                }

                <h1 className="top-heading" style={{ marginBottom: '0' }}>Calorie Counter</h1>
                <h2 className='mainteneanceCalories-h2'>
                    Total Calories required for you
                    {this.state.onAMission === 'toMaintainWeight' ? " to maintain weight " :
                        this.state.onAMission === "toGainWeight" ? " to gain weight " : " to lose weight "}
                    is <strong style={{ color: 'red' }}>{this.state.maintenanceCalories}kcal</strong>.
                </h2>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2vh 0' }}>
                    {this.state.onAMission === "toMaintainWeight" ?
                        <Accordion
                            expanded={this.state.expandAccordian === 'onAmission'}
                            onChange={this.handleExpandAccordian("onAmission")}
                        >
                            <AccordionSummary
                                expandIcon={this.state.expandAccordian === 'onAmission' ? <RemoveIcon className='accordion-expandIcon' style={{ color: 'red' }} /> : <AddIcon className='accordion-expandIcon' fontSize='large' />}
                                aria-controls="onAmission-content"
                                id="onAmission-header"
                            >
                                <h1 style={{ paddingRight: '2vw' }}>Take a challenge</h1>
                            </AccordionSummary>
                            <AccordionDetails style={{ textAlign: 'center', display: 'block' }}>
                                <RadioGroup value={this.state.wantToLoseOrGainWeight} name='wantToLoseOrGainWeight' onChange={this.handleChange}>
                                    <FormControlLabel value="lose" control={<Radio />} label="To lose weight" />
                                    <FormControlLabel value="gain" control={<Radio />} label="To gain weight" />
                                    <FormControlLabel value="maintain" control={<Radio />} label="Maintain the same weight" />
                                </RadioGroup>
                                <Button style={{ backgroundColor: 'seagreen', color: 'white', padding: '6px 20px', marginTop: '2vh' }} onClick={this.changeMaintenanceCalories}>Save the changes</Button>
                            </AccordionDetails>
                        </Accordion>
                        :
                        null
                    }
                </div>
                
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
                                caloriesRequiredToBeConsumedForAMeal={this.state.caloriesRequiredToBeConsumedForAMeal[meal]}
                            />
                        </AccordionDetails>
                    </Accordion>

                })}


                <TotalNutrientsOfWholeDay
                    expandAccordian={this.state.expandAccordian}
                    handleExpandAccordian={this.handleExpandAccordian}
                    totalNutrients={this.state.totalNutrientsForAMeal}
                    mealArr={mealArr}
                />

                <div className={'save-and-showprevious-mealdata-btngrp-div'}>
                    {/* <Button style={{background:'black'}} className={'save-meal-data-btn'}>Show Previous Data</Button> */}
                    <PreviousDataModal />
                    <Button className={'save-meal-data-btn'} onClick={this.saveMealData}> Save Meal Data</Button>
                    <Snackbar open={this.state.showFeedbackForSavingData ? true : false} autoHideDuration={2000}>
                        {this.state.errors.unableToSaveMealData ?
                            <Alert variant="filled" severity="error">
                                Unable to save data. Session expired please refresh the page.
                            </Alert>
                            :
                            <Alert variant="filled" severity="success">
                                Saved successfully
                            </Alert>}
                    </Snackbar>
                </div>

                <NutritionBasic />

            </div>
        )
    }
}
