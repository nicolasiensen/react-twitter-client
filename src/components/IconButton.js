import React, { Component } from 'react'
import Radium from 'radium'

import {
  primaryColor,
  disabledColor,
  gray,
} from './../lib/styles'

class IconButton extends Component {
  render () {
    const { style, icon, ...other } = this.props

    const styles = {
      ...style,
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

    return (
      <button {...other} style={styles}>
        <i className="material-icons">{icon}</i>
      </button>
    )
  }
}

IconButton.propTypes = {
  icon: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
}

export default Radium(IconButton)
