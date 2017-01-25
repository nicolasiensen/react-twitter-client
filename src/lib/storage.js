const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const getItem = (key) => {
  if (window.localStorage.getItem(key)) {
    return JSON.parse(window.localStorage.getItem(key))
  } else {
    return undefined
  }
}

export function getUnarchivedTweets() {
  return getTweets().filter(t => {
    return (
      t.retweeted_status
      ? !getItem('archivedTweetsIds').includes(t.retweeted_status.id)
      : !getItem('archivedTweetsIds').includes(t.id))
  })
}

export function getAccessToken() {
  return getItem('accessToken')
}

export function setAccessToken(accessToken) {
  setItem('accessToken', accessToken)
}

export function getTweets() {
  return getItem('tweets')
}

export function archiveTweet(tweetId) {
  setItem('archivedTweetsIds', getItem('archivedTweetsIds').concat(tweetId))
}

export function startLoadingTweets() {
  setItem('loading', true)
}

export function finishLoadingTweets(tweets) {
  setItem('loading', false)
  setItem('tweets', tweets.concat(getTweets().filter(t => !tweets.map(t => t.id).includes(t.id))))
}

export function isLoading() {
  return getItem('loading')
}

export function init() {
  setItem('archivedTweetsIds', getItem('archivedTweetsIds') || [])
  setItem('tweets', getItem('tweets') || [])
  setItem('loading', getItem('loading') || false)
}

export function setRequestToken(requestToken) {
  setItem('requestToken', requestToken)
}

export function getRequestToken() {
  return getItem('requestToken')
}

export function clear() {
  localStorage.clear()
}
