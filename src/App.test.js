import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

import App from './App'
import Tweet from './Tweet'

import { mockRequest } from 'superagent'
import fakeTweets from './tweets.json'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it('renders a list of tweets', () => {
  mockRequest('http://localhost:3001/', fakeTweets.slice(0, 5))
  const div = document.createElement('div')
  const component = ReactDOM.render(<App />, div)
  const tweets = ReactTestUtils.scryRenderedComponentsWithType(component, Tweet)
  expect(tweets.length).toBe(5)
})
