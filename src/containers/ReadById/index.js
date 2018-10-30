/**
*
* ReadById
*
*/

import React from 'react'
// import styled from 'styled-components';
import PropTypes from 'prop-types'
import dataProvider from '../../utils/dataProvider'

class ReadById extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    record: {},
    error: null,
  }
  componentDidMount() {
    this.fetchModel()
  }

  fetchModel = async () => {
    const {
      model,
      modelId,
      filter = {},
      afterSummit,
    } = this.props
    if (!modelId || !model) {
      throw new Error('ReadById component require props (model & modelId)')
    }
    try {
      const provider = dataProvider(`/${model}`)
      const record = await provider.findById({ filter, id: modelId })
      this.setState({ record })
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
    const { record, error } = this.state
    return (
      children({
        record,
        error,
      })
    )
  }
}

ReadById.propTypes = {
  children: PropTypes.node.isRequired,
  model: PropTypes.string.isRequired,
  modelId: PropTypes.string.isRequired,
  filter: PropTypes.shape({

  }),
}
ReadById.defaultProps = {
  filter: {},
}

export default ReadById
