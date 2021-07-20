import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from './Components/Axios/axios';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Start from './Components/Start/Start';
import Join from './Components/Authentication/Join/Join';
import Login from './Components/Authentication/Login/Login';
import Setup from './Components/Authentication/Setup/setup';
import CookieSeter from './Components/Authentication/Setup/cookieSeter';
import gif1 from "./Assets/lift.gif";
import gif2 from "./Assets/girlRunningGif.gif";
import gif3 from "./Assets/jogging_run.gif";
import gif4 from "./Assets/Weightlifter.gif";
import gif5 from "./Assets/girlPullUp.gif";
import gif6 from "./Assets/chinup.gif";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';


const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 620,
      md: 1024,
      lg: 1440,
      xl: 1920
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width:'4px',
          height: '10px'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'black',
          outline: ' 3px solid #f1f1f1',
          borderRadius:"2rem"
        }
      }
    }
  }
})

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      gifSrc: "",
      prelaoderBackground: "",
    }
    this.randomPreloader = this.randomPreloader.bind(this);
  }

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

  }


  randomPreloader() {
    const gifarr = [{ src: gif1, background: "#7363ab" }, { src: gif5, background: "rgb(148 62 102)" },
    { src: gif3, background: "#f7f0e0" }, { src: gif4, background: "rgb(247 247 247)" },
    { src: gif6, background: "rgb(238 138 112)" }, { src: gif2, background: "white" }];
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
        <MuiThemeProvider theme={theme} >
          <div className="App">

            <div id="loader" style={{ background: this.state.prelaoderBackground }} >
              <p style={{ position: "absolute" }} className="loader-heading">Light Weight Baby</p>
              <img id="preloader-img" src={this.state.gifSrc} alt="gif" style={{ width: "100vw" }} />
            </div>

            <div id="main" style={{ display: "none" }}>
              <Switch >
                <Route exact path="/login" component={Login} />
                <Route exact path="/join" component={Join} />
                <Route exact path='/cookieSeter' component={CookieSeter} />
                <Route exact path='/setup' component={Setup} />
                <Route path="/" component={Start} />
                <Redirect to='/' />
              </Switch>
            </div>

          </div>
        </MuiThemeProvider>
      </BrowserRouter>


    )
  }
}

