import React, { Component } from 'react';
import "./PreviousDataModal.css";
import bg from '../Images/pattern-background.png';
import api from '../../../Axios/axios';
import Cookies from 'universal-cookie';
import { sumOfMacronutrients, sumOfMicroNutrients } from '../getSumOfNutrientsFunction';
import { totalMacroNutritionCol, totalMicroNutritionCol } from '../Lists/TotalNutritionColumnList';

import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, IconButton } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { DataGrid } from '@material-ui/data-grid';
import Columns from '../Lists/NutritionColumnsList';

import { Pie } from 'react-chartjs-2';
import PieChart from '../Charts/PieChart';
import BarChart from '../Charts/BarChart';
import HorizontalGroupedBarChart from '../Charts/HorizontalGroupedBarChart';


const mealArr = ['Breakfast', 'MorningSnack', 'Lunch', 'EveningSnack', 'Dinner'];
const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
const paperStyle = {
    backgroundColor: '#fff',
    background: `url(${bg})`,
    // border: '2px solid #000',
    boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)',
    padding: '16px 16px ',
    width: '90vw',
    maxHeight: '90vh',
    overflow: 'auto'
}


export default class PreviousDataModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateChanged: false,
            openModal: false,
            selectedDate: new Date(),
            dataFound: false,
            showPrevious7DaysDataBarChart: false,
            nutritionRow: {},
            totalNutrientsForAMeals: {},
            totalNutrientsAnaylsisOfWholeDay: {},
            past7DaysPreviousData: []
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.showPast7DaysData = this.showPast7DaysData.bind(this);
    }

    handleOpen() {
        this.setState({
            ...this.state,
            openModal: true
        })
    };

    handleClose() {
        this.setState({
            ...this.state,
            openModal: false
        })
    };

    handleDateChange(date) {
        this.setState({
            ...this.state,
            dateChanged: true,
            selectedDate: date
        })
        const cookie = new Cookies();
        const token = cookie.get('token');

        api.post('/saveMealsData/getPreviousDataForSelectedDate', {
            token: token,
            selectedDate: date
        }).then(result => {
            if (result.data.length !== 0) {

                const breakfastNutritionData = {
                    microNutrients: sumOfMicroNutrients(result.data[0].allMealsData.Breakfast),
                    macroNutrients: sumOfMacronutrients(result.data[0].allMealsData.Breakfast)
                }

                const morningSnackNutritionData = {
                    microNutrients: sumOfMicroNutrients(result.data[0].allMealsData.MorningSnack),
                    macroNutrients: sumOfMacronutrients(result.data[0].allMealsData.MorningSnack),
                };
                const lunchNutritionData = {
                    microNutrients: sumOfMicroNutrients(result.data[0].allMealsData.Lunch),
                    macroNutrients: sumOfMacronutrients(result.data[0].allMealsData.Lunch)
                };
                const eveningsnackNutritionData = {
                    microNutrients: sumOfMicroNutrients(result.data[0].allMealsData.EveningSnack),
                    macroNutrients: sumOfMacronutrients(result.data[0].allMealsData.EveningSnack)
                };
                const dinnerNutritionData = {
                    microNutrients: sumOfMicroNutrients(result.data[0].allMealsData.Dinner),
                    macroNutrients: sumOfMacronutrients(result.data[0].allMealsData.Dinner)
                };

                const zeroMacros = {
                    totalCalories: 0,
                    protein: 0,
                    carbs: 0,
                    fats: 0,
                    sugar: 0,
                    water: 0
                }



                const zeroMicros = {
                    sodium: 0,
                    potassium: 0,
                    magnesium: 0,
                    calcium: 0,
                    iron: 0,
                    zinc: 0,
                    folate: 0,
                    vitaminB6: 0,
                    vitaminC: 0,
                    vitaminD: 0
                }

                const totalAnaylsisOfMacrosArr = [
                    breakfastNutritionData.macroNutrients === 0 ? zeroMacros : breakfastNutritionData.macroNutrients,
                    morningSnackNutritionData.macroNutrients === 0 ? zeroMacros : morningSnackNutritionData.macroNutrients,
                    lunchNutritionData.macroNutrients === 0 ? zeroMacros : lunchNutritionData.macroNutrients,
                    eveningsnackNutritionData.macroNutrients === 0 ? zeroMacros : eveningsnackNutritionData.macroNutrients,
                    dinnerNutritionData.macroNutrients === 0 ? zeroMacros : dinnerNutritionData.macroNutrients,
                ]

                const totalAnaylsisOfMicrosArr = [
                    breakfastNutritionData.microNutrients === 0 ? zeroMicros : breakfastNutritionData.microNutrients,
                    morningSnackNutritionData.microNutrients === 0 ? zeroMicros : morningSnackNutritionData.microNutrients,
                    lunchNutritionData.microNutrients === 0 ? zeroMicros : lunchNutritionData.microNutrients,
                    eveningsnackNutritionData.microNutrients === 0 ? zeroMicros : eveningsnackNutritionData.microNutrients,
                    dinnerNutritionData.microNutrients === 0 ? zeroMicros : dinnerNutritionData.microNutrients,
                ]

                this.setState({
                    ...this.state,
                    dataFound: true,
                    nutritionRow: result.data[0].allMealsData,
                    totalNutrientsForAMeals: {
                        Breakfast: breakfastNutritionData,
                        MorningSnack: morningSnackNutritionData,
                        Lunch: lunchNutritionData,
                        EveningSnack: eveningsnackNutritionData,
                        Dinner: dinnerNutritionData
                    },
                    totalNutrientsAnaylsisOfWholeDay: {
                        macroNutrients: sumOfMacronutrients(totalAnaylsisOfMacrosArr),
                        microNutrients: sumOfMicroNutrients(totalAnaylsisOfMicrosArr)
                    }
                })
            } else {
                this.setState({
                    ...this.state,
                    dataFound: false,
                    nutritionRow: {}
                })
            }
        }).catch(err => {
            window.location.href = '/login'
            console.log(err);
        })
    };

    showPast7DaysData() {
        const cookie = new Cookies();
        const token = cookie.get('token');

        if (this.state.showPrevious7DaysDataBarChart) {

            this.setState({
                ...this.state,
                showPrevious7DaysDataBarChart: false
            })
        } else {
            api.post('/saveMealsData/getLast7DaysData', { token: token }).then(result => {
                const previousDaysDataArr = result.data.data;


                let newDaysArr = [];
                previousDaysDataArr.map(days => {

                    let newDayWiseArr = [];
                    mealArr.map((meal, index) => {
                        newDayWiseArr.push(sumOfMacronutrients(days.allMealsData[meal]));//to get macros data for particular meal
                    })
                    newDaysArr.push({
                        date: days.date,
                        data: sumOfMacronutrients(newDayWiseArr)// to get macros data for particular day
                    });

                })
                console.log(newDaysArr);

                this.setState({
                    ...this.state,
                    past7DaysPreviousData: newDaysArr,
                    showPrevious7DaysDataBarChart: true
                })

                // newDaysArr.map(days=>{
                //     console.log({
                //         date:days.date,
                //         data:sumOfMacronutrients(days.data)
                //     });
                // })


            }).catch(err => {
                console.log(err);
            })
        }
    }

    render() {
        let previous7DaysDatelabels = [];
        let previous7DaysCaloriesData = [];
        let previous7DaysProteinsData = [];
        let previous7DaysCarbsData = [];
        let previous7DaysFatsData = [];
        let previous7DaysSugarData = [];
        this.state.past7DaysPreviousData.map(data => {
            previous7DaysDatelabels.push(data.date.toString().slice(8,10)+"-"+data.date.toString().slice(5,7)+"-"+data.date.toString().slice(0,4));
            previous7DaysCaloriesData.push(data.data.totalCalories);
            previous7DaysProteinsData.push(data.data.protein);
            previous7DaysCarbsData.push(data.data.carbs);
            previous7DaysFatsData.push(data.data.fats);
            previous7DaysSugarData.push(data.data.sugar);
        })

        return (
            <div className={'previousDataModal-main-div'}>
                <Button onClick={this.handleOpen} className={'previous-data-btn'}>
                    Show Previous Data
                </Button>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    style={modalStyle}
                    classes={{ root: 'modal' }}
                    open={this.state.openModal}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.openModal}>
                        <div style={paperStyle} classes={'paper'}>

                            <IconButton color="secondary" classes={{ root: 'close-btn' }} onClick={this.handleClose}>
                                <CloseIcon fontSize='large' />
                            </IconButton>



                            <div className='paper-content-div'>
                                <h1 style={{ textAlign: 'center', color: 'seagreen' }} id="transition-modal-title">History</h1>

                                <div className='showPrevious7Days-btn-div'>
                                    <Button className='showPrevious7Days-btn' onClick={this.showPast7DaysData}>
                                        {this.state.showPrevious7DaysDataBarChart ? 'Hide' : 'Show'} Past 7 days data
                                    </Button>
                                </div>

                                {this.state.showPrevious7DaysDataBarChart ?
                                    <div className='charts-div'>
                                        <BarChart
                                            labels={previous7DaysDatelabels}
                                            data={previous7DaysCaloriesData}
                                        />
                                        <HorizontalGroupedBarChart
                                            labels={previous7DaysDatelabels}
                                            protein={previous7DaysProteinsData}
                                            carbs={previous7DaysCarbsData}
                                            fats={previous7DaysFatsData}
                                            sugar={previous7DaysSugarData}
                                        />
                                    </div>
                                    :
                                    null}


                                <div style={{ textAlign: 'center' }} >
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Select the date"
                                            format="dd/MM/yyyy"
                                            value={this.state.selectedDate}
                                            onChange={this.handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>


                                {this.state.dataFound ?
                                    <div className='data-found-div'>
                                        {mealArr.map((meal, index) => {
                                            return <div key={index} className={"previousData-table-main-div"}>

                                                <div className={"previousData-table-title-div"}>
                                                    {meal === 'MorningSnack' || meal === 'EveningSnack' ?
                                                        meal === "MorningSnack" ?
                                                            <h1>Morning Snack</h1> :
                                                            <h1>Evening Snack</h1>
                                                        :
                                                        <h1>{meal}</h1>
                                                    }
                                                </div>
                                                <DataGrid
                                                    rows={this.state.nutritionRow[meal]}
                                                    columns={Columns}
                                                    hideFooterPagination
                                                    hideFooterSelectedRowCount
                                                    hideFooter
                                                    autoHeight
                                                />

                                                {this.state.totalNutrientsForAMeals[meal].macroNutrients === 0 ?
                                                    null :
                                                    <PieChart
                                                        totalCalories={this.state.totalNutrientsForAMeals[meal].macroNutrients.totalCalories}
                                                        // macroNutirentsLabels={['protein(g)', 'carbs(g)', 'fats(g)', 'sugar(g)']}
                                                        pieChartName={`macro nutrients pie chart for ${meal}`}
                                                        macrosValues={[
                                                            this.state.totalNutrientsForAMeals[meal].macroNutrients.protein,
                                                            this.state.totalNutrientsForAMeals[meal].macroNutrients.carbs,
                                                            this.state.totalNutrientsForAMeals[meal].macroNutrients.fats,
                                                            this.state.totalNutrientsForAMeals[meal].macroNutrients.sugar,
                                                            // this.state.totalNutrientsForAMeals[meal].macroNutrients.water
                                                        ]}

                                                        // microNutrientsLabels={['sodium(mg)', 'potassium(mg)', 'magnesium(mg)', 'calcium(mg)', 'iron(mg)', ' zinc(mg)', 'folate(µg)', 'vitaminB6(mg)', ' vitaminC(mg)', 'vitaminD(µg)']}
                                                        microsValues={[
                                                            this.state.totalNutrientsForAMeals[meal].microNutrients.sodium,
                                                            this.state.totalNutrientsForAMeals[meal].microNutrients.potassium,
                                                            this.state.totalNutrientsForAMeals[meal].microNutrients.magnesium,
                                                            this.state.totalNutrientsForAMeals[meal].microNutrients.calcium,
                                                            this.state.totalNutrientsForAMeals[meal].microNutrients.iron,
                                                            this.state.totalNutrientsForAMeals[meal].microNutrients.zinc,
                                                            this.state.totalNutrientsForAMeals[meal].microNutrients.folate,
                                                            this.state.totalNutrientsForAMeals[meal].microNutrients.vitaminB6,
                                                            this.state.totalNutrientsForAMeals[meal].microNutrients.vitaminC,
                                                            this.state.totalNutrientsForAMeals[meal].microNutrients.vitaminD,
                                                        ]}
                                                    />
                                                }
                                            </div>
                                        })}

                                        <h1 style={{ textAlign: 'center' }}>Full anaylsis Of Nutritents</h1>
                                        <div style={{ margin: '2vh 0' }}>
                                            <h2 className={"macro-full-anaylsis-heading"}>Macro Nutritents</h2>
                                            <DataGrid
                                                rows={[
                                                    {
                                                        id: 1,
                                                        protein: this.state.totalNutrientsAnaylsisOfWholeDay.macroNutrients.protein,
                                                        carbs: this.state.totalNutrientsAnaylsisOfWholeDay.macroNutrients.carbs,
                                                        fats: this.state.totalNutrientsAnaylsisOfWholeDay.macroNutrients.fats,
                                                        sugar: this.state.totalNutrientsAnaylsisOfWholeDay.macroNutrients.sugar,
                                                        water: this.state.totalNutrientsAnaylsisOfWholeDay.macroNutrients.water

                                                    }
                                                ]}
                                                columns={totalMacroNutritionCol}
                                                hideFooterPagination
                                                hideFooterSelectedRowCount
                                                hideFooter
                                                autoHeight
                                            />
                                        </div>

                                        <div style={{ margin: '2vh 0' }}>
                                            <h2 className={"macro-full-anaylsis-heading"}>Micro Nutritents</h2>
                                            <DataGrid
                                                rows={[{
                                                    id: 1,
                                                    sodium: this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.sodium,
                                                    potassium: this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.potassium,
                                                    magnesium: this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.magnesium,
                                                    calcium: this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.calcium,
                                                    iron: this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.iron,
                                                    zinc: this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.zinc,
                                                    folate: this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.folate,
                                                    vitaminB6: this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.vitaminB6,
                                                    vitaminC: this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.vitaminC,
                                                    vitaminD: this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.vitaminD,
                                                }]}
                                                columns={totalMicroNutritionCol}
                                                hideFooterPagination
                                                hideFooterSelectedRowCount
                                                hideFooter
                                                autoHeight
                                            />
                                        </div>
                                        <PieChart
                                            totalCalories={this.state.totalNutrientsAnaylsisOfWholeDay.macroNutrients.totalCalories}
                                            // macroNutirentsLabels={['protein(g)', 'carbs(g)', 'fats(g)', 'sugar(g)']}
                                            pieChartName='macro nutrients pie for lunch'
                                            macrosValues={[
                                                this.state.totalNutrientsAnaylsisOfWholeDay.macroNutrients.protein,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.macroNutrients.carbs,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.macroNutrients.fats,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.macroNutrients.sugar,
                                                // this.state.totalNutrientsForAMeals[meal].macroNutrients.water
                                            ]}

                                            // microNutrientsLabels={['sodium(mg)', 'potassium(mg)', 'magnesium(mg)', 'calcium(mg)', 'iron(mg)', ' zinc(mg)', 'folate(µg)', 'vitaminB6(mg)', ' vitaminC(mg)', 'vitaminD(µg)']}
                                            microsValues={[
                                                this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.sodium,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.potassium,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.magnesium,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.calcium,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.iron,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.zinc,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.folate,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.vitaminB6,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.vitaminC,
                                                this.state.totalNutrientsAnaylsisOfWholeDay.microNutrients.vitaminD,
                                            ]}
                                        />

                                    </div>


                                    :
                                    this.state.dateChanged ? <p className="dataNotFound-p">Data not found for above date</p> : null
                                }
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        )
    }
}
