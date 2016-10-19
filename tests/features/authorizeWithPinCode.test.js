import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

import App from './../../src/components/App'
import Login from './../../src/components/Login'
import Timeline from './../../src/components/Timeline'
import Tweet from './../../src/components/Tweet'
import storage from './../../src/lib/storage'

import mockLocalStorage from './../mockLocalStorage'
mockLocalStorage()

import fakeTweets from './../tweets.json'
import { mockRequest } from 'superagent'
mockRequest(`${process.env.REACT_APP_API_HOST}/`, fakeTweets)
mockRequest(`${process.env.REACT_APP_API_HOST}/request_token`, {token: 'RT123456', secret: 'RT654321'})
mockRequest(`${process.env.REACT_APP_API_HOST}/access_token`, {token: 'AT123456', secret: 'AT654321'})

it('stores the access token and renders the timeline tweets', () => {
  const div = document.createElement('div')
  const app = ReactDOM.render(<App />, div)
  const login = ReactTestUtils.findRenderedComponentWithType(app, Login)
  const authorizeButton = ReactTestUtils.findRenderedDOMComponentWithTag(login.refs.authorizeButton, 'button')
  const pinCodeInput = ReactTestUtils.findRenderedDOMComponentWithTag(login.refs.pinCodeInput, 'input')
  const submitPinCodeButton = ReactTestUtils.findRenderedDOMComponentWithTag(login.refs.submitPinCodeButton, 'button')

  ReactTestUtils.Simulate.click(authorizeButton)

  expect(storage.getItem('requestToken').token).toBe('RT123456')
  expect(storage.getItem('requestToken').secret).toBe('RT654321')

  ReactTestUtils.Simulate.change(pinCodeInput, { target: { value: '123456'}})
  ReactTestUtils.Simulate.click(submitPinCodeButton)

  expect(storage.getItem('accessToken').token).toBe('AT123456')
  expect(storage.getItem('accessToken').secret).toBe('AT654321')

  const timeline = ReactTestUtils.findRenderedComponentWithType(app, Timeline)
  const tweets = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet)

  expect(tweets.length).toBe(fakeTweets.length)
})
