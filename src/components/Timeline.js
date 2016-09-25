import React, { Component } from 'react'

import { loadTweets } from './../lib/api'
import Tweet from './Tweet'

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.state = {tweets: [], loading: false}
  }

  componentWillMount () {
    this.setState({loading: true})
    loadTweets(this.props.accessToken.token, this.props.accessToken.secret).end(
      (err, res) => {
        this.setState({tweets: res.body, loading: false})
      }
    )
  }

  render () {
    return (
      this.state.loading
      ? <div>loading...</div>
      : (
        <div>
          {this.state.tweets.map(t => <Tweet key={t.id} text={t.text} />)}
        </div>
      )
    )
  }
}

export default Timeline
