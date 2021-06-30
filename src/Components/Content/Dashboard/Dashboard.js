import React, { Component } from 'react';
import "./Dashboard.css"
// import logoImg from";

export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="dashboard-main-div">
                <h1>HOme</h1>
                {/* <img src={logoImg} /> */}
                <img src={this.props.userCredintials.profile_picture} />
                <button onClick={this.props.logOut} >Logout</button>
            </div>
        )
    }
}
