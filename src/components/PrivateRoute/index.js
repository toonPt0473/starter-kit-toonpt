/**
*
* PrivateRoute
*
*/

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import styles from './PrivateRoute.module.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function PrivateRoute({ component: Component, isAuth, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired, // eslint-disable-line
  location: PropTypes.shape({

  }).isRequired,
  isAuth: PropTypes.bool.isRequired,
}

const mapState = ({ auth }) => ({
  isAuth: !!auth.accessToken,
})

export default connect(mapState)(PrivateRoute)
