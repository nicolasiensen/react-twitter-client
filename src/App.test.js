import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

import App from './App'
import Timeline from './Timeline'
import Login from './Login'
import storage from './storage'

import mockLocalStorage from './mockLocalStorage'
mockLocalStorage()

import { mockRequest } from 'superagent'
import fakeTweets from './tweets.json'
mockRequest(`${process.env.REACT_APP_API_HOST}/`, fakeTweets.slice(0, 5))
mockRequest(`${process.env.REACT_APP_API_HOST}/request_token`, {})

it('renders the authentication when there is no access token', () => {
  const div = document.createElement('div')
  const component = ReactDOM.render(<App />, div)
  const authentication = ReactTestUtils.scryRenderedComponentsWithType(component, Login)
  expect(authentication.length).toBe(1)
})

it("renders the timeline when there is an access token", () => {
  storage.setItem('accessToken', {token: '123', secret: '321'})
  const div = document.createElement('div')
  const component = ReactDOM.render(<App />, div)
  const timeline = ReactTestUtils.scryRenderedComponentsWithType(component, Timeline)
  expect(timeline.length).toBe(1)
  storage.clear()
})
