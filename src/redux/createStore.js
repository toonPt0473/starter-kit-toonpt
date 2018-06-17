import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import * as reduxModules from './index'

const history = createHistory()
const middleware = routerMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const allReducer = Object.keys(reduxModules).reduce((a, c) => {
  a[c] = reduxModules[c].reducer
  return a
}, {})

const create = () =>
  createStore(
    combineReducers({
      ...allReducer,
      router: routerReducer,
    }),
    composeEnhancers(applyMiddleware(middleware, thunk)),
  )

export { create, history }
