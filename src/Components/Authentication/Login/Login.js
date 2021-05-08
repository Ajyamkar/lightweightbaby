import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import "./Login.css"

import { Button, Grid, InputAdornment, TextField } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FacebookIcon from '../../../Assets/facebook.png';
import GoogleIcon from '../../../Assets/google.png';
import axios from '../../Axios/axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: {
                email: "",
                password: "",
                authentication: ""
            },
            showPassword: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    validateEmail() {
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var err = ""
        if (!mailformat.test(this.state.email) || this.state.email === "") {
            err = "*Enter a valid email"
        }
        this.setState({
            error: { ...this.state.error, email: err }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);

        if (this.state.error.email === "") {
            axios.post("/auth/login", {
                email: this.state.email,
                password: this.state.password
            }).then(result => {
                console.log(result);

                if (result.status === 206) {
                    this.setState({ error: { ...this.state.error, authentication: "user not found try to join" } })
                }



                if (result.status === 200) {
                    console.log(result);
                    const cookies = new Cookies();

                    cookies.set('token', result.data.data.token, {
                        path: '/',
                        // maxAge: 1000 * 30,
                        expiresIn: 60*15
                    })
                    window.location.href = "/"
                }
            }).catch(err => {
                console.log(err);
                // if (err.status === 500) {
                this.setState({ error: { ...this.state.error, password: "incorrect password" } })
                // }

            })
        }
    }

    render() {
        return (
            <div className="login">
                <div className="login-main-div">
                    <h1 style={{ paddingTop: "15px" }} className="login-h1">Login</h1>
                    <div onClick={()=>{window.location.href='https://light-weight-baby-node.herokuapp.com/auth/googleAuth?forLogin=true'}} className="social-login-btn"> <img className="social-login-icon" src={GoogleIcon} alt="google-icon" /> Login with Google </div>
                    <div onClick={()=>{window.location.href='https://light-weight-baby-node.herokuapp.com/auth/fbAuth?forLogin=true'}} className="social-login-btn"> <img className="social-login-icon" src={FacebookIcon} alt="facebook-icon" /> Login with Facebook </div>
                    <h1 style={{ padding: "0" }}>OR</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField
                                classes={{ root: "text-input" }}
                                id="input-with-icon-textfield"
                                name="email"
                                onChange={this.handleChange}
                                onBlur={this.validateEmail}
                                label="Email address"
                                autoComplete="off"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon className={{ root: "form-icon" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                required
                            />
                            <p className="error">{this.state.error.email}</p>
                            <TextField
                                classes={{ root: "text-input" }}
                                id="input-with-icon-textfield"
                                name="password"
                                onChange={this.handleChange}
                                label="Password"
                                autoComplete="off"
                                type={this.state.showPassword ? "text" : "password"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {this.state.showPassword ? <LockOpenIcon className={{ root: "form-icon" }} /> : <LockOutlinedIcon className={{ root: "form-icon" }} />}
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <div onClick={() => { this.setState({ showPassword: !this.state.showPassword }) }} style={{ cursor: "pointer" }}>
                                                {this.state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </div>
                                        </InputAdornment>
                                    ),
                                }}
                                required
                            />
                            <p className="error">{this.state.error.password}</p>
                        </div>
                        {this.state.error.authentication === "" ?
                            <Button type="submit" classes={{ root: "login-submit-btn" }} style={{ margin: "5px 25vw 0" }}>Login</Button>
                            : <p className="authentication-error">{this.state.error.authentication} </p>
                        }
                    </form>
                    <p className="join-p">Don't have an account?<a href="/join">Join</a></p>
                </div>
            </div>
        )
    }
}
