import React, { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Typography from '@mui/material/Typography';
import "./WorkoutTracker.css";
import ExerciseSelectionModal from './ExerciseSelectionModal/ExerciseSelectionModal';
import exerciseList from './List/ExerciseList';
import SelectedExercise from './SelectedExercise/SelectedExercise';
import { Button } from '@mui/material';

export default class WorkoutTracker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bodypartExpandAccordion: false,
            expandAccordion: false,
            selectedExerciseExpandAccordion: false,
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
        this.saveSelectedExerciseData = this.saveSelectedExerciseData.bind(this);
        this.markSetAsCompleted = this.markSetAsCompleted.bind(this);
        this.removeSelectedExercise = this.removeSelectedExercise.bind(this);
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
        let levelDigit = data.exerciseId.toString().charAt(1);
        let level = ""
        const result = exerciseList.filter(exercise => {
            return (exercise.bodyPart === data.bodyPart)
        })
        let exerciseInfo = [];

        if (levelDigit == 1) {
            level = "Beginner";
            exerciseInfo = result[0].level.Beginner.filter(info => {
                return (info.exerciseId === data.exerciseId)
            });
        } else if (levelDigit == 2) {
            level = "Intermediate";
            exerciseInfo = result[0].level.Intermediate.filter(info => {
                return (info.exerciseId === data.exerciseId)
            });
        } else {
            level = "Advance";
            exerciseInfo = result[0].level.Advance.filter(info => {
                return (info.exerciseId === data.exerciseId)
            });
        }

        // console.log(result);
        // console.log(exerciseInfo);
        const detials = {
            exerciseId: data.exerciseId,
            exerciseName: data.exerciseName,
            bodyPart: data.bodyPart,
            level: level,
            imgSrc: exerciseInfo[0].imgSrc,
            howToDo: exerciseInfo[0].howToDo,
            totalNoOfSets: data.totalNoOfSets,
            setDetails: data.setDetails,
            isAllSetsCompleted: data.isAllSetsCompleted
        }
        let arr = this.state.selectedExerciseArr;
        arr.push(detials);



        this.setState({
            ...this.state,
            selectedExerciseArr: arr
        })

    }

    markSetAsCompleted(exerciseId, setNo, isCompleted) {

        const arr = this.state.selectedExerciseArr;
        // console.log(setDetails);
        for (let i in arr) {
            console.log(arr[i]);

            if (arr[i].exerciseId == exerciseId) {
                let setDetails = arr[i].setDetails
                console.log(setDetails);
                let count = 0;
                for (let j in setDetails) {
                    if (setDetails[j].setNo == setNo) {
                        setDetails[j].isCompleted = isCompleted
                    }
                }
                for (let j in setDetails) {
                    if (setDetails[j].isCompleted) {
                        count++;
                    }
                    if (count == setDetails.length) {
                        arr[i].isAllSetsCompleted = true;
                    }
                }

                console.log(arr[i])
                break;
            }
        }

        this.setState({
            ...this.state,
            selectedExerciseArr: arr
        });

    }

    removeSelectedExercise(exerciseId){
        console.log(this.state.selectedExerciseArr);
        const arr= this.state.selectedExerciseArr.filter(exercise=>{
            return (exerciseId!=exercise.exerciseId);
        })

        console.log(arr);
        setTimeout(() => {
            this.setState({
                ...this.state,
                selectedExerciseArr:arr
            });
        }, 100);
    }

    render() {
        return (
            <div className="workoutTracker-main-div">
                <h1 className='workoutTracker-h1'>Workout Tracker</h1>

                {exerciseList.map(exercise => {
                    return (
                        <Accordion
                            classes={{ root: "workoutTracker-outermost-accordion" }}
                            style={{ margin: "1rem 0" }}
                            key={exercise.id}
                            expanded={this.state.bodypartExpandAccordion === exercise.bodyPart}
                            onChange={this.handleExpandAccordion(exercise.bodyPart, "bodypartExpandAccordion")}
                        >
                            <div>
                                <AccordionSummary
                                    expandIcon={this.state.bodypartExpandAccordion === exercise.bodyPart ? <AccessibilityIcon style={{ color: 'red' }} /> : <AccessibilityIcon style={{ color: 'black' }} />}
                                    aria-controls={exercise.bodyPart}
                                    id={`${exercise.bodyPart}-header`}
                                >
                                    <h2>{exercise.bodyPart}</h2>
                                </AccordionSummary>
                            </div>
                            <div>
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
                                                <div>
                                                    <AccordionSummary
                                                        expandIcon={this.state.expandAccordion === `${exercise.bodyPart}-${level}` ? <AccessibilityIcon style={{ color: 'red' }} /> : <AccessibilityIcon style={{ color: 'black' }} />}
                                                        aria-controls={`${exercise.bodyPart}-${level}`}
                                                        id={`${exercise.bodyPart}-${level}-header`}
                                                    >
                                                        <h2>{level}</h2>
                                                    </AccordionSummary>
                                                </div>
                                                {/* {console.log(exercise.level[level])} */}
                                                {exercise.level[level] === undefined ?
                                                    null :
                                                    exercise.level[level].map((levelExercise, index) => {

                                                        return (
                                                            <div key={index}>
                                                                <AccordionDetails>
                                                                    {/* <h3>leg extension</h3> */}

                                                                    {/* {levelExercise} */}
                                                                    <ExerciseSelectionModal
                                                                        exerciseId={levelExercise.exerciseId}
                                                                        bodyPart={exercise.bodyPart}
                                                                        selectedExerciseArr={this.state.selectedExerciseArr}
                                                                        levelExerciseName={levelExercise.exerciseName}
                                                                        exerciseImg={levelExercise.imgSrc}
                                                                        exerciseHowToDo={levelExercise.howToDo}
                                                                        saveSelectedExerciseData={this.saveSelectedExerciseData}
                                                                    />
                                                                </AccordionDetails>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </Accordion>
                                        )
                                    })}

                                </AccordionDetails>
                            </div>
                        </Accordion>
                    )
                })}

                {this.state.selectedExerciseArr.length != 0 && <h1 className='selectedExercises-h1'>Selected Exercises</h1>}

                {this.state.selectedExerciseArr.map((data, index) => {

                    return <div key={index + 1}>
                        <Accordion
                            classes={{ root: "workoutTracker-outermost-accordion" }}
                            style={{ margin: "1rem 0" }}
                            key={index}
                            expanded={this.state.selectedExerciseExpandAccordion === `${data.exerciseName}-selectedAccordion`}
                            onChange={this.handleExpandAccordion(`${data.exerciseName}-selectedAccordion`, 'selectedExerciseExpandAccordion')}
                        >
                            <AccordionSummary
                                // expandIcon={this.state.expandAccordion === level ? <AccessibilityIcon style={{ color: 'red' }} /> : <AccessibilityIcon style={{ color: 'black' }} />}
                                style={{ backgroundColor: data.isAllSetsCompleted ? "#49FF00" : "white" }}
                                classes={{ content: "workoutTracker-outermost-accordionSummary" }}
                                aria-controls={`${data.exerciseName}-selectedAccordion-content`}
                                id={`${data.exerciseName}-selectedAccordion-header`}
                            >
                                <div>
                                    <h2>{data.bodyPart}/{data.exerciseName}</h2>
                                    <h2>{data.level}</h2>
                                </div>
                                {data.isAllSetsCompleted ?
                                    <h3 style={{ color: "#160040" }}>Completed</h3> :
                                    <Button onClick={()=>{this.removeSelectedExercise(data.exerciseId)}} style={{background:"red",color:"black"}}>
                                        Remove
                                    </Button>
                                }
                            </AccordionSummary>
                            <AccordionDetails>
                                <SelectedExercise
                                    exerciseId={data.exerciseId}
                                    exerciseName={data.exerciseName}
                                    bodyPart={data.bodyPart}
                                    level={data.level}
                                    imgSrc={data.imgSrc}
                                    howToDo={data.howToDo}
                                    setDetails={data.setDetails}
                                    totalNoOfSets={data.totalNoOfSets}
                                    isAllSetsCompleted={data.isAllSetsCompleted}
                                    markSetAsCompleted={this.markSetAsCompleted}
                                />
                            </AccordionDetails>
                        </Accordion>

                    </div>

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
