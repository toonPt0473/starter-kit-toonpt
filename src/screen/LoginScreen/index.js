/**
*
* LoginScreen
*
*/

import React, { Component } from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
// import PropTypes from 'prop-types'
import SimpleFormLayout from '../../components/SimpleFormLayout/index'
import Login from '../../containers/Login/index'

const Container = styled.div`

`
class LoginScreen extends Component { // eslint-disable-line
  render() {
    return (
      <Container>
        <Login>
          <SimpleFormLayout >
            <Input iconName="people" name="email" placeholder="Email" />
            <Input
              iconName="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
            />
          </SimpleFormLayout>
        </Login>

      </Container>
    )
  }
}

LoginScreen.propTypes = {

}

LoginScreen.defaultProps = {

}
export default LoginScreen
