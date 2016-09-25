import React, { Component } from 'react'
import { loadRequestToken, loadAccessToken } from './api'
import storage from './storage'

class Login extends Component {
  constructor (props) {
    super(props)

    this.changePincode = this.changePincode.bind(this)
    this.submitPincode = this.submitPincode.bind(this)

    this.state = {
      loadingRequestToken: false,
      pincode: ''
    }
  }

  componentWillMount() {
    this.setState({loadingRequestToken: true})

    loadRequestToken().end(
      (err, res) => {
        storage.setItem('requestToken', res.body)
        this.setState({loadingRequestToken: false})
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
      this.state.loadingRequestToken
      ? <div>Loading...</div>
      : (
        <div>
          <p>
            Welcome! Click on the button bellow to authorize the APP to access your Twitter account.
          </p>
          <p>
            <a href={storage.getItem('requestToken').authorize_url} target='_blank'>Authorize</a>
          </p>
          <p>
            After authorizing the APP you can come back here to enter your pincode:
          </p>
          <p>
            <input placeholder='Pincode' value={this.state.pincode} onChange={this.changePincode} />
            <button onClick={this.submitPincode}>Submit pincode</button>
          </p>
        </div>
      )
    )
  }
}

export default Login
