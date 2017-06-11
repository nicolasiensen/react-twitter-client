import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as background from './lib/background'
import './index.css'

if (document.getElementById('root')) {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
} else {
  background.init()
}
