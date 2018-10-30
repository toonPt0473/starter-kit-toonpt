/**
*
* List
*
*/

import React from 'react'
// import styled from 'styled-components';
import PropTypes from 'prop-types'
import dataProvider from '../../utils/dataProvider'

class Read extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    data: [],
    error: null,
  }
  componentDidMount() {
    this.fetchModel()
  }

  fetchModel = async () => {
    try {
      const {
        model,
        filter = {},
        afterSummit,
      } = this.props
      const provider = dataProvider(`/${model}`)
      const data = await provider.find({ filter })
      this.setState({ data })
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
    } = this.props
    const { data, error } = this.state
    return (
      children({
        data,
        error,
      })
    )
  }
}

Read.propTypes = {
  children: PropTypes.node.isRequired,
  model: PropTypes.string.isRequired,
  filter: PropTypes.shape({

  }),
}
Read.defaultProps = {
  filter: {},
}

export default Read
