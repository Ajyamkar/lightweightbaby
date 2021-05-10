import React, { Component } from 'react'
import Cookies from "universal-cookie";
import "./Join.css"
import axios from "../../Axios/axios";

import { Button, Grid, InputAdornment, TextField } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FacebookIcon from '../../../Assets/facebook.png';
import GoogleIcon from '../../../Assets/google.png';

export default class Join extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            error: {
                email: "",
                validPasssword: false,
                confirmPassword: "",
                authenication: ""
            },
            showPassword: false,
            showPasswordConditions: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
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

    validatePassword() {
        const lowerCaseRegex = /[a-z]/g;
        const upperCaseRegex = /[A-Z]/g;
        const numericRegex = /[0-9]/g;
        const specialCharRegex = /^(?=.*[^a-zA-Z0-9])/;
        const pwd = this.state.password;

        var lower = document.getElementById("lower");
        var upper = document.getElementById("upper");
        var number = document.getElementById("number");
        var special = document.getElementById("special");
        var stringlength = document.getElementById("length");
        var submitBtn = document.getElementById("join-submit-btn")

        var count = 0;//to check all the conditions are satisfied.

        // var err = ""
        // if (this.state.email === "") {
        //     err = "*Enter a email"
        // }
        // this.setState({
        //     error: { ...this.state.error, email: err }
        // });

        if (pwd.match(lowerCaseRegex)) {
            lower.classList.remove("invalid");
            lower.classList.add("valid");
            count++;
        } else {
            lower.classList.remove("valid");
            lower.classList.add("invalid");
        }

        if (pwd.match(upperCaseRegex)) {
            upper.classList.remove("invalid");
            upper.classList.add("valid");
            count++;
        } else {
            upper.classList.remove("valid");
            upper.classList.add("invalid");
        }

        if (pwd.match(specialCharRegex)) {
            special.classList.remove("invalid");
            special.classList.add("valid");
            count++;
        } else {
            special.classList.remove("valid");
            special.classList.add("invalid");
        }

        if (pwd.match(numericRegex)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
            count++;
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        if (pwd.length >= 6) {
            stringlength.classList.remove("invalid");
            stringlength.classList.add("valid");
            count++;
        } else {
            stringlength.classList.remove("valid");
            stringlength.classList.add("invalid");
        }

        if (count === 5) {
            this.setState({
                error: { ...this.state.error, validPasssword: true }
            })
            submitBtn.disabled = false;
            submitBtn.classList.remove("disable-submit-btn");
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.add("disable-submit-btn");
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const errors = this.state.error
        var err = ""

        if (this.state.confirmPassword !== this.state.password) {
            err = "*Confirm password is not matching";
        } else if (errors.email === "" && errors.validPasssword) {
            axios.post("/auth/register", {
                email: this.state.email,
                password: this.state.confirmPassword
            }).then(res => {
                console.log(res);
                console.log(res.data.code);
                // console.log(res.data.code === "500");
                if (res.data.code === "500") {
                    this.setState({ error: { ...this.state.error, authenication: res.data.err } })
                }
                if (res.data.code === 200) {
                    const cookies = new Cookies();
                    console.log(res.data.data.token);
                    cookies.set('token', res.data.data.token, {
                        path: '/',
                        // maxAge: 1000 * 60,
                        expiresIn: 60 * 15
                    })
                    window.location.href = "/home";
                }
            }).catch(err => {
                console.log(err);
            })
        }

        this.setState({
            error: { ...this.state.error, confirmPassword: err }
        })



    }

    render() {
        return (
            <div className="Join">
                <div className="Join-main-div">
                    <h1 style={{ paddingTop: "15px" }} className="Join-h1">Join</h1>
                    <div onClick={()=>{window.location.href='http://localhost:9000/auth/googleAuth'}} className="social-Join-btn"> <img className="social-Join-icon" src={GoogleIcon} alt="google-icon" /> Join with Google </div>
                    <div onClick={()=>{window.location.href='http://localhost:9000/auth/fbAuth'}}className="social-Join-btn"> <img className="social-Join-icon" src={FacebookIcon} alt="facebook-icon" /> Join with Facebook </div>
                    <h1 style={{ padding: "0" }}>OR</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField
                                classes={{ root: "text-input" }}
                                id="input-with-icon-textfield"
                                label="Email address"
                                name="email"
                                autoComplete="off"
                                onChange={this.handleChange}
                                onBlur={this.validateEmail}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                required
                            />
                            <p className="error">{this.state.error.email}</p>
                            <TextField
                                classes={{ root: "text-input" }}
                                id="input-with-icon-textfield"
                                label="Password"
                                name="password"
                                autoComplete="off"
                                type={this.state.showPassword ? "text" : "password"}
                                onFocus={() => {
                                    this.setState({
                                        showPasswordConditions: true
                                    });
                                }}
                                onChange={this.handleChange}
                                onKeyUp={this.validatePassword}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {this.state.showPassword ? <LockOpenIcon /> : <LockOutlinedIcon />}
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
                            {this.state.showPasswordConditions ? <div>
                                <p id="lower" className="password-errors">*Should contain atleast one lowercase letter</p>
                                <p id="upper" className="password-errors">*Should contain atleast one uppercase letter</p>
                                <p id="number" className="password-errors">*Should contain atleast one numeric digit</p>
                                <p id="special" className="password-errors">*Should contain atleast one special character eg @,# etc</p>
                                <p id="length" className="password-errors">*length should be greater than 6</p>
                            </div> : null}
                            <TextField
                                classes={{ root: "text-input" }}
                                id="input-with-icon-textfield"
                                label="Confirm password"
                                name="confirmPassword"
                                autoComplete="off"
                                type={this.state.showPassword ? "text" : "password"}
                                onChange={this.handleChange}
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
                            <p className="error">{this.state.error.confirmPassword}</p>

                        </div>
                        {this.state.error.authenication === "" ?
                            <Button id="join-submit-btn" type="submit" classes={{ root: "Join-submit-btn" }} style={{ margin: "5px 25vw 0" }}>Join</Button>
                            : <p className="authentication-error">{this.state.error.authenication} try to login</p>
                        }
                    </form>
                    <p className="login-p">Have an account?<a href="/login">Login</a></p>
                </div>
            </div>
        )
    }
}
