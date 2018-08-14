import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from '../Home/Home'
import './App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
