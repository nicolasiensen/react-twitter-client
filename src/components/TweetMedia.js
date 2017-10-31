import React, { Component } from 'react'

class TweetMedia extends Component {
  render() {
    return (
      <div style={this.props.style}>
        {
          this.props.media.type === "photo" ? (
            <a href={this.props.media.media_url}>
              <img style={{ width: '100%' }} alt={this.props.media.url} src={this.props.media.media_url} />
            </a>
          ) : (
            <video style={{ width: '100%' }} controls>
              <source src={this.props.media.video_info.variants[0].url} type={this.props.media.video_info.variants[0].content_type} />
            </video>
          )
        }
      </div>
    )
  }
}

export default TweetMedia
