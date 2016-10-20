import React, { Component } from 'react'
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
  children: React.PropTypes.node
}

export default Text
