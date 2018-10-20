import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'

import AdminLayout from '../AdminLayout/index'
import Home from '../Home/Home'
import LoginScreen from '../LoginScreen/index'
import NotFoundPage from '../NotFoundPage/index'
import './App.module.css'

class App extends Component {
  componentDidMount() {
    this.getUser()
  }
  getUser = async () => {
    try {
      await this.props.getUserInfoAsync()
    } catch (error) {
      console.log('get usert info error')
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/admin" component={AdminLayout} />
          <Route path="/login" component={LoginScreen} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  getUserInfoAsync: PropTypes.func.isRequired,
}

const mapDispatchToProps = ({ auth }) => ({
  getUserInfoAsync: auth.getUserInfoAsync,
})

export default connect(null, mapDispatchToProps)(App)
