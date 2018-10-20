/**
*
* Edit
*
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReadById from '../ReadById/index'
import dataProvider from '../../utils/dataProvider'


class Edit extends Component { // eslint-disable-line
  state = {
    editError: null,
    edit: null,
  }
  submitHandler = async (payload) => {
    const {
      model,
      modelId,
      afterSummit,
    } = this.props
    try {
      const provider = dataProvider(`/${model}`)
      const edit = provider.update({ ...payload, id: modelId })
      this.setState({ edit })
      if (typeof afterSummit === 'function') {
        afterSummit()
      }
    } catch (error) {
      this.setState({ editError: error })
    }
  }
  render() {
    const {
      model,
      modelId,
      children,
      ...rest
    } = this.props
    return (
      <ReadById model={model} modelId={modelId} >
        {
          React.Children.map(children, child => {
              const {
                record,
                error,
              } = child.props
              const {
                edit,
                editError,
              } = this.state
              return React.cloneElement(children, {
                ...rest,
                onSubmit: this.submitHandler,
                record: edit || record,
                error,
                editError,
              })
            })
          }
      </ReadById>
    )
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
