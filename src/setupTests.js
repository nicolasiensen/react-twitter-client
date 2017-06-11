jest.mock('./lib/chrome', () => (
  {
    runtime: {
      sendMessage: jest.fn()
    }
  }
))

jest.mock('./lib/env', () => (
  {
    REACT_APP_EXTENSION_ID: "extension-id",
    REACT_APP_API_HOST: "http://apihost.com"
  }
))
