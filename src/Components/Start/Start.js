import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import axios from '../Axios/axios';

export default class Start extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoggedIn: false,
            userCredintials:{},
            isvarified: false
        }
        this.logOut = this.logOut.bind(this);
    }

    // componentDidMount(){
    //     console.log(this.props);

    //     setTimeout(() => {
    //         if (!this.props.isLoggedIn) {
    //             // window.location.href = "/login"
    //         }
    //     }, 6000);
        
    // }

    componentDidMount() {
        const cookies = new Cookies();
        console.log(cookies.get('token'));

        axios.post('/auth/me', {
            token: cookies.get('token')
        }).then(res => {
            console.log(res);
            if (res.data.code === 500) {
                window.location.href = "https://ajyamkar.github.io/lightweightbaby/login"
            }
            if(!res.data.data.isSetupComplete){
                window.location.href = "/setup"
            }
            if (res.data.code === 200) {
                this.setState({ ...this.state,isLoggedIn: true,userCredintials:res.data.data });
            }
        }).catch(err => {
            console.log(err);
            window.location.href = "https://ajyamkar.github.io/lightweightbaby/login"
        })

        this.setState({ ...this.state, isvarified: true })
    }

    logOut() {
        const cookies = new Cookies();

        cookies.remove('token', {
            path: '/',
            // maxAge: 1000 * 30,
            expiresIn: 60*15
        })
        window.location.href = "/login";
    }

    render() {
        return (
            <div>
                <h1>HOme</h1>
                <p>{this.state.userCredintials.email}</p>
                <p>{this.state.userCredintials.name}</p>
                <img src={this.state.userCredintials.profile_picture} />
                <button onClick={this.logOut} >Logout</button>
            </div>
            // (this.props.isLoggedIn) ? (
            //     <h1>Home</h1>
            // ) : (
            //     <Redirect to="/login" /> 
            // )
        )
    }
}

