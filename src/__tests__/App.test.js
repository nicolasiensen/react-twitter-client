import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

import App from './../components/App'
import Timeline from './../components/Timeline'
import Login from './../components/Login'
import * as storage from './../lib/storage'
import { mockRequest } from 'superagent'
import fakeTweets from './../lib/tweets.json'
import mockLocalStorage from './../lib/mockLocalStorage'
import { REACT_APP_API_HOST } from './../lib/env'

mockLocalStorage()
mockRequest(`${REACT_APP_API_HOST}/`, { tweets: fakeTweets.slice(0, 5) })
mockRequest(`${REACT_APP_API_HOST}/request_token`, {})

it('renders the authentication when there is no access token', () => {
  const div = document.createElement('div')
  const component = ReactDOM.render(<App />, div)
  const authentication = ReactTestUtils.scryRenderedComponentsWithType(component, Login)
  expect(authentication.length).toBe(1)
})

it("renders the timeline when there is an access token", () => {
  storage.setAccessToken({token: '123', secret: '321'})
  const div = document.createElement('div')
  const component = ReactDOM.render(<App />, div)
  const timeline = ReactTestUtils.scryRenderedComponentsWithType(component, Timeline)
  expect(timeline.length).toBe(1)
  storage.clear()
})
