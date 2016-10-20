import React, { Component } from 'react'

import Box from './Box'
import Button from './Button'
import Input from './Input'
import Text from './Text'
import * as api from './../lib/api'
import storage from './../lib/storage'
import { space2 } from './../lib/styles'

class Login extends Component {
  constructor (props) {
    super(props)

    this.changePin = this.changePin.bind(this)
    this.submitPin = this.submitPin.bind(this)
    this.redirectToAuthorizeUrl = this.redirectToAuthorizeUrl.bind(this)

    this.state = {
      loadingRequestToken: false,
      pin: ''
    }
  }

  redirectToAuthorizeUrl () {
    this.setState({loadingRequestToken: true})

    api.loadRequestToken().end(
      (err, res) => {
        storage.setItem('requestToken', res.body)
        this.setState({loadingRequestToken: false})
        window.open(res.body.authorize_url)
      }
    )
  }

  changePin (event) {
    this.setState({pin: event.target.value})
  }

  submitPin () {
    api.loadAccessToken(
      storage.getItem('requestToken').token,
      storage.getItem('requestToken').secret,
      this.state.pin
    ).end((err, res) => this.props.onAccessTokenLoaded(res.body))
  }

  render() {
    return (
      <Box style={{maxWidth: '25rem'}}>
        <Text>Click on the button bellow to get your PIN:</Text>
        <Button
          style={{marginBottom: space2}}
          ref='authorizeButton'
          disabled={this.state.loadingRequestToken}
          onClick={this.redirectToAuthorizeUrl}>
          {this.state.loadingRequestToken ? 'Loading...' : 'Get my PIN'}
        </Button>
        <Text>Once you have your PIN, submit it in the following form:</Text>
        <Input
          inline
          onChange={this.changePin}
          placeholder='PIN'
          ref='pinInput'
          value={this.state.pin}
        />
        <Button inline ref='submitPinButton' onClick={this.submitPin}>Go</Button>
      </Box>
    )
  }
}

Login.propTypes = {
  onAccessTokenLoaded: React.PropTypes.func.isRequired
}

export default Login
