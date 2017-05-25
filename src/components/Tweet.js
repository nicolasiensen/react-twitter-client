import React, { Component } from 'react'
import moment from 'moment'

import IconButton from './IconButton'
import { borderRadius, space1, space2, lightGray, white, h6, fontBold, blue } from './../lib/styles'

function linkify(tweet) {
  let newText = tweet.text

  tweet.entities.urls.forEach(url => {
    newText = newText.replace(
      url.url,
      `<a style='color: ${blue}' target='_blank' href='${url.expanded_url}'>${url.url}</a>`
    )
  })

  if (tweet.extended_entities) {
    tweet.extended_entities.media.forEach(media => {
      newText = newText.replace(
        media.url,
        `<a style='color: ${blue}' target='_blank' href='${media.expanded_url}'>${media.url}</a>`
      )
    })
  }

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
    const { tweet, retweetedBy } = this.props

    return (
      <div style={{padding: space2, borderBottom: `1px solid ${lightGray}`, background: white, display: 'flex'}}>
        <div style={{marginRight: space1}}>
          <img alt={tweet.user.name} style={{borderRadius: borderRadius}} src={tweet.user.profile_image_url} />
        </div>
        <div style={{overflow: 'hidden'}}>
          <div style={{fontSize: h6}}>{retweetedBy && `Retweeted by ${retweetedBy.name}`}</div>
          <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
            <span style={{fontWeight: fontBold}}>{tweet.user.name}</span>&nbsp;
            <span style={{fontSize: h6}}>{moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').fromNow()}</span>
          </div>
          <div dangerouslySetInnerHTML={{__html: linkify(tweet)}}></div>
          <div style={{marginTop: space1}}>
            <IconButton ref='archiveButton' onClick={this.archive} icon='archive' />
          </div>
        </div>
      </div>
    )
  }
}

Tweet.propTypes = {
  tweet: React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    created_at: React.PropTypes.string.isRequired,
    user: React.PropTypes.shape({
      profile_image_url: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
    })
  }),
  retweetedBy: React.PropTypes.shape({
    profile_image_url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }),
  onArchive: React.PropTypes.func,
}

export default Tweet
