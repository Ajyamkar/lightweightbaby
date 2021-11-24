import React, { Component } from 'react'
import './ExerciseSelectionModal.css';
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Button, Fade, IconButton, Modal, Typography } from '@mui/material';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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
            openModal: false
        }

        // this.handleModalChange = this.handleModalChange.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);

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
                                <IconButton  aria-label="close" onClick={this.handleModalClose}   >
                                    <CloseRoundedIcon style={{position:"absolute"}} classes={{ root: 'closeExerciseSelection-btn' }} />
                                </IconButton>
                                <h1 className="exercise-name">{this.props.levelExerciseName}</h1>
                            </div>

                            <div className="exercise-img-div">
                                <img className="exercise-img" src={this.props.exerciseImg} alt={`${this.props.levelExerciseName}-img`} />
                            </div>
                            <Accordion>
                                <AccordionSummary>
                                    <h2>How To Do</h2>
                                </AccordionSummary>
                                <AccordionDetails style={{border:"2px solid"}}>
                                    <ol style={{ marginLeft: "-1.5rem" }}>
                                        {this.props.exerciseHowToDo.map(points => {
                                            return (
                                                <li>{points}</li>
                                            )
                                        })}
                                    </ol>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Fade>

                </Modal>
            </div>
        )
    }
}
