export default function mockLocalStorage() {
  const localStorageMock = (
    () => {
      let store = {}
      return {
        getItem: function(key) {
          return store[key]
        },
        setItem: function(key, value) {
          store[key] = value
        },
        clear: function() {
          store = {}
        }
      }
    }
  )()

  Object.defineProperty(window, 'localStorage', { value: localStorageMock })
}
