import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

import Timeline from './../../src/components/Timeline'
import Tweet from './../../src/components/Tweet'

import fakeTweets from './../tweets'
import { mockRequest } from 'superagent'
mockRequest(`${process.env.REACT_APP_API_HOST}/`, fakeTweets)

it('shows a loading message when it is loading tweets', () => {
  const div = document.createElement('div')
  const timeline = ReactDOM.render(<Timeline accessToken={{token: 'AT123456', secret: 'AT654321'}} />, div)
  timeline.setState({loading: true})

  expect(timeline.refs.loading).toBeDefined()
})

it('shows a list of tweets', () => {
  const div = document.createElement('div')
  const timeline = ReactDOM.render(<Timeline accessToken={{token: 'AT123456', secret: 'AT654321'}} />, div)
  const tweets = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet)

  expect(tweets.length).toBe(fakeTweets.length)
})

it('shows the original tweet of a retweet', () => {
  const div = document.createElement('div')
  const timeline = ReactDOM.render(<Timeline accessToken={{token: 'AT123456', secret: 'AT654321'}} />, div)
  const tweets = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet)
  const retweet = fakeTweets.find(t => t.retweeted_status)
  const retweetIndex = fakeTweets.indexOf(retweet)
  const retweetComponent = tweets[retweetIndex]

  expect(retweetComponent.props.tweet).toBe(retweet.retweeted_status)
  expect(retweetComponent.props.retweetedBy).toBe(retweet.user)
})
