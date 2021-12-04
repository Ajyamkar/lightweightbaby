import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from '../Axios/axios';
import Sidebar from './Sidebar/Sidebar';

export default class Start extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            userCredintials: {},
            isvarified: false,
            mobileOpen: false,
            left:false
        }
        this.logOut = this.logOut.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    componentDidMount() {
        const cookies = new Cookies();
        console.log(cookies.get('token'));

        axios.post('/auth/me', {
            token: cookies.get('token')
        }).then(res => {
            if (!res.data.data.isSetupComplete) {
                window.location.href = "/setup"
            }
            if (res.data.code === 200) {
                this.setState({ ...this.state, isLoggedIn: true, userCredintials: res.data.data });
            }
        }).catch(err => {
            console.log(err);
            window.location.href = "/login"
        })

        this.setState({ ...this.state, isvarified: true })
    }

    logOut() {
        const cookies = new Cookies();

        cookies.remove('token', {
            path: '/',
            // maxAge: 1000 * 30,
            expiresIn: 60 * 15
        })
        window.location.href = "/login";
    }

    toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ ...this.state,left: open });
    };

    handleDrawerToggle() {
        this.setState({ ...this.state, mobileOpen: !this.state.mobileOpen });
    }

    render() {

        return (
            <div>
                <Sidebar
                    logOut={this.logOut}
                    userCredintials={this.state.userCredintials}
                    anchor= {this.state.left}
                    toggleDrawer = {this.toggleDrawer}
                />
            </div>
        )
    }
}

