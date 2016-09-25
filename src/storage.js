const storage = {}

storage.setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

storage.getItem = (key) => {
  if (window.localStorage.getItem(key)) {
    return JSON.parse(window.localStorage.getItem(key))
  } else {
    return undefined
  }
}

storage.clear = () => {
  window.localStorage.clear()
}

export default storage
