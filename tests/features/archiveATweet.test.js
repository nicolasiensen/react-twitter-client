import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

import App from './../../src/components/App'
import Timeline from './../../src/components/Timeline'
import Tweet from './../../src/components/Tweet'
import * as storage from './../../src/lib/storage'
import * as api from './../../src/lib/api'
import afterPromises from './../afterPromises'

jest.mock('./../../src/lib/api')

import mockLocalStorage from './../mockLocalStorage'
mockLocalStorage()

import fakeTweets from './../tweets.json'

beforeEach(() => {
  api.loadTweets = jest.fn(() => new Promise(resolve => resolve({ body: { tweets: fakeTweets } })));
  spyOn(api, 'archiveTweet')
})

it('hides the archived tweets from the timeline', done => {
  // Login
  storage.init()
  storage.setAccessToken({token: 'AT123456', secret: 'AT654321'})

  const div = document.createElement('div')
  const app = ReactDOM.render(<App />, div)

  const timeline = ReactTestUtils.findRenderedComponentWithType(app, Timeline)

  afterPromises(done, () => {
    const tweetComponent = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet)[0]
    const archiveButton = ReactTestUtils.findRenderedDOMComponentWithTag(tweetComponent.refs.archiveButton, 'button')

    ReactTestUtils.Simulate.click(archiveButton)

    const tweetsAfterArchive = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet)

    expect(tweetsAfterArchive.map(t => t.props.tweet.id)).not.toContain(tweetComponent.props.tweet.id)
    expect(api.archiveTweet).toHaveBeenCalledWith('AT123456', 'AT654321', tweetComponent.props.tweet.id_str)
  })
})
