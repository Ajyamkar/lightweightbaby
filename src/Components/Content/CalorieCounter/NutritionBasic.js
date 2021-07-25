import React from 'react';
import "./NutritionBasic.css";
import MacroDefination from './Lists/MacroDefinationList';
import { Grid, Box, Container } from '@material-ui/core';

export default function NutritionBasic() {
    return (
        <div className="NutritionBasic-main-div">
            <h1 className="heading-h1">Basics of Nutrition</h1>
            <div>
                <p>Nutrients can be divided into two categories: macronutrients, and micronutrients.</p>
                <p> <strong className="initials">M</strong>acronutrients are those nutrients that the body needs in large amounts.
                    These provide the body with energy (calories).Macronutrients are <a href="#Fats">fats</a>, <a href="#Carbohydrates">carbohydrates</a>, <a href="#Proteins">proteins</a>, and water.
                    Aside from water, every macronutrient provides energy that helps the body to:
                    <Grid container alignItems='center' style={{ margin: "1vh" }} >
                        <Grid item xs={12} sm={6}>
                            <img alt="intro-img" className="intro-img" src="https://www.health-si.com/wp-content/uploads/2018/05/Macronutrients-Micronutrients-.jpg" />
                        </Grid>
                        <Grid item xs={12} sm={6} className="advantagesofmacro-div">
                            <ul>
                                <li>Develop and repair new tissues.</li>
                                <li>They aid in the production of enzymes, hormones, and proteins that are critical to body and brain function, and help with the regulation of metabolism, heartbeat, and bone density, among other processes."</li>
                                <li>Regulate vital bodily processes, like fueling muscles, regulating the central nervous system, creating enzymes, eliminating waste, and much more.</li>
                            </ul>
                        </Grid>
                    </Grid>
                </p>
                <p>That’s not to say you should pile on unhealthy carbs, fat, and protein. Quality is important in every aspect of nutrition, and macros are no different. A donut, for example, is loaded with carbs and fat—but it’s completely void of nutritional value. </p>

                <Grid container style={{ margin: "2vh 0" }}>
                    <p >
                        Tracking macros—specifically, measuring the ratio of protein, carbs, and fat consumed—is an increasingly popular nutrition trend in the fitness community, geared to help reach specific body composition or fitness goals. For example,
                    </p>
                    <Box clone order={{ xs: 2, sm: 1 }}>
                        <Grid item xs={12} sm={8} >
                            <p >
                                if your focus is on building muscle, you need enough protein to enable that muscle growth.
                                If you train intensely, you need enough carbs to fuel those hard sessions.
                                Macros work together, so the percentage of protein, carbs, and fat is the focus of many diet plans. But what is the right balance of macronutrients? It depends. Factors such as body type, fitness goals, and gender all play a role0.
                                Check out this guide for help in determining the proper percentages for you—and be sure the majority of macros you consume are healthy ones.
                            </p>
                        </Grid>
                    </Box>
                    <Box clone order={{ xs: 1, sm: 2 }}>
                        <Grid item xs={12} sm={4}>
                            <img alt="tracking-macros-img" className="tracking-macros-img" src="https://i1.wp.com/chronicallyhopeful.com/wp-content/uploads/2017/11/20171119120656.jpg?resize=867%2C520" />
                        </Grid>
                    </Box>
                </Grid>

                {MacroDefination.map(nutrient => {
                    return <div id={nutrient.nutritionName} className="macros-defination-div">
                        <h1>
                            <a href={`#${nutrient.nutritionName}`}>{nutrient.nutritionName}</a>
                        </h1>

                        <Container className="macros-defination-div-Container">
                            <h2>Role in the Body:</h2>
                            <ol>
                                {nutrient.role.map(role=>{
                                   return <li>{role}</li>
                                })}
                            </ol>
                        </Container>

                        <Container className="macros-defination-div-Container">
                            <h2>Recommended Allowance:</h2>
                            <ul>
                                {nutrient.recommendation.map(recommendation=>{
                                   return <li>{recommendation}</li>
                                })}
                            </ul>
                        </Container>

                        <Container>
                            <p><strong>NOTE:</strong> {nutrient.note} </p>
                        </Container>

                        <Container className="macros-defination-div-Container">
                            <h2>Food Sources:</h2>
                            <ol>
                                {nutrient.foodSources.map(foodSources=>{
                                   return <li>{foodSources}</li>
                                })}
                            </ol>
                        </Container>
                    </div>
                })}


                <p> <strong className="initials">M</strong>icronutrients are those nutrients that the body needs in smaller amounts. But that doesn’t mean that micros are of any lesser importance. Micros are essential to our overall health and wellness. </p>
            </div>
        </div>
    )
}
