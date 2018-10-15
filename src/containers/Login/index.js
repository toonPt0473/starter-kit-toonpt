/**
*
* Login
*
*/

import React from 'react'
// import styled from 'styled-components';
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'

class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  getInitialValue = () => ({
    email: '',
    password: '',
  })

  submitHandler = async (credential) => {
    const {
      login,
    } = this.props
    try {
      await login({ ...credential })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const {
      children,
      error,
    } = this.props
    return (
      React.cloneElement(children, {
        onSubmit: this.submitHandler,
        record: this.getInitialValue(),
        error,
      })
    )
  }
}

Login.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.shape({

  }).isRequired,
}
const mapStateToProps = state => ({
  error: state.Auth.error,
})

const mapDispatchToProps = dispatch => ({
  login: dispatch.Auth.loginAsync,
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(Login)
