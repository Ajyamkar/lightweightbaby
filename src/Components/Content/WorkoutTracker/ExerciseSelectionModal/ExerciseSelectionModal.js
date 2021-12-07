import React, { Component } from 'react'
import './ExerciseSelectionModal.css';
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Button, Fade, IconButton, InputAdornment, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
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
    overflow: 'auto',
    background: "#160040",
    color: "white"
}


export default class ExerciseSelectionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
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

        if (this.state.noOfReps === "" || this.state.weight === "") {
            this.setState({
                ...this.state,
                error: "please enter the input"
            })
        } else {
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
                            <Accordion classes={{ root: "howToDo-accordion" }} >
                                <div className="howToDo-accordionSummary-div" >
                                    <AccordionSummary >
                                        <h2>How To Do</h2>
                                    </AccordionSummary>
                                </div>
                                <div style={{ borderRadius: "0 0 5px 5px" }}>
                                    <AccordionDetails classes={{ root: "howToDo-accordionDetails" }} >
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
                                <div className="alreadyAdded-sets-div">
                                    <h2>Total number of Sets = {this.state.noOfSets}</h2>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead classes={{ root: "setsTable-tableHead" }}>
                                                <TableRow>
                                                    <TableCell classes={{ root: "setsTable-table-cell" }} align="center">Set No</TableCell>
                                                    <TableCell classes={{ root: "setsTable-table-cell" }} align="center">Number of Reps </TableCell>
                                                    <TableCell classes={{ root: "setsTable-table-cell" }} align="center">Weight</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.setsDetailsArr.map((set, index) => {
                                                    return (
                                                        <TableRow key={index + 1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                            <TableCell align="center">{index + 1}</TableCell>
                                                            <TableCell align="center">{set.noOfReps}</TableCell>
                                                            <TableCell align="center">{set.weight}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <h2>Already Added</h2>
                                </div>
                                :
                                <div className="sets-selection-div">
                                    <Box>
                                        <FormControl sx={{ width: "38vw" }}>
                                            <InputLabel style={{ color: "#e60067" }} id="inputlabel-select-how-to-perform">How to perform</InputLabel>
                                            <Select
                                                classes={{ root: "howToPerform-select" }}
                                                id="select-input-how-to-perform"
                                                name="howToPerform"
                                                value={this.state.howToPerform}
                                                label="How to perform"
                                                placeholder="How to perform"
                                                onChange={this.handleChange}
                                            >
                                                <MenuItem value="NumberOfSets">Number of sets</MenuItem>
                                                <MenuItem value="Timer">Timer</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    {this.state.howToPerform == "" ? null :
                                        this.state.howToPerform[0] === "NumberOfSets" ?
                                            this.state.showNoOfSets ?
                                                <div>
                                                    <h1>Total number of sets</h1>
                                                    <div className="setsCounterBtns-div">
                                                        <Button style={{ color: "#e60067" }} onClick={() => this.changeCounter("decrement")}><RemoveIcon /></Button>
                                                        <h1>{this.state.noOfSets}</h1>
                                                        <Button onClick={() => this.changeCounter("increment")} ><AddIcon /></Button>

                                                    </div>
                                                    <Button classes={{ root: "addSetCounter-btn" }} onClick={() => { this.setState({ ...this.state, showNoOfSets: false }) }}>Add</Button>
                                                </div> :
                                                <div>
                                                    <h2>Total Number of Sets = {this.state.noOfSets}</h2>
                                                    <TableContainer component={Paper}>
                                                        <Table>
                                                            <TableHead classes={{ root: "setsTable-tableHead" }}>
                                                                <TableRow>
                                                                    <TableCell classes={{ root: "setsTable-table-cell" }} align="center">Set No</TableCell>
                                                                    <TableCell classes={{ root: "setsTable-table-cell" }} align="center">Number of Reps</TableCell>
                                                                    <TableCell classes={{ root: "setsTable-table-cell" }} align="center">Weight</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {this.state.setsDetailsArr.map((set, index) => {
                                                                    return (
                                                                        <TableRow key={index + 1}>
                                                                            <TableCell align="center">{index + 1}</TableCell>
                                                                            <TableCell align="center">{set.noOfReps}</TableCell>
                                                                            <TableCell align="center">{set.weight}</TableCell>
                                                                        </TableRow>
                                                                    )
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>


                                                    {this.state.setsDetailsArr.length + 1 > this.state.noOfSets ?
                                                        <Button classes={{ root: "saveSetDetails-btn" }} onClick={this.saveSetDetails}>Save Set Details</Button>
                                                        :
                                                        <div style={{ marginTop: "1.2rem" }}>
                                                            <h2>Enter Details for Set {this.state.setsDetailsArr.length + 1}</h2>
                                                            <div style={{display:"grid" ,justifyContent:"center"}} >
                                                                <div className="enterSetDetails-div">
                                                                    <h3>No of reps =</h3>
                                                                    <TextField classes={{ root: "setDetailsInput-textfield" }} style={{ width: "3rem" }} variant="standard" name="noOfReps" value={this.state.noOfReps} type="number" onChange={this.handleChange} required />
                                                                </div>
                                                                <div className="enterSetDetails-div">
                                                                    <h3>& Weight = </h3>
                                                                    <TextField classes={{ root: "setDetailsInput-textfield" }} style={{ width: "6.5rem" }} variant="standard" name="weight" value={this.state.weight} onChange={this.handleChange} type="number"
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
                                                                        }} required
                                                                    />
                                                                </div>
                                                            </div>
                                                            {this.state.error != "" ? <p style={{ color: "red" }}>{this.state.error}</p> : null}
                                                            <Button classes={{ root: "addSetDetails-btn" }} onClick={this.addSetDetails}>Add</Button>
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
