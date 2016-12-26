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
    storage.setItem('archivedTweetsIds', storage.getItem('archivedTweetsIds') || [])
    storage.setItem('loading', false)
  }

  componentWillMount () {
    storage.setItem('loading', true)
    loadTweets(this.props.accessToken.token, this.props.accessToken.secret).end(
      (err, res) => {
        storage.setItem('loading', false)
        storage.setItem('tweets', res.body)
        this.forceUpdate()
      }
    )
  }

  archiveTweet (tweet) {
    storage.setItem('archivedTweetsIds', storage.getItem('archivedTweetsIds').concat(tweet.id))
    this.forceUpdate()
  }

  getUnarchivedTweets () {
    return storage.getItem('tweets').filter(
      t => (
        t.retweeted_status
        ? !storage.getItem('archivedTweetsIds').includes(t.retweeted_status.id)
        : !storage.getItem('archivedTweetsIds').includes(t.id)
      )
    )
  }

  render () {
    const unarchivedTweets = this.getUnarchivedTweets()

    return (
      storage.getItem('loading')
      ? <div ref='loading' style={{textAlign: 'center', margin: space1}}>Loading...</div>
      : (
        <div>
          {
            unarchivedTweets.length > 0
            ? (
              unarchivedTweets.map(
                t => t.retweeted_status
                ? <Tweet key={t.id} onArchive={this.archiveTweet} tweet={t.retweeted_status} retweetedBy={t.user} />
                : <Tweet key={t.id} onArchive={this.archiveTweet} tweet={t} />
              )
            ) : <div ref='empty' style={{textAlign: 'center', margin: space1}}>Your inbox is empty!</div>
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
