import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

import Timeline from './../../src/components/Timeline'
import Tweet from './../../src/components/Tweet'
import * as api from './../../src/lib/api'

import fakeTweets from './../tweets'
import afterPromises from './../afterPromises'

let timeline
jest.mock('./../../src/lib/api')

const renderComponent = (props) => {
  const div = document.createElement('div')
  return ReactDOM.render(
    <Timeline accessToken={{token: 'AT123456', secret: 'AT654321'}} {...props} />, div
  )
}

beforeEach(() => {
  api.loadTweets = jest.fn(() => new Promise(resolve => resolve({ body: { tweets: fakeTweets } })))
  timeline = renderComponent()
})

it('should render the loading message', () => {
  expect(timeline.refs.loading).toBeDefined()
})

describe('when the tweets are loaded', () => {
  it('should not render the loading message', done => {
    afterPromises(done, () => expect(timeline.refs.loading).not.toBeDefined())
  })

  it('should render the list of tweets', done => {
    afterPromises(done, () => {
      const tweets = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet)
      expect(tweets.length).toBe(fakeTweets.length)
    })
  })

  it('should render the original tweet of a retweet', done => {
    afterPromises(done, () => {
      const tweets = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet)
      const retweet = fakeTweets.find(t => t.retweeted_status)
      const retweetIndex = fakeTweets.indexOf(retweet)
      const retweetComponent = tweets[retweetIndex]

      expect(retweetComponent.props.tweet).toEqual(retweet.retweeted_status)
      expect(retweetComponent.props.retweetedBy).toEqual(retweet.user)
    })
  })

  describe('when the tweets list is empty', () => {
    it('should render an empty message', done => {
      api.loadTweets = jest.fn(
        () => new Promise(
          resolve => resolve({ body: { tweets: [] } })
        )
      )

      timeline = renderComponent()

      afterPromises(done, () => {
        expect(timeline.refs.empty).toBeDefined()
      })
    })
  })
})

describe('when the tweets fail to load', () => {
  let error

  beforeEach(() => {
    error = new Error

    api.loadTweets = jest.fn(
      () => new Promise(
        (resolve, reject) => reject(error)
      )
    )

    timeline = renderComponent()
  })

  it('should render an error message', done => {
    afterPromises(done, () => {
      expect(timeline.refs.error).toBeDefined()
    })
  })
})
