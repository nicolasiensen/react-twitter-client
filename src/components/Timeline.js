import React, { Component } from 'react'

import Tweet from './Tweet'

import { space1 } from './../lib/styles'
import * as storage from './../lib/storage'

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.archiveTweet = this.archiveTweet.bind(this)
    this.handleStorageChange = this.handleStorageChange.bind(this)
    window.addEventListener('storage', this.handleStorageChange)
  }

  handleStorageChange() {
    this.forceUpdate()
  }

  archiveTweet (tweet) {
    storage.archiveTweet(tweet.id)
    this.forceUpdate()
  }

  render () {
    const unarchivedTweets = storage.getUnarchivedTweets()

    return (
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
        {
          storage.isLoading() && <div ref='loading' style={{textAlign: 'center', margin: space1}}>Loading...</div>
        }
      </div>
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
