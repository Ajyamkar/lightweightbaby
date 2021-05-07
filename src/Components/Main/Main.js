import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import axios from '../Axios/axios'
import { Redirect, Route, Switch } from 'react-router'
import Join from '../Authentication/Join/Join'
import Login from '../Authentication/Login/Login'
import Start from '../Start/Start'
import CookieSeter from '../Authentication/Setup/cookieSeter';
import Setup from '../Authentication/Setup/setup';

export default class Main extends Component {

    constructor(props) {
        super(props);
    }
    //     this.state = {
    //         isLoggedIn: false,
    //         userCredintials:{},
    //         isvarified: false
    //     }
    //     this.logOut = this.logOut.bind(this);
    // }

    componentDidMount() {


        if (window.location.href === 'http://localhost:3000/login' || window.location.href === 'http://localhost:3000/join') {
            const cookies = new Cookies();
            axios.post('/auth/me', {
                token: cookies.get('token')
            }).then(res => {
                console.log(res);
                // if (res.data.code === 500) {
                //     window.location.href = "/login"
                // }
                if (res.data.code === 200) {
                    window.location.href = '/home'
                }
            }).catch(err => {
                console.log(err);
                // window.location.href = "/login"
            })
        }



        // this.setState({ ...this.state, isvarified: true })
    }

    // logOut() {
    //     const cookies = new Cookies();

    //     cookies.remove('token', {
    //         path: '/',
    //         // maxAge: 1000 * 30,
    //         expiresIn: 60*15
    //     })
    //     // window.location.href = "/login";
    // }


    render() {
        return (
            <div>
                <Switch>
                    <Route path="/home" component={Start} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/join" component={Join} />
                    <Route exact path='/cookieSeter' component={CookieSeter} />
                    <Route exact path='/setup' component={Setup} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        )
    }
}
