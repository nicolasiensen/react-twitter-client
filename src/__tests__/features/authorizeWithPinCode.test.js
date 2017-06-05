import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

import App from './../../components/App'
import Login from './../../components/Login'
import Timeline from './../../components/Timeline'
import Tweet from './../../components/Tweet'
import * as storage from './../../lib/storage'

import mockLocalStorage from './../../lib/mockLocalStorage'
mockLocalStorage()

import fakeTweets from './../../lib/tweets.json'
import { mockRequest } from 'superagent'
mockRequest(`${process.env.REACT_APP_API_HOST}/`, {tweets: fakeTweets})
mockRequest(`${process.env.REACT_APP_API_HOST}/request_token`, {token: 'RT123456', secret: 'RT654321'})
mockRequest(`${process.env.REACT_APP_API_HOST}/access_token`, {token: 'AT123456', secret: 'AT654321'})

it('stores the access token and renders the timeline tweets', () => {
  storage.init()
  const div = document.createElement('div')
  const app = ReactDOM.render(<App />, div)
  const login = ReactTestUtils.findRenderedComponentWithType(app, Login)
  const authorizeButton = ReactTestUtils.findRenderedDOMComponentWithTag(login.refs.authorizeButton, 'button')
  const pinInput = ReactTestUtils.findRenderedDOMComponentWithTag(login.refs.pinInput, 'input')
  const submitPinButton = ReactTestUtils.findRenderedDOMComponentWithTag(login.refs.submitPinButton, 'button')

  ReactTestUtils.Simulate.click(authorizeButton)

  expect(storage.getRequestToken().token).toBe('RT123456')
  expect(storage.getRequestToken().secret).toBe('RT654321')

  ReactTestUtils.Simulate.change(pinInput, { target: { value: '123456'}})
  ReactTestUtils.Simulate.click(submitPinButton)

  expect(storage.getAccessToken().token).toBe('AT123456')
  expect(storage.getAccessToken().secret).toBe('AT654321')

  const timeline = ReactTestUtils.findRenderedComponentWithType(app, Timeline)

  expect(timeline).toBeDefined()
})
