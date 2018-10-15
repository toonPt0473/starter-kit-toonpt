import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './createStore'
import App from './screen/App/App'
// import registerServiceWorker from './registerServiceWorker'

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))
// registerServiceWorker()
