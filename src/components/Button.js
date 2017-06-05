import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import tinycolor from 'tinycolor2'

import {
  primaryColor,
  white,
  space1,
  borderRadius,
  fontBold,
  inputBorderWidth,
  disabledColor,
  h4
} from './../lib/styles'

class Button extends Component {
  render () {
    const { inline, style, ...other } = this.props

    const styles = {
      ...style,
      backgroundColor: primaryColor,
      borderRadius: `${inline ? 0 : borderRadius} ${borderRadius} ${borderRadius} ${inline ? 0 : borderRadius}`,
      borderStyle: 'solid',
      borderWidth: inputBorderWidth,
      borderColor: primaryColor,
      color: white,
      cursor: 'pointer',
      fontSize: h4,
      fontWeight: fontBold,
      padding: space1,
      ':hover': {
        backgroundColor: tinycolor(primaryColor).lighten().toString(),
        borderColor: tinycolor(primaryColor).lighten().toString(),
      },
      ':disabled': {
        backgroundColor: disabledColor,
        borderColor: disabledColor,
      }
    }

    return <button {...other} style={styles} />
  }
}

Button.propTypes = {
  inline: PropTypes.bool,
  style: PropTypes.object,
}

export default Radium(Button)
