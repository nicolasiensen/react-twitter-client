import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import injectSheet from 'react-jss'

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

const styles = {
  common: {
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
  },
  inline: {
    borderRadius: `0 ${borderRadius} ${borderRadius} 0`,
  }
}

export const Button = ({ inline, classes, sheet, ...other }) => (
  <button {...other} className={[classes.common, inline ? classes.inline : ''].join(' ')} />
)

Button.propTypes = {
  classes: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
  inline: PropTypes.bool
}

export default injectSheet(styles)(Button)
