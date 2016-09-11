import superagent from 'superagent'
import superagentMock from 'superagent-mock'

superagentMock(superagent, [])

export function mockRequest (path, fixtures) {
  superagentMock(superagent, [
    {
      pattern: path,
      fixtures: () => fixtures,
      callback: function (match, data) {
        return { body : data }
      }
    }
  ])
}

export default superagent
