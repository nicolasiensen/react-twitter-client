import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import {
  primaryColor,
  disabledColor,
  gray,
} from './../lib/styles'

const styles = {
  iconButton: {
    color: gray,
    cursor: 'pointer',
    background: 'none',
    border: '0px',
    padding: '0px',
    ':hover': {
      color: primaryColor,
    },
    ':disabled': {
      color: disabledColor,
    }
  }
}

export const IconButton = ({ icon, classes, sheet, ...other }) => (
  <button {...other} className={classes.iconButton}>
    <i className="material-icons">{icon}</i>
  </button>
)

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired
}

export default injectSheet(styles)(IconButton)
