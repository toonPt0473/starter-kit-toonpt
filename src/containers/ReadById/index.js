/**
*
* Show
*
*/

import React from 'react'
// import styled from 'styled-components';
import PropTypes from 'prop-types'
import dataProvider from '../../utils/dataProvider'

class Show extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
      throw new Error('Show component require props (model & modelId)')
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
      model,
      modelId,
      filter,
      ...rest
    } = this.props
    const { record, error } = this.state
    return (
      React.cloneElement(children, {
        ...rest,
        record,
        refreshRecord: this.fetchModel,
        error,
      })
    )
  }
}

Show.propTypes = {
  children: PropTypes.node.isRequired,
  model: PropTypes.string.isRequired,
  modelId: PropTypes.string.isRequired,
  filter: PropTypes.shape({

  }),
}
Show.defaultProps = {
  filter: {},
}

export default Show
