import * as storage from './storage'
import * as api from './api'
import chrome from './chrome'

let tweetsCount = 0

export function init() {
  loadTweets()

  chrome.alarms.create('loadTweets', {periodInMinutes: 1})
  chrome.alarms.onAlarm.addListener(event => event.name === 'loadTweets' && loadTweets())
  chrome.runtime.onMessage.addListener(handleChromeMessage)
  chrome.runtime.onMessageExternal.addListener(handleChromeMessage)
}

function handleChromeMessage(request) {
  console.log("message received!")
  if(request.action === 'decreaseTweetCount') {
    tweetsCount -= 1
  } else if (request.action === 'updateTweetCount') {
    tweetsCount = request.value
  }

  updateBadgeText()
}

function updateBadgeText() {
  chrome.browserAction.setBadgeText({text: tweetsCount === 0 ? '' : tweetsCount > 99 ? '99+' : tweetsCount.toString()})
}

function loadTweets() {
  const accessToken = storage.getAccessToken()

  if (accessToken) {
    api.loadTweets(accessToken.token, accessToken.secret).end(
      (err, res) => {
        if (err) {
          console.log(err)
        } else {
          tweetsCount = res.body.total
          updateBadgeText()
        }
      }
    )
  }
}
