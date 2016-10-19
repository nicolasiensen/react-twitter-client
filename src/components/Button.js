import React, { Component } from 'react'
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
    const styles = {
      backgroundColor: primaryColor,
      borderRadius: borderRadius,
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

    return <button style={styles} {...this.props} />
  }
}

Button.propTypes = {
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func
}

export default Radium(Button)
