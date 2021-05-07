import React, { Component } from 'react'
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Main from './Components/Main/Main';

import gif1 from "./Assets/lift.gif";
import gif2 from "./Assets/girlRunningGif.gif";
import gif3 from "./Assets/jogging_run.gif";
import gif4 from "./Assets/weightlifter.gif";
import gif5 from "./Assets/girlPullUp.gif";
import gif6 from "./Assets/chinup.gif";

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      gifSrc: "",
      prelaoderBackground: ""
    }
    this.randomPreloader = this.randomPreloader.bind(this);
  }

  randomPreloader() {
    const gifarr = [{ src: gif1, background: "#7363ab" },{ src: gif5, background: "rgb(148 62 102)" } , 
                    { src: gif3, background: "#f7f0e0" },{ src: gif4, background: "rgb(247 247 247)" },
                    { src: gif6, background: "rgb(238 138 112)" },{ src: gif2, background: "white" }];
    // const beniftsArr = ['']
    const randomNo = Math.round(Math.random(0, 5) * 5);
    this.setState({ gifSrc: gifarr[randomNo].src, prelaoderBackground: gifarr[randomNo].background })
  }

  render() {
    window.onload = () => {
      this.randomPreloader();
      const myVar = setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").style.display = "block";
      }, 2000);
    }

    return (
      <BrowserRouter>
        <div className="App">
          <div id="loader" style={{ background: this.state.prelaoderBackground }} >
            <p style={{ position: "absolute" }} className="loader-heading">Light Weight Baby</p>
            <img id="preloader-img" src={this.state.gifSrc} alt="gif" style={{ width: "100vw" }} />
          </div>

          <div id="main" style={{ display: "none" }}>
            <Main />
          </div>

        </div>
      </BrowserRouter>

    )
  }
}

