import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { space1 } from './../lib/styles'

class Text extends Component {
  render () {
    return (
      <p style={{margin: `0 0 ${space1} 0`}}>
        {this.props.children}
      </p>
    )
  }
}

Text.propTypes = {
  children: PropTypes.node
}

export default Text
