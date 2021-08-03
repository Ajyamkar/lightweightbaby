import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { totalMacroNutritionCol, totalMicroNutritionCol } from './Lists/TotalNutritionColumnList';
import { DataGrid } from '@material-ui/data-grid';
import PieChart from './Charts/PieChart';
import "./Content.css";


export default function TotalNutrientsOfWholeDay(props) {
    let sumOfTotalCalories = 0, sumOfTotalProtiens = 0, sumOfTotalCarbs = 0, sumOfFats = 0, sumOfSugar = 0, sumOfWater = 0;
    let sumOfSodium = 0, sumOfPotassium = 0, sumOfMagnesium = 0, sumOfCalcium = 0, sumOfIron = 0, sumOfZinc = 0, sumOfFolate = 0, sumOfVitaminB6 = 0, sumOfVitaminC = 0, sumOfVitaminD = 0;
    let ans = props.mealArr.map((meal, index) => {
        sumOfTotalCalories = Number(props.totalNutrients[meal].totalCalories === undefined ? 0 : props.totalNutrients[meal].totalCalories) + Number(sumOfTotalCalories);
        sumOfTotalProtiens = Number(props.totalNutrients[meal].protein === undefined ? 0 : props.totalNutrients[meal].protein) + Number(sumOfTotalProtiens);
        sumOfTotalCarbs = Number(props.totalNutrients[meal].carbs === undefined ? 0 : props.totalNutrients[meal].carbs) + Number(sumOfTotalCarbs);
        sumOfFats = Number(props.totalNutrients[meal].fats === undefined ? 0 : props.totalNutrients[meal].fats) + Number(sumOfFats);
        sumOfSugar = Number(props.totalNutrients[meal].sugar === undefined ? 0 : props.totalNutrients[meal].sugar) + Number(sumOfSugar);
        sumOfWater = Number(props.totalNutrients[meal].water === undefined ? 0 : props.totalNutrients[meal].water) + Number(sumOfWater);

        sumOfSodium = Number(props.totalNutrients[meal].sodium === undefined ? 0 : props.totalNutrients[meal].sodium) + Number(sumOfSodium);
        sumOfMagnesium = Number(props.totalNutrients[meal].magnesium === undefined ? 0 : props.totalNutrients[meal].magnesium) + Number(sumOfMagnesium);
        sumOfPotassium = Number(props.totalNutrients[meal].potassium === undefined ? 0 : props.totalNutrients[meal].potassium) + Number(sumOfPotassium);
        sumOfCalcium = Number(props.totalNutrients[meal].calcium === undefined ? 0 : props.totalNutrients[meal].calcium) + Number(sumOfCalcium);
        sumOfIron = Number(props.totalNutrients[meal].iron === undefined ? 0 : props.totalNutrients[meal].iron) + Number(sumOfIron);
        sumOfZinc = Number(props.totalNutrients[meal].zinc === undefined ? 0 : props.totalNutrients[meal].zinc) + Number(sumOfZinc);
        sumOfFolate = Number(props.totalNutrients[meal].folate === undefined ? 0 : props.totalNutrients[meal].folate) + Number(sumOfFolate);
        sumOfVitaminB6 = Number(props.totalNutrients[meal].vitaminB6 === undefined ? 0 : props.totalNutrients[meal].vitaminB6) + Number(sumOfVitaminB6);
        sumOfVitaminC = Number(props.totalNutrients[meal].vitaminC === undefined ? 0 : props.totalNutrients[meal].vitaminC) + Number(sumOfVitaminC);
        sumOfVitaminD = Number(props.totalNutrients[meal].vitaminD === undefined ? 0 : props.totalNutrients[meal].vitaminD) + Number(sumOfVitaminD);


        if (index === 4) {
            return {
                sumOfTotalCalories: sumOfTotalCalories,
                sumOfTotalProtiens: sumOfTotalProtiens,
                sumOfTotalCarbs: sumOfTotalCarbs,
                sumOfFats: sumOfFats,
                sumOfSugar: sumOfSugar,
                sunOfWater: sumOfWater,
                sumOfSodium: sumOfSodium,
                sumOfMagnesium: sumOfMagnesium,
                sumOfPotassium: sumOfPotassium,
                sumOfCalcium: sumOfCalcium,
                sumOfIron: sumOfIron,
                sumOfZinc: sumOfZinc,
                sumOfFolate: sumOfFolate,
                sumOfVitaminB6: sumOfVitaminB6,
                sumOfVitaminC: sumOfVitaminC,
                sumOfVitaminD: sumOfVitaminD
            };
        }
    });

    const totalMacroNutritionRow = [{
        id: 1,
        protein: sumOfTotalProtiens.toPrecision(4),
        carbs: sumOfTotalCarbs.toPrecision(4),
        fats: sumOfFats.toPrecision(4),
        sugar: sumOfSugar.toPrecision(4),
        water: sumOfWater.toPrecision(4),
    }]

    const totalMicroNutritionRow = [{
        id: 1,
        // cholesterol: props.totalNutrients.cholesterol === undefined ? 0 : props.totalNutrients.cholesterol,
        sodium: sumOfSodium.toPrecision(4),
        potassium: sumOfPotassium.toPrecision(4),
        magnesium: sumOfMagnesium.toPrecision(4),
        calcium: sumOfCalcium.toPrecision(4),
        zinc: sumOfZinc.toPrecision(4),
        iron: sumOfIron.toPrecision(4),
        folate: sumOfFolate.toPrecision(4),
        vitaminB6: sumOfVitaminB6.toPrecision(4),
        vitaminC: sumOfVitaminC.toPrecision(4),
        vitaminD: sumOfVitaminD.toPrecision(4),
    }]
    // console.log(props.totalNutrients);
    return (
        <div className="totalNutrientsOfWholeDay">
            <Accordion
                expanded={props.expandAccordian === "totalNutrients"}
                onChange={props.handleExpandAccordian("totalNutrients")}
                className={"Accordian"}
            >
                <AccordionSummary
                    expandIcon={props.expandAccordian === "totalNutrients" ? <RemoveIcon className='accordion-expandIcon' style={{ color: 'red' }} /> : <AddIcon className='accordion-expandIcon' fontSize='large' />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h1>Total analysis of all the meals</h1>
                </AccordionSummary>
                <AccordionDetails>
                    {/* <h2 className={"macronutritents-heading"} style={{ "color": "green" }}>Total calories consumed = {sumOfTotalCalories}kcal</h2> */}

                    {sumOfTotalCalories === 0 ?
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
                                totalCalories={sumOfTotalCalories}
                                pieChartName='Full analysis of nutrients'
                                macrosValues={[
                                    sumOfTotalProtiens.toPrecision(4),
                                    sumOfTotalCarbs.toPrecision(4),
                                    sumOfFats.toPrecision(4),
                                    sumOfSugar.toPrecision(4),
                                    // sumOfWater.toPrecision(4),
                                    // this.state.totalNutrientsForAMeals[meal].macroNutrients.water
                                ]}

                                microsValues={[
                                    sumOfSodium.toPrecision(4),
                                    sumOfPotassium.toPrecision(4),
                                    sumOfMagnesium.toPrecision(4),
                                    sumOfCalcium.toPrecision(4),
                                    sumOfZinc.toPrecision(4),
                                    sumOfIron.toPrecision(4),
                                    sumOfFolate.toPrecision(4),
                                    sumOfVitaminB6.toPrecision(4),
                                    sumOfVitaminC.toPrecision(4),
                                    sumOfVitaminD.toPrecision(4),
                                ]}
                            />
                        </div>
                    }


                </AccordionDetails>
            </Accordion>
        </div>
    )
}
