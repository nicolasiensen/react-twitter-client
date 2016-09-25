import request from 'superagent'

export function loadTweets (accessToken, accessTokenSecret) {
  return request.get(`${process.env.REACT_APP_API_HOST}/`).query({
    twitter_access_token: accessToken,
    twitter_access_token_secret: accessTokenSecret
  })
}

export function loadRequestToken () {
  return request.get(`${process.env.REACT_APP_API_HOST}/request_token`)
}

export function loadAccessToken (oauthToken, oauthTokenSecret, oauthVerifier) {
  return request.get(`${process.env.REACT_APP_API_HOST}/access_token`).query({
    oauth_token: oauthToken,
    oauth_token_secret: oauthTokenSecret,
    oauth_verifier: oauthVerifier
  })
}
