jest.mock('./lib/chrome', () => (
  {
    runtime: {
      sendMessage: jest.fn()
    }
  }
))
