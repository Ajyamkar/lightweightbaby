import React, { Component } from 'react'
import './ExerciseSelectionModal.css';
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Button, Fade, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const paperStyle = {
    backgroundColor: '#fff',
    "z-index": "2",
    // background: `url(${bg})`,
    // border: '2px solid #000',
    boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)',
    padding: '16px 16px ',
    width: '90vw',
    maxHeight: '90vh',
    overflow: 'auto'
}


export default class ExerciseSelectionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            howToPerform: "",
            noOfSets: 1,
            showNoOfSets: true,
            setsDetailsArr: [],
            noOfReps: "",
            weight: "",
            selectWeightScale: "kg",
            isAlreadyAdded: false
        }

        // this.handleModalChange = this.handleModalChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.changeCounter = this.changeCounter.bind(this);
        this.addSetDetails = this.addSetDetails.bind(this);
        this.saveSetDetails = this.saveSetDetails.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            [name]: [value]
        })
    }

    handleModalOpen() {
        this.setState({
            ...this.state,
            openModal: true
        })
    }

    handleModalClose() {
        this.setState({
            ...this.state,
            openModal: false
        })
    }

    changeCounter(operation) {
        let value = this.state.noOfSets;
        if (operation === "increment") {
            value += 1
        } else {
            if (this.state.noOfSets == 1) {
                value = 1
            } else {
                value -= 1
            }
        }

        this.setState({
            ...this.state,
            noOfSets: value
        })
    }

    addSetDetails() {
        let weightScale = this.state.selectWeightScale[0] === "lb" ? "lb" : "kg";
        const arr = this.state.setsDetailsArr;

        arr.push({
            noOfReps: this.state.noOfReps[0],
            weight: this.state.weight[0] + "" + weightScale
        })

        this.setState({
            ...this.state,
            noOfReps: "",
            weight: "",
            selectWeightScale: "kg",
            setsDetailsArr: arr
        })
    }

    saveSetDetails() {
        const details = {
            exerciseId: this.props.exerciseId,
            exerciseName: this.props.levelExerciseName,
            bodyPart: this.props.bodyPart,
            totalNoOfSets: this.state.noOfSets,
            setDetails: this.state.setsDetailsArr
        }

        this.setState({
            ...this.state,
            isAlreadyAdded: true
        })

        // this.setState({
        //     // ...this.state,
        //     howToPerform: "",
        //     noOfSets: 1,
        //     showNoOfSets: true,
        //     setsDetailsArr: [],
        //     noOfReps: "",
        //     weight: "",
        //     selectWeightScale: "kg"
        // })

        this.props.saveSelectedExerciseData(details);
        setTimeout(() => {
            this.handleModalClose();
        }, 10);
    }

    render() {
        return (

            <div className="exerciseSelectionModal-main-div">
                <div onClick={this.handleModalOpen}>
                    <Typography >{this.props.levelExerciseName}</Typography>
                </div>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.state.openModal}
                    style={modalStyle}
                    classes={{ root: 'modal' }}
                    onClose={this.handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.openModal}>
                        <div
                            style={paperStyle}
                            classes={{ root: 'paper' }}
                        >

                            <div >
                                <IconButton aria-label="close" onClick={this.handleModalClose}   >
                                    <CloseRoundedIcon style={{ position: "absolute" }} classes={{ root: 'closeExerciseSelection-btn' }} />
                                </IconButton>
                                <h1 className="exercise-name">{this.props.levelExerciseName}</h1>
                            </div>

                            <div className="exercise-img-div">
                                <img className="exercise-img" src={this.props.exerciseImg} alt={`${this.props.levelExerciseName}-img`} />
                            </div>
                            <Accordion style={{ margin: "2rem 0" }}>
                                <div>
                                    <AccordionSummary>
                                        <h2>How To Do</h2>
                                    </AccordionSummary>
                                </div>
                                <div>
                                    <AccordionDetails style={{ border: "2px solid" }}>
                                        <ol style={{ marginLeft: "-1.5rem" }}>
                                            {this.props.exerciseHowToDo.map(points => {
                                                return (
                                                    <li>{points}</li>
                                                )
                                            })}
                                        </ol>
                                    </AccordionDetails>
                                </div>
                            </Accordion>

                            {this.state.isAlreadyAdded ?
                                <div>
                                    <h3>Number of Sets = {this.state.noOfSets}</h3>
                                    {this.state.setsDetailsArr.map((set, index) => {
                                        return (
                                            <h3>For Set {index + 1}, No of Reps = {set.noOfReps} & Weight = {set.weight}</h3>
                                        )
                                    })}
                                    <h2>Already Added</h2>
                                </div>
                                :
                                <div>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel id="inputlabel-select-how-to-perform">How to perform</InputLabel>
                                            <Select
                                                id="select-input-how-to-perform"
                                                name="howToPerform"
                                                value={this.state.howToPerform}
                                                label="How to perform"
                                                placeholder="How to perform"
                                                onChange={this.handleChange}
                                            >
                                                <MenuItem value="NumberOfSets">Number of Sets</MenuItem>
                                                <MenuItem value="Timer">Timer</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    {this.state.howToPerform == "" ? null :
                                        this.state.howToPerform[0] === "NumberOfSets" ?
                                            this.state.showNoOfSets ?
                                                <div>
                                                    <h1>Number of Sets</h1>
                                                    <div style={{ display: "flex" }}>
                                                        <Button onClick={() => this.changeCounter("decrement")}><RemoveIcon /></Button>
                                                        <h1>{this.state.noOfSets}</h1>
                                                        <Button onClick={() => this.changeCounter("increment")} ><AddIcon /></Button>
                                                        <Button onClick={() => { this.setState({ ...this.state, showNoOfSets: false }) }}>Add</Button>
                                                    </div>
                                                </div> :
                                                <div>
                                                    <h3>Number of Sets = {this.state.noOfSets}</h3>
                                                    {this.state.setsDetailsArr.map((set, index) => {
                                                        return (
                                                            <h3>For Set {index + 1}, No of Reps = {set.noOfReps} & Weight = {set.weight}</h3>
                                                        )
                                                    })}

                                                    {this.state.setsDetailsArr.length + 1 > this.state.noOfSets ?
                                                        <Button onClick={this.saveSetDetails}>Save Set Details</Button>
                                                        :
                                                        <div>
                                                            <h2>Enter Details for Set {this.state.setsDetailsArr.length + 1}</h2>
                                                            <h3>
                                                                No of reps =<TextField variant="standard" name="noOfReps" value={this.state.noOfReps} type="number" onChange={this.handleChange} required /> &
                                                                weight = <TextField variant="standard" name="weight" value={this.state.weight} onChange={this.handleChange} type="number"
                                                                    InputProps={{
                                                                        startAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <FormControl variant="standard">
                                                                                    <Select
                                                                                        id="select-weightScale"
                                                                                        name="selectWeightScale"
                                                                                        value={this.state.selectWeightScale}
                                                                                        onChange={this.handleChange}
                                                                                    >
                                                                                        <MenuItem value="kg">kg</MenuItem>
                                                                                        <MenuItem value="lb">lb</MenuItem>
                                                                                    </Select>
                                                                                </FormControl>
                                                                            </InputAdornment>
                                                                        ),
                                                                    }} required />
                                                            </h3>
                                                            <Button onClick={this.addSetDetails}>Add</Button>
                                                        </div>
                                                    }

                                                </div> :
                                            <div>Timer</div>
                                    }
                                </div>

                            }


                        </div>
                    </Fade>

                </Modal>
            </div>
        )
    }
}
