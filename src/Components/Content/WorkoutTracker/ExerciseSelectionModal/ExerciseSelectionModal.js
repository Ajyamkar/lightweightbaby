import React, { Component } from 'react'
import './ExerciseSelectionModal.css';
import { Backdrop, Button, Fade, Modal, Typography } from '@mui/material';

const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const paperStyle = {
    backgroundColor: '#fff',
    "z-index":"2",
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
        this.handleModalOpen=this.handleModalOpen.bind(this);
        this.handleModalClose=this.handleModalClose.bind(this);

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
                    <Typography>Hello</Typography>
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
                         classes={{root:'paper'}}
                         >
                            <h1>Hello</h1>
                        </div>
                    </Fade>

                </Modal>
            </div>
        )
    }
}
