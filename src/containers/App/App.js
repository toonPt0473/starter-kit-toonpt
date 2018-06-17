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
import { Route, Switch } from 'react-router'
import 'antd/dist/antd.css'

import Home from '../Home/Home'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    )
  }
}

export default App
