import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

import Timeline from './../../src/components/Timeline'
import Tweet from './../../src/components/Tweet'

import storage from './../../src/lib/storage'
import mockLocalStorage from './../mockLocalStorage'
mockLocalStorage()

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

it('initializes the archivedTweetsIds state from local storage', () => {
  const archivedTweetsIds = ['123', '456']
  storage.setItem('archivedTweetsIds', archivedTweetsIds)

  const div = document.createElement('div')
  const timeline = ReactDOM.render(<Timeline accessToken={{token: 'AT123456', secret: 'AT654321'}} />, div)

  expect(timeline.state.archivedTweetsIds).toEqual(archivedTweetsIds)
})


describe('#render', () => {
  it('shows only unarchived tweets', () => {
    const archivedTweet = fakeTweets[0].retweeted_status ? fakeTweets[0].retweeted_status : fakeTweets[0]
    const div = document.createElement('div')
    const timeline = ReactDOM.render(<Timeline accessToken={{token: 'AT123456', secret: 'AT654321'}} />, div)
    timeline.archiveTweet(archivedTweet)
    const tweets = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet)

    expect(tweets.map(t => t.props.tweet.id)).not.toContain(archivedTweet.id)
  })

  it('shows a message when there is no unarchived tweet', () => {
    const div = document.createElement('div')
    const timeline = ReactDOM.render(<Timeline accessToken={{token: 'AT123456', secret: 'AT654321'}} />, div)
    fakeTweets.forEach((tweet) => timeline.archiveTweet(tweet.retweeted_status ? tweet.retweeted_status : tweet))

    expect(timeline.refs.empty).toBeDefined()
  })
})

describe('#archiveTweet', () => {
  it('adds the archived tweet id in a list of archived tweets', () => {
    const div = document.createElement('div')
    const timeline = ReactDOM.render(<Timeline accessToken={{token: 'AT123456', secret: 'AT654321'}} />, div)

    timeline.archiveTweet(fakeTweets[0])

    expect(timeline.state.archivedTweetsIds).toContain(fakeTweets[0].id)
  })

  it('persists the list of archived tweets', () => {
    const div = document.createElement('div')
    const timeline = ReactDOM.render(<Timeline accessToken={{token: 'AT123456', secret: 'AT654321'}} />, div)

    timeline.archiveTweet(fakeTweets[0])

    expect(storage.getItem('archivedTweetsIds')).toContain(fakeTweets[0].id)
  })
})
