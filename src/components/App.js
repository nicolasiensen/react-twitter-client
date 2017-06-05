import React, { Component } from 'react'

import Login from './Login'
import Timeline from './Timeline'
import Layout from './Layout'
import * as storage from './../lib/storage'

class App extends Component {
  constructor (props) {
    super(props)
    this.saveAccessToken = this.saveAccessToken.bind(this)
    this.loadAccessToken = this.loadAccessToken.bind(this)
  }

  componentWillMount() {
    this.loadAccessToken()
  }

  saveAccessToken (accessToken) {
    storage.setAccessToken(accessToken)
    this.loadAccessToken()
  }

  loadAccessToken () {
    this.setState({accessToken: storage.getAccessToken()})
  }

  render() {
    return (
      <Layout>
        {
          this.state.accessToken
          ? <Timeline accessToken={this.state.accessToken} />
          : <Login onAccessTokenLoaded={this.saveAccessToken} />
        }
      </Layout>
    )
  }
}

export default App
