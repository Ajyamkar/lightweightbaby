import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';

export default class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    render() {
        return (
            this.state.isLoggedIn ? (
                <h1>Home</h1>
            ) : (
                <Redirect to="/login" />
            )
        )
    }
}

