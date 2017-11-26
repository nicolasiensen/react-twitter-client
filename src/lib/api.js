import request from 'superagent'
import { REACT_APP_API_HOST } from './env'

export function loadTweets (accessToken, accessTokenSecret) {
  return request.get(`${REACT_APP_API_HOST}/`).query({
    twitter_access_token: accessToken,
    twitter_access_token_secret: accessTokenSecret
  })
}

export function loadRequestToken () {
  return request.get(`${REACT_APP_API_HOST}/request_token`)
}

export function loadAccessToken (oauthToken, oauthTokenSecret, oauthVerifier) {
  return request.get(`${REACT_APP_API_HOST}/access_token`).query({
    oauth_token: oauthToken,
    oauth_token_secret: oauthTokenSecret,
    oauth_verifier: oauthVerifier
  })
}

export function archiveTweet (accessToken, accessTokenSecret, tweetId) {
  return request.put(`${REACT_APP_API_HOST}/tweets/${tweetId}/archive`).send({
    twitter_access_token: accessToken,
    twitter_access_token_secret: accessTokenSecret
  })
}

export function loadLinkPreview (link) {
  return request.get(`${REACT_APP_API_HOST}/link_preview`).query({link})
}
