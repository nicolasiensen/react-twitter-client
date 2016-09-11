import React, { Component } from 'react'
import { loadTweets } from './api'
import Tweet from './Tweet'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {tweets: []}
  }

  componentWillMount() {
    loadTweets().end(
      (err, res) => {
        this.setState({tweets: res.body})
      }
    )
  }

  render() {
    return (
      <div>
        {
          this.state.tweets.map(tweet => <Tweet key={tweet.id} text={tweet.text} />)
        }
      </div>
    )
  }
}

export default App
