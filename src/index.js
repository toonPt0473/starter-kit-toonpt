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
import { ConnectedRouter } from 'react-router-redux'

import { create as createStore, history } from './redux/createStore'
import App from './containers/App/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const store = createStore()
const Root = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App history={history} />
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))
registerServiceWorker()
