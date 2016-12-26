import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import storage from './lib/storage'
import * as background from './lib/background'
import './index.css'

storage.setItem('archivedTweetsIds', storage.getItem('archivedTweetsIds') || [])
storage.setItem('tweets', storage.getItem('tweets') || [])
storage.setItem('loading', storage.getItem('loading') || false)

if (document.getElementById('root')) {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
} else {
  background.init()
}
