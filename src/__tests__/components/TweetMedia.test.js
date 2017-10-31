import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'

import tweetWithPhoto from './../fixtures/tweetWithPhoto'
import tweetWithGif from './../fixtures/tweetWithGif'
import TweetMedia from './../../components/TweetMedia'

let media

describe('when the media is a photo', () => {
  beforeEach(() => media = tweetWithPhoto.extended_entities.media[0])

  it('shows the photo', () => {
    const component = ReactTestUtils.renderIntoDocument(<TweetMedia media={media} />)
    const img = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'img')
    expect(img.src).toBe(media.media_url)
  })

  it('shows a link to the photo', () => {
    const component = ReactTestUtils.renderIntoDocument(<TweetMedia media={media} />)
    const link = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'a')
    expect(link.href).toBe(media.media_url)
  })
})

describe('when the media is an animated gif', () => {
  beforeEach(() => media = tweetWithGif.extended_entities.media[0])

  it('shows the video that represents the animated gif', () => {
    const component = ReactTestUtils.renderIntoDocument(<TweetMedia media={media} />)
    const videoSource = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'source')
    expect(videoSource.src).toBe(media.video_info.variants[0].url)
    expect(videoSource.type).toBe(media.video_info.variants[0].content_type)
  })
})
