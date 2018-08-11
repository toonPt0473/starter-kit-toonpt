import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Door from '../../components/Door/Door'
import { exampleModel } from '../../redux/index'

class Home extends Component {
  componentWillMount() {
    const params = {
      method: '',
      params: '',
    }
    this.props.dispatch(exampleModel.actions.getCurrentUser(params))
  }

  render() {
    console.log(this.props)
    return (
      <div>
        Home container
        <Door />
      </div>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.object, // eslint-disable-line
}
Home.defaultProps = {

}
const mapStateToProps = state => ({ // eslint-disable-line
  xxx: state,
})
const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

