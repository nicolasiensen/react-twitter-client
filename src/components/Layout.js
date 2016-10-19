import React, { Component } from 'react'
import Radium from 'radium'

import { space2, lightGray, smBreakpoint, black } from './../lib/styles'

const styles = {
  container: {
    color: black,
    background: lightGray,
    minHeight: '100%',
    [`@media (min-width: ${smBreakpoint})`]: {
      padding: space2
    }
  },
  content: {
    maxWidth: '900px',
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
  children: React.PropTypes.object
}

export default Radium(Layout)
