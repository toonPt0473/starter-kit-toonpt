import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'

class Home extends Component {
  render() {
    return (
      <div>
        Home container
      </div>
    )
  }
}

Home.propTypes = {

}
Home.defaultProps = {

}
const mapStateToProps = state => ({ // eslint-disable-line

})
const mapDispatchToProps = dispatch => ({ // eslint-disable-line

})

const withStore = connect(mapStateToProps, mapDispatchToProps)

export default compose(withStore)(Home)

