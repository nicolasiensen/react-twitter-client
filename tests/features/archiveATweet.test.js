import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

import App from './../../src/components/App'
import Timeline from './../../src/components/Timeline'
import Tweet from './../../src/components/Tweet'
import * as storage from './../../src/lib/storage'

import mockLocalStorage from './../mockLocalStorage'
mockLocalStorage()

import fakeTweets from './../tweets.json'
import { mockRequest } from 'superagent'
mockRequest(`${process.env.REACT_APP_API_HOST}/`, fakeTweets)

it('hides the archived tweets from the timeline', () => {
  // Login
  storage.init()
  storage.setAccessToken({token: 'AT123456', secret: 'AT654321'})
  storage.finishLoadingTweets(fakeTweets)

  const div = document.createElement('div')
  const app = ReactDOM.render(<App />, div)

  const timeline = ReactTestUtils.findRenderedComponentWithType(app, Timeline)
  const tweetComponent = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet)[0]
  const archiveButton = ReactTestUtils.findRenderedDOMComponentWithTag(tweetComponent.refs.archiveButton, 'button')

  ReactTestUtils.Simulate.click(archiveButton)

  const tweetsAfterArchive = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet)

  expect(tweetsAfterArchive.map(t => t.props.tweet.id)).not.toContain(tweetComponent.props.tweet.id)
})
