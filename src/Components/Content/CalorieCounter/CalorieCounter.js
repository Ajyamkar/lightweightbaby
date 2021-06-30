import React, { Component } from 'react';
import "./CalorieCounter.css";
import api from "../../Axios/axios";

export default class CalorieCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullRecipe: "",
            ingrident: "",
        }

        this.handleChange = this.handleChange.bind(this);

        this.fullRecipeAnalysis = this.fullRecipeAnalysis.bind(this);
    }

    // componentDidMount() {
    //     const data = {
    //         dishName: "chicken rice",
    //         ingridents: [
    //             "100g chicken",
    //             "50g paneer"
    //         ]
    //     }
    //     api.post('/caloriesCounter/fullRecipe', data).then(result => {
    //         console.log(result);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
        // this.setState({
        //     [name]: value
        // })
    }

    fullRecipeAnalysis() {

        const recipe = this.state.fullRecipe.split(',');

        const data = {
            dishName: "chicken rice",
            ingridents: recipe
        }
        api.post('/caloriesCounter/fullRecipe', data).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="calorieCounter-main-div">
                <h1>Calorie Counter</h1>
                <textarea
                    name='fullRecipe'
                    onChange={this.handleChange}
                />
                <button onClick={this.fullRecipeAnalysis}>Submit</button>
            </div>
        )
    }
}
