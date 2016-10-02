import React, { Component } from 'react'

import { loadRequestToken, loadAccessToken } from './../lib/api'
import storage from './../lib/storage'

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

    loadRequestToken().end(
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
    loadAccessToken(
      storage.getItem('requestToken').token,
      storage.getItem('requestToken').secret,
      this.state.pincode
    ).end((err, res) => this.props.onAccessTokenLoaded(res.body))
  }

  render() {
    return (
      <div>
        <p>
          Welcome! Click on the button bellow to authorize the APP to access your Twitter account.
        </p>
        <p>
          <button
            ref='authorizeButton'
            disabled={this.state.loadingRequestToken}
            onClick={this.redirectToAuthorizeUrl}>
            {this.state.loadingRequestToken ? 'Loading...' : 'Authorize'}
          </button>
        </p>
        <p>
          After authorizing the APP you can come back here to enter your pincode:
        </p>
        <p>
          <input ref='pinCodeInput' placeholder='Pincode' value={this.state.pincode} onChange={this.changePincode} />
          <button ref='submitPinCodeButton' onClick={this.submitPincode}>Submit pincode</button>
        </p>
      </div>
    )
  }
}

export default Login
