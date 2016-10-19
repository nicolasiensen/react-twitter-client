import React, { Component } from 'react'

import Box from './Box'
import Button from './Button'
import Input from './Input'
import * as api from './../lib/api'
import storage from './../lib/storage'
import { space1 } from './../lib/styles'

class Login extends Component {
  constructor (props) {
    super(props)

    this.changePincode = this.changePincode.bind(this)
    this.submitPincode = this.submitPincode.bind(this)
    this.redirectToAuthorizeUrl = this.redirectToAuthorizeUrl.bind(this)

    this.state = {
      loadingRequestToken: false,
      pincode: ''
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

  changePincode (event) {
    this.setState({pincode: event.target.value})
  }

  submitPincode () {
    api.loadAccessToken(
      storage.getItem('requestToken').token,
      storage.getItem('requestToken').secret,
      this.state.pincode
    ).end((err, res) => this.props.onAccessTokenLoaded(res.body))
  }

  render() {
    return (
      <Box style={{maxWidth: '25rem'}}>
        <p>
          Welcome! Click on the button bellow to authorize the APP to access your Twitter account.
        </p>
        <p>
          <Button
            ref='authorizeButton'
            disabled={this.state.loadingRequestToken}
            onClick={this.redirectToAuthorizeUrl}>
            {this.state.loadingRequestToken ? 'Loading...' : 'Authorize'}
          </Button>
        </p>
        <p>
          After authorizing the APP you can come back here to enter your pincode:
        </p>
        <p>
          <Input
            onChange={this.changePincode}
            placeholder='Pincode'
            ref='pinCodeInput'
            style={{marginRight: space1}}
            value={this.state.pincode}
          />
          <Button ref='submitPinCodeButton' onClick={this.submitPincode}>Submit pincode</Button>
        </p>
      </Box>
    )
  }
}

Login.propTypes = {
  onAccessTokenLoaded: React.PropTypes.func.isRequired
}

export default Login
