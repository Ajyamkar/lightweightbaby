import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Join from '../Authentication/Join/Join'
import Login from '../Authentication/Login/Login'
import Start from '../Start/Start'

export default class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/home" component={Start} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/join" component={Join} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        )
    }
}
