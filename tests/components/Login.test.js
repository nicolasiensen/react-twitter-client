import React from 'react'
import ReactDOM from 'react-dom'

import Login from './../../src/components/Login'
import * as storage from './../../src/lib/storage'

import mockLocalStorage from './../mockLocalStorage'
mockLocalStorage()

import { mockRequest } from 'superagent'
mockRequest(`${process.env.REACT_APP_API_HOST}/request_token`, {token: 'RT123456', secret: 'RT654321'})
mockRequest(`${process.env.REACT_APP_API_HOST}/access_token`, {token: 'AT123456', secret: 'AT654321'})

it('disables the authorize button when loading the request token', () => {
  const div = document.createElement('div')
  const login = ReactDOM.render(<Login onAccessTokenLoaded={() => {}} />, div)
  const authorizeButton = login.refs.authorizeButton

  login.setState({loadingRequestToken: true})

  expect(authorizeButton.props.disabled).toBe(true)
  expect(authorizeButton.props.children).toBe('Loading...')
})

it('stores the request token', () => {
  const div = document.createElement('div')
  const login = ReactDOM.render(<Login onAccessTokenLoaded={() => {}} />, div)

  login.redirectToAuthorizeUrl()

  expect(storage.getRequestToken()).toEqual({token: 'RT123456', secret: 'RT654321'})
})

it('updates the state when the pin input is changed', () => {
  const div = document.createElement('div')
  const login = ReactDOM.render(<Login onAccessTokenLoaded={() => {}} />, div)

  login.changePin({target: { value: 'PIN123456' }})

  expect(login.state.pin).toBe('PIN123456')
})

it('loads the access token and pass it along to the onAccessTokenLoaded prop callback', () => {
  const div = document.createElement('div')
  const onAccessTokenLoaded = jest.fn()
  const login = ReactDOM.render(<Login onAccessTokenLoaded={onAccessTokenLoaded} />, div)

  login.redirectToAuthorizeUrl()
  login.changePin({target: { value: 'PIN123456' }})
  login.submitPin()

  expect(onAccessTokenLoaded.mock.calls.length).toBe(1)
  expect(onAccessTokenLoaded.mock.calls[0][0]).toEqual({token: 'AT123456', secret: 'AT654321'})
})
