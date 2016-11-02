import React, { Component } from 'react'

import Tweet from './Tweet'

import { loadTweets } from './../lib/api'
import { space1 } from './../lib/styles'
import storage from './../lib/storage'

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.archiveTweet = this.archiveTweet.bind(this)
    this.getUnarchivedTweets = this.getUnarchivedTweets.bind(this)

    this.state = {
      tweets: [],
      loading: false,
      archivedTweetsIds: storage.getItem('archivedTweetsIds') || []
    }
  }

  componentWillMount () {
    this.setState({loading: true})
    loadTweets(this.props.accessToken.token, this.props.accessToken.secret).end(
      (err, res) => {
        this.setState({tweets: res.body, loading: false})
      }
    )
  }

  archiveTweet (tweet) {
    this.setState({archivedTweetsIds: this.state.archivedTweetsIds.concat(tweet.id)})
    storage.setItem('archivedTweetsIds', this.state.archivedTweetsIds.concat(tweet.id))
  }

  getUnarchivedTweets () {
    return this.state.tweets.filter(
      t => (
        t.retweeted_status
        ? !this.state.archivedTweetsIds.includes(t.retweeted_status.id)
        : !this.state.archivedTweetsIds.includes(t.id)
      )
    )
  }

  render () {
    return (
      this.state.loading
      ? <div ref='loading' style={{textAlign: 'center', margin: space1}}>Loading...</div>
      : (
        <div>
          {
            this.getUnarchivedTweets().map(
              t => t.retweeted_status
              ? <Tweet key={t.id} onArchive={this.archiveTweet} tweet={t.retweeted_status} retweetedBy={t.user} />
              : <Tweet key={t.id} onArchive={this.archiveTweet} tweet={t} />
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
