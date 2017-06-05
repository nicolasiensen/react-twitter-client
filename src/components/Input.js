import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { space1, borderRadius, inputBorderWidth, gray, h4 } from './../lib/styles'

class Input extends Component {
  render () {
    const { inline, style, ...other } = this.props

    return (
      <input
        {...other}
        style={{
          ...style,
          padding: space1,
          borderRadius: `${borderRadius} ${inline ? 0 : borderRadius} ${inline ? 0 : borderRadius} ${borderRadius}`,
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
  inline: PropTypes.bool,
  style: PropTypes.object,
}

export default Input
