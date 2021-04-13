import './App.css';
import Login from './Components/Authentication/Login';
import gif1 from "./Assets/lift.gif";

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    window.onload = () => {
      const myVar = setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").style.display = "block";
      }, 5000);
    }

    return (
      <div className="App">
        <div id="loader" >
          <p style={{ position: "absolute" }} className="loader-heading">Light Weight Baby</p>
          <img src={gif1} alt="gif" style={{ width: "100vw" }} />
        </div>
        <div id="main" style={{ display: "none" }}>
          <Login />
        </div>

      </div>
    )
  }
}

