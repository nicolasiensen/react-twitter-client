import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

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

export const Layout = ({ classes, children }) => (
  <div className={classes.container}>
    <div className={classes.content}>{children}</div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.object
}

export default injectSheet(styles)(Layout)
