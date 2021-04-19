import React, { Component } from 'react'
import "./Login.css"

import { Button, Grid, InputAdornment, TextField } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FacebookIcon from '../../../Assets/facebook.png';
import GoogleIcon from '../../../Assets/google.png';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false
        }
    }

    render() {
        return (
            <div className="login">
                <div className="login-main-div">
                    <h1 style={{ paddingTop: "15px" }} className="login-h1">Login</h1>
                    <div className="social-login-btn"> <img className="social-login-icon" src={GoogleIcon} alt="google-icon" /> Login with Google </div>
                    <div className="social-login-btn"> <img className="social-login-icon" src={FacebookIcon} alt="facebook-icon" /> Login with Facebook </div>
                    <h1 style={{ padding: "0" }}>OR</h1>
                    <form>
                        <div>
                            <TextField
                                classes={{ root: "text-input" }}
                                id="input-with-icon-textfield"
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
                            <TextField
                                classes={{ root: "text-input" }}
                                id="input-with-icon-textfield"
                                label="Password"
                                autoComplete="off"
                                type={this.state.showPassword?"text":"password"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                           {this.state.showPassword?<LockOpenIcon className={{ root: "form-icon" }}/>:<LockOutlinedIcon className={{ root: "form-icon" }}/>}
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <div onClick={() => { this.setState({ showPassword: !this.state.showPassword }) }} style={{ cursor: "pointer" }}>
                                                {this.state.showPassword?<VisibilityIcon />:<VisibilityOffIcon />}
                                            </div>
                                        </InputAdornment>
                                    ),
                                }}
                                required
                            />
                        </div>
                        <Button type="submit" classes={{ root: "login-submit-btn" }} style={{ margin: "5px 25vw 0" }}>Login</Button>
                    </form>
                    <p className="join-p">Don't have an account?<a href="/join">Join</a></p>
                </div>
            </div>
        )
    }
}
