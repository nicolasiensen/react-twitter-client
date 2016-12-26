import storage from './storage'

export function init() {
  updateBadgeText()
  window.addEventListener('storage', event => updateBadgeText())
}

function updateBadgeText() {
  const total = storage.getItem('tweets').length - storage.getItem('archivedTweetsIds').length
  chrome.browserAction.setBadgeText({text: total === 0 ? '' : total > 99 ? '99+' : total.toString()})
}
