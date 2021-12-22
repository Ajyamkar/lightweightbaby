import { Accordion, AccordionDetails, AccordionSummary, Table, TableContainer, TableBody, TableHead, TableRow, TableCell } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Paper } from '@mui/material';
import './SelectedExercise.css';
import { Button } from '@mui/material';

export default function SelectedExercise(props) {
    const [accordion, setAccordion] = useState({
        outerAccordion: false,
        howToDoAccordion: false
    });

    function handleExpandAccordion(item, accordion) {
        return (e, isExpanded) => {
            setAccordion(prevState => {
                // ...accordion,
                return { ...prevState, [accordion]: isExpanded ? item : false }
            });
        }
    }

    return (
        <div className='selectedExercise-div'>
            {/* <Accordion
                expanded={accordion.outerAccordion === `${props.exerciseName}-outerAccordion`}
                onChange={handleExpandAccordion(`${props.exerciseName}-outerAccordion`, 'outerAccordion')}
            >
                <AccordionSummary
                    aria-controls={`${props.exerciseName}-outerAccordion`}
                    id={`${props.exerciseName}-outerAccordion-header`}
                >
                    <div>
                        <h2>{props.bodyPart}/{props.exerciseName}</h2>
                        <h2>{props.level}</h2>
                    </div>
                </AccordionSummary>
                <AccordionDetails> */}
            <img src={props.imgSrc} className='selectedExercise-div-img' />
            <Accordion
                expanded={accordion.howToDoAccordion === `${props.exerciseName}-howToDoAccordion`}
                onChange={handleExpandAccordion(`${props.exerciseName}-howToDoAccordion`, 'howToDoAccordion')}
            >
                <AccordionSummary
                    aria-controls={`${props.exerciseName}-howToDoAccordion`}
                    id={`${props.exerciseName}-howToDoAccordion-header`}
                >
                    <h2>How To Do</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        {props.howToDo.map((steps, index) => {
                            return (
                                <li key={index + 1}>{steps}</li>
                            )
                        })}
                    </ol>
                </AccordionDetails>
            </Accordion>
            <h2>Total Number of Sets:{props.totalNoOfSets}</h2>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead classes={{ root: "setsTable-tableHead" }}>
                        <TableRow>
                            <TableCell classes={{ root: "setsTable-table-cell" }} align="center">Set No</TableCell>
                            <TableCell classes={{ root: "setsTable-table-cell" }} align="center">Number of Reps</TableCell>
                            <TableCell classes={{ root: "setsTable-table-cell" }} align="center">Weight</TableCell>
                            <TableCell classes={{ root: "setsTable-table-cell" }} align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.setDetails.map((set, index) => {
                            return (
                                <TableRow style={{backgroundColor:set.isCompleted?"#49FF00":"white"}} key={index + 1}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{set.noOfReps}</TableCell>
                                    <TableCell align="center">{set.weight}</TableCell>
                                    <TableCell align='center' style={{border:"0"}}>
                                        {set.isCompleted?
                                            <TableCell align="center">Completed</TableCell>
                                        :
                                        <Button
                                            onClick={()=>{props.markSetAsCompleted(props.exerciseId,index+1,true)}}
                                            classes={{ root: "set-status-table-button" }}
                                        >
                                            Mark as complete
                                        </Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* </AccordionDetails>
            </Accordion> */}
        </div>
    )
}
