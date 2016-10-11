import React, { Component } from 'react'
import { white, space2 } from './../lib/styles'

class Box extends Component {
  render () {
    return (
      <div style={{backgroundColor: white, padding: space2, margin: '0 auto', ...this.props.style}}>
        {this.props.children}
      </div>
    )
  }
}

Box.propTypes = {
  children: React.PropTypes.array,
  style: React.PropTypes.object
}

export default Box
