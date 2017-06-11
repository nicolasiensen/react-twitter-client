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

export function getAccessToken() {
  return getItem('accessToken')
}

export function setAccessToken(accessToken) {
  setItem('accessToken', accessToken)
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
