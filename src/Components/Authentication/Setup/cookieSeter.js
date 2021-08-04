import React, { Component } from 'react';
import Cookies from 'universal-cookie';

export default class CookieSeter extends Component {

    componentDidMount(){
        const urlParams =  new URLSearchParams(window.location.search);
        const registrationErr = urlParams.get('isUserAlreadyExist');
        const loginErr = urlParams.get('isUserNotFound');
        const token = urlParams.get('token');
        const forRegistration= urlParams.get('forRegistration');

        if(loginErr){
            window.alert("User not found try to join with your google or facebook account redirecting to join page");
            window.location.href = '/join';
        }

        if (registrationErr) {
            window.alert("User already exist with your google or facebook accountredirecting to login page");
            window.location.href = '/login';
        }

        if(forRegistration && token){
            const cookies = new Cookies();
            cookies.set('token',token,{
                path: '/',
                // maxAge: 1000 * 60,
                expiresIn: 60 * 15
            });
            window.location.href='/setup'
        }else if(token){
            const cookies = new Cookies();
            cookies.set('token',token,{
                path: '/',
                // maxAge: 1000 * 60,
                expiresIn: 60 * 60
            });
            window.location.href = '/home'
        }

    }

    render() {
        return (
            <div>
                <h1>Hello</h1>            
            </div>
        )
    }
}
