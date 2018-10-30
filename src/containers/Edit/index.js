/**
*
* Edit
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import dataProvider from '../../utils/dataProvider'

class Edit extends React.Component { // eslint-disable-line
  state = {
    error: null,
    record: {},
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
      throw new Error('Edit component require props (model & modelId)')
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
  submitHandler = async (payload) => {
    const {
      model,
      modelId,
      afterSummit,
    } = this.props
    try {
      const provider = dataProvider(`/${model}`)
      const record = provider.update({ ...payload, id: modelId })
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
    return children({
      onSubmit: this.submitHandler,
      record,
      error,
    })
  }
}

Edit.propTypes = {
  children: PropTypes.node.isRequired,
  model: PropTypes.string.isRequired,
  modelId: PropTypes.string.isRequired,
}

Edit.defaultProps = {

}

export default Edit
