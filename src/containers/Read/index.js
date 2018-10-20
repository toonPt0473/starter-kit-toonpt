/**
*
* List
*
*/

import React from 'react'
// import styled from 'styled-components';
import PropTypes from 'prop-types'
import dataProvider from '../../utils/dataProvider'

class List extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
      model,
      filter,
      ...rest
    } = this.props
    const { data, error } = this.state
    return (
      React.cloneElement(children, {
        ...rest,
        data,
        refreshData: this.fetchModel,
        error,
      })
    )
  }
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  model: PropTypes.string.isRequired,
  filter: PropTypes.shape({

  }),
}
List.defaultProps = {
  filter: {},
}

export default List
