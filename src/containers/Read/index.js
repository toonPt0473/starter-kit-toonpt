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
  }
  componentDidMount() {
    this.fetchModel()
  }

  fetchModel = async () => {
    const {
      model,
      filter = {},
    } = this.props
    const provider = dataProvider(`/${model}`)
    const data = await provider.find({ filter })
    this.setState({ data })
  }

  render() {
    const {
      children,
      model,
      filter,
      ...rest
    } = this.props
    const { data } = this.state
    return (
      React.cloneElement(children, {
        ...rest,
        data,
        refreshData: this.fetchModel,
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
