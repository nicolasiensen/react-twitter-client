import request from 'superagent'

export function loadTweets () {
  return request.get('http://localhost:3001/')
}
