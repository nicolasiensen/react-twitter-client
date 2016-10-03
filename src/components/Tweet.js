import React, { Component } from 'react'

class Tweet extends Component {
  render() {
    return <div>{this.props.text}</div>
  }
}

Tweet.propTypes = {
  text: React.PropTypes.string.isRequired
}

export default Tweet
