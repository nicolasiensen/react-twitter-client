import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import IconButton from './IconButton'
import TweetMedia from './TweetMedia'
import LinkPreview from './LinkPreview'
import { borderRadius, space1, space2, lightGray, white, h6, fontBold, blue } from './../lib/styles'

function linkify(text, urls) {
  let newText = text

  urls.forEach(url => {
    newText = newText.replace(
      url.url,
      `<a style='color: ${blue}' target='_blank' href='${url.expanded_url}'>${url.url}</a>`
    )
  })

  return newText
}

class Tweet extends Component {
  constructor (props) {
    super(props)
    this.archive = this.archive.bind(this)
  }

  archive () {
    this.props.onArchive(this.props.tweet)
  }

  render() {
    const isOriginalTweet = this.props.tweet.retweeted_status === undefined
    const tweet = isOriginalTweet ? this.props.tweet : this.props.tweet.retweeted_status
    const media = tweet.extended_entities ? tweet.extended_entities.media : []
    const urls =  tweet.is_quote_status ? [] : tweet.entities.urls.map(u => u.url)

    let tweetText = tweet.full_text
    media.forEach(m => tweetText = tweetText.replace(m.url, ''))
    urls.forEach(url => tweetText = tweetText.replace(url, ''))
    tweetText = linkify(tweetText, tweet.entities.urls)

    return (
      <div style={{padding: space2, borderBottom: `1px solid ${lightGray}`, background: white, display: 'flex'}}>
        <div style={{marginRight: space1}}>
          <img alt={tweet.user.name} style={{borderRadius: borderRadius}} src={tweet.user.profile_image_url} />
        </div>
        <div style={{overflow: 'hidden'}}>
          <div style={{fontSize: h6}}>{!isOriginalTweet && `Retweeted by ${this.props.tweet.user.name}`}</div>
          <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
            <span style={{fontWeight: fontBold}}>{tweet.user.name}</span>&nbsp;
            <span style={{fontSize: h6}}>{moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').fromNow()}</span>
          </div>
          <div dangerouslySetInnerHTML={{__html: tweetText}}></div>
          {
            media.map(
              m => <TweetMedia key={m.id} media={m} style={{ marginTop: space1 }} />
            )
          }
          {
            urls.map(
              url => <LinkPreview url={url} />
            )
          }
          <div style={{marginTop: space1}}>
            <IconButton ref='archiveButton' onClick={this.archive} icon='archive' />
          </div>
        </div>
      </div>
    )
  }
}

Tweet.propTypes = {
  tweet: PropTypes.shape({
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user: PropTypes.shape({
      profile_image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  }),
  onArchive: PropTypes.func,
}

export default Tweet
