import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as storage from './lib/storage'
import * as background from './lib/background'
import './index.css'

storage.init()

if (document.getElementById('root')) {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
} else {
  background.init()
}
