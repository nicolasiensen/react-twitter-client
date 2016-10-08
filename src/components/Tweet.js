import React, { Component } from 'react'
import { space2, lightGray, white } from './../lib/styles'

class Tweet extends Component {
  render() {
    return (
      <div style={{padding: space2, borderBottom: `1px solid ${lightGray}`, background: white}}>
        {this.props.text}
      </div>
    )
  }
}

Tweet.propTypes = {
  text: React.PropTypes.string.isRequired
}

export default Tweet
