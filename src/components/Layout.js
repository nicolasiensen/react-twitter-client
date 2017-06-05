import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import { space2, lightGray, smBreakpoint, black } from './../lib/styles'

const styles = {
  container: {
    color: black,
    background: lightGray,
    overflow: 'hidden',
    minHeight: '100%',
    [`@media (min-width: ${smBreakpoint})`]: {
      padding: space2
    }
  },
  content: {
    width: '600px',
    maxWidth: '100%',
    margin: '0 auto'
  }
}

class Layout extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object
}

export default Radium(Layout)
