function sumOfMacronutrients(dataArr) {

    if(dataArr.length===0){
        return 0
    }

    let protein = 0, carbs = 0, calories = 0, fats = 0, sugar = 0, water = 0;
    dataArr.map(nutrients => {
        protein = protein + parseFloat(nutrients.protein);
        carbs = carbs + parseFloat(nutrients.carbs);
        calories = calories + parseFloat(nutrients.totalCalories);
        fats = fats + parseFloat(nutrients.fats);
        sugar = sugar + parseFloat(nutrients.sugar);
        water = water + parseFloat(nutrients.water);
    })
    return {
        totalCalories: calories.toPrecision(4),
        protein: protein.toPrecision(4),
        carbs: carbs.toPrecision(4),
        fats: fats.toPrecision(4),
        sugar: sugar.toPrecision(4),
        water: water.toPrecision(4)
    };
}

function sumOfMicroNutrients(dataArr) {

    
    if(dataArr.length===0){
        return 0
    }

    let  sodium = 0, potassium = 0, magnesium = 0, calcium = 0, iron = 0, zinc = 0, folate = 0, vitaminB6 = 0, vitaminC = 0, vitaminD = 0;
    dataArr.map(nutrients => {
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
    })
    return {
        sodium: sodium.toPrecision(4),
        potassium: potassium.toPrecision(4),
        magnesium: magnesium.toPrecision(4),
        calcium: calcium.toPrecision(4),
        iron: iron.toPrecision(4),
        zinc: zinc.toPrecision(4),
        folate: folate.toPrecision(4),
        vitaminB6: vitaminB6.toPrecision(4),
        vitaminC: vitaminC.toPrecision(4),
        vitaminD: vitaminD.toPrecision(4)
    };
}

export { sumOfMacronutrients,sumOfMicroNutrients };