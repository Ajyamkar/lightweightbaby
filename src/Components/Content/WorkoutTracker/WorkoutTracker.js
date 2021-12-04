import React, { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Typography from '@mui/material/Typography';
import "./WorkoutTracker.css";
import ExerciseSelectionModal from './ExerciseSelectionModal/ExerciseSelectionModal';
import exerciseList from './List/ExerciseList';

export default class WorkoutTracker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bodypartExpandAccordion: false,
            expandAccordion: false,
            selectedExerciseArr: [
                // {
                //     exerciseId: "",
                //     exerciseName: "",
                //     bodyPart: "",
                //     totalNoOfSets: "",
                //     setDetails: []
                // }
            ]
        }

        this.handleExpandAccordion = this.handleExpandAccordion.bind(this);
        this.saveSelectedExerciseData= this.saveSelectedExerciseData.bind(this);
    }

    handleExpandAccordion(item, accordion) {
        return function (e, isExpanded) {
            this.setState({
                ...this.state,
                [accordion]: isExpanded ? item : false
            });
        }.bind(this);
    }

    saveSelectedExerciseData(data) {
        const detials = {
            exerciseId: data.exerciseId,
            exerciseName: data.exerciseName,
            bodyPart: data.bodyPart,
            totalNoOfSets: data.totalNoOfSets,
            setDetails: data.setDetails
        }
        let arr = this.state.selectedExerciseArr;
        arr.push(detials);

        this.setState({
            ...this.state,
            selectedExerciseArr:arr
        })

    }

    render() {
        return (
            <div className="workoutTracker-main-div">
                <h1>Workout Tracker</h1>

                {exerciseList.map(exercise => {
                    return (
                        <Accordion
                            style={{ margin: "1rem 0" }}
                            key={exercise.id}
                            expanded={this.state.bodypartExpandAccordion === exercise.bodyPart}
                            onChange={this.handleExpandAccordion(exercise.bodyPart, "bodypartExpandAccordion")}
                        >
                            <AccordionSummary
                                expandIcon={this.state.bodypartExpandAccordion === exercise.bodyPart ? <AccessibilityIcon style={{ color: 'red' }} /> : <AccessibilityIcon style={{ color: 'black' }} />}
                                aria-controls={exercise.bodyPart}
                                id={`${exercise.bodyPart}-header`}
                            >
                                <h2>{exercise.bodyPart}</h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <h2>Choose the level of exercise</h2>

                                {["Beginner", "Intermediate", "Advance"].map((level, index) => {
                                    return (
                                        <Accordion
                                            style={{ margin: "0.5rem 0" }}
                                            key={index}
                                            expanded={this.state.expandAccordion === `${exercise.bodyPart}-${level}`}
                                            onChange={this.handleExpandAccordion(`${exercise.bodyPart}-${level}`, "expandAccordion")}
                                        >
                                            <AccordionSummary
                                                expandIcon={this.state.expandAccordion === `${exercise.bodyPart}-${level}` ? <AccessibilityIcon style={{ color: 'red' }} /> : <AccessibilityIcon style={{ color: 'black' }} />}
                                                aria-controls={`${exercise.bodyPart}-${level}`}
                                                id={`${exercise.bodyPart}-${level}-header`}
                                            >
                                                <h2>{level}</h2>
                                            </AccordionSummary>
                                            {/* {console.log(exercise.level[level])} */}
                                            {exercise.level[level] === undefined ?
                                                null :
                                                exercise.level[level].map((levelExercise, index) => {
                                                
                                                    return (
                                                        <AccordionDetails key={index}>
                                                            {/* <h3>leg extension</h3> */}

                                                            {/* {levelExercise} */}
                                                            <ExerciseSelectionModal
                                                                exerciseId={levelExercise.exerciseId}
                                                                bodyPart={exercise.bodyPart}
                                                                levelExerciseName={levelExercise.exerciseName}
                                                                exerciseImg={levelExercise.imgSrc}
                                                                exerciseHowToDo={levelExercise.howToDo}
                                                                saveSelectedExerciseData={this.saveSelectedExerciseData}
                                                            />
                                                        </AccordionDetails>
                                                    )
                                                })
                                            }

                                        </Accordion>
                                    )
                                })}

                            </AccordionDetails>
                        </Accordion>
                    )
                })}

                {this.state.selectedExerciseArr.map(data=>{
                    return(
                        <div>
                            <h3>{data.exerciseId}</h3>
                            <h3>{data.bodyPart}</h3>
                            <h3>{data.exerciseName}</h3>
                            <h3>{data.totalNoOfSets}</h3>
                        </div>
                    )
                })}

                {/* <Accordion>
                    <AccordionSummary>
                        <h2>legs</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h2>Choose the level of exercise</h2>

                        {["basic", "medium", "advanced"].map((level, index) => {
                            return (
                                <Accordion
                                    key={index}
                                    expanded={this.state.expandAccordion === level}
                                    onChange={this.handleExpandAccordion(level)}
                                >
                                    <AccordionSummary
                                        expandIcon={this.state.expandAccordion === level ? <AccessibilityIcon style={{ color: 'red' }} /> : <AccessibilityIcon style={{ color: 'black' }} />}
                                        aria-controls={`${level}-content`}
                                        id={`${level}-header`}
                                    >
                                        <h2>{level}</h2>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ExerciseSelectionModal />
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </AccordionDetails>
                </Accordion> */}

            </div>
        )
    }
}
