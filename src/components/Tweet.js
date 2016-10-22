import React, { Component } from 'react'
import moment from 'moment'

import { borderRadius, space1, space2, lightGray, white, h6, fontBold } from './../lib/styles'

class Tweet extends Component {
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
          <div>{tweet.text}</div>
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
  })
}

export default Tweet
