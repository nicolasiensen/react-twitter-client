import React, { Component } from 'react'
import { space1, borderRadius, inputBorderWidth, gray, h4 } from './../lib/styles'

class Input extends Component {
  render () {
    return (
      <input
        {...this.props}
        style={{
          ...this.props.style,
          padding: space1,
          borderRadius: borderRadius,
          borderStyle: 'solid',
          borderWidth: inputBorderWidth,
          borderColor: gray,
          fontSize: h4
        }}
      />
    )
  }
}

Input.propTypes = {
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  style: React.PropTypes.object,
  value: React.PropTypes.string
}

export default Input
