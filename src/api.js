import request from 'superagent'

export function loadTweets (accessToken, accessTokenSecret) {
  return request.get(`${process.env.REACT_APP_API_HOST}`).query({
    twitter_access_token: accessToken,
    twitter_access_token_secret: accessTokenSecret
  })
}
