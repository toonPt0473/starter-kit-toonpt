/**
*
* Create
*
*/

import React from 'react'
// import styled from 'styled-components';
import PropTypes from 'prop-types'
import dataProvider from '../../utils/dataProvider'


class Create extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    create: null,
    error: null,
  }
  submitHandler = async (payload) => {
    const {
      model,
      afterSummit,
    } = this.props
    try {
      const provider = dataProvider(`/${model}`)
      const create = provider.create({ ...payload })
      this.setState({ create })
      if (typeof afterSummit === 'function') {
        afterSummit()
      }
    } catch (error) {
      this.setState({ error })
    }
  }
  render() {
    const {
      children,
      record,
    } = this.props
    const {
      create,
      error,
    } = this.state
    return (
      React.cloneElement(children, {
        onSubmit: this.submitHandler,
        record: create || record,
        error,
      })
    )
  }
}

Create.propTypes = {
  children: PropTypes.node.isRequired,
  record: PropTypes.shape({

  }),
}
Create.defaultProps = {
  record: {},
}


export default Create
