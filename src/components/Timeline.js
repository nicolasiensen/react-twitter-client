import React, { Component } from 'react'

import Tweet from './Tweet'

import { loadTweets } from './../lib/api'
import { space1 } from './../lib/styles'

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
      ? <div ref='loading' style={{textAlign: 'center', margin: space1}}>Loading...</div>
      : (
        <div>
          {
            this.state.tweets.map(
              t => t.retweeted_status
              ? <Tweet key={t.id} tweet={t.retweeted_status} retweetedBy={t.user} /> 
              : <Tweet key={t.id} tweet={t} />
            )
          }
        </div>
      )
    )
  }
}

Timeline.propTypes = {
  accessToken: React.PropTypes.shape({
    token: React.PropTypes.string.isRequired,
    secret: React.PropTypes.string.isRequired
  })
}

export default Timeline
