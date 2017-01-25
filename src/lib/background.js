/* global chrome:true */

import * as storage from './storage'
import * as api from './api'

export function init() {
  updateBadgeText()
  window.addEventListener('storage', event => updateBadgeText())
  window.addEventListener('storage', event => event.key === 'accessToken' && loadTweets())

  loadTweets()
  chrome.alarms.create('loadTweets', {periodInMinutes: 1})
  chrome.alarms.onAlarm.addListener(event => event.name === 'loadTweets' && loadTweets())
}

function updateBadgeText() {
  const total = storage.getUnarchivedTweets().length
  chrome.browserAction.setBadgeText({text: total === 0 ? '' : total > 99 ? '99+' : total.toString()})
}

function loadTweets() {
  const accessToken = storage.getAccessToken()

  if (accessToken) {
    storage.startLoadingTweets()
    api.loadTweets(accessToken.token, accessToken.secret).end(
      (err, res) => {
        if (err) {
          console.log(err)
        } else {
          storage.finishLoadingTweets(res.body)

          // The localStorage event listeners are not triggered if the event is emmited in the same page
          // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Responding_to_storage_changes_with_the_StorageEvent
          // So we have to call the listeners manually sometimes, like in this case
          updateBadgeText()
        }
      }
    )
  }
}
