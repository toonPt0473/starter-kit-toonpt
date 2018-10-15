// import React, { Component } from 'react'
// import './App.css'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     )
//   }
// }

// export default App


import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'

import AdminLayout from '../AdminLayout/index'
import Home from '../Home/Home'
import LoginScreen from '../LoginScreen/index'
import NotFoundPage from '../NotFoundPage/index'
import './App.module.css'

class App extends Component {
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

export default App
