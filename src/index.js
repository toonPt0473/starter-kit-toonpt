// import React from 'react'
// import ReactDOM from 'react-dom'
// import './index.css'
// import App from './App'
// import registerServiceWorker from './registerServiceWorker'

// ReactDOM.render(<App />, document.getElementById('root'))
// registerServiceWorker()


import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './createStore'
import App from './containers/App/App'
// import registerServiceWorker from './registerServiceWorker'
import './index.css'

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))
// registerServiceWorker()
