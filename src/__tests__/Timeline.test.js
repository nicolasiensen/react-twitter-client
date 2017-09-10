import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

import Timeline from './../components/Timeline'
import Tweet from './../components/Tweet'
import * as api from './../lib/api'
import chrome from './../lib/chrome'

import fakeTweets from './../lib/tweets'
import afterPromises from './../lib/afterPromises'
import { REACT_APP_EXTENSION_ID } from './../lib/env'

let timeline
const accessToken = { token: 'AT123456', secret: 'AT654321' };

jest.mock('./../lib/api')

const renderComponent = (props) => {
  const div = document.createElement('div')
  return ReactDOM.render(<Timeline accessToken={accessToken} {...props} />, div)
}

beforeEach(() => {
  api.loadTweets = jest.fn(
    () => new Promise(resolve => {})
  )

  timeline = renderComponent()
})

it('should render the loading message', () => {
  expect(timeline.refs.loading).toBeDefined()
})

describe('when the tweets are loaded', () => {
  beforeEach(() => {
    api.loadTweets = jest.fn(
      () => new Promise(
        resolve => resolve({ body: { tweets: fakeTweets, total: fakeTweets.length } })
      )
    )
    timeline = renderComponent()
  })

  it('should not render the loading message', done => {
    afterPromises(done, () => expect(timeline.refs.loading).not.toBeDefined())
  })

  it('should render the list of tweets', done => {
    afterPromises(done, () => {
      const tweets = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet)
      expect(tweets.length).toBe(fakeTweets.length)
    })
  })

  it('should send a chrome message to update the tweets count', done => {
    afterPromises(done, () => {
      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(
        REACT_APP_EXTENSION_ID,
        {action: 'updateTweetCount', value: fakeTweets.length}
      )
    })
  })

  describe('when a tweet is archived', () => {
    let tweetToArchive;
    let renderedTweets;
    let renderedTweetToArchive;

    beforeEach((done) => {
      jest.spyOn(api, 'archiveTweet');
      tweetToArchive = fakeTweets[0];

      afterPromises(done, () => {
        renderedTweets = ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet);
        renderedTweetToArchive = renderedTweets.find(c => c.props.tweet.id_str === tweetToArchive.id_str);
        renderedTweetToArchive.props.onArchive(tweetToArchive);
      });
    });

    it('should remove the archived tweet from the list of tweets', () => {
      expect(ReactTestUtils.scryRenderedComponentsWithType(timeline, Tweet).length).toBe(fakeTweets.length - 1);
    });

    it('should call the API to archive the tweet', () => {
      expect(api.archiveTweet).toHaveBeenCalledWith(accessToken.token, accessToken.secret, tweetToArchive.id_str);
    });

    it('should send a chrome message to decrease the tweets count', () => {
      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(REACT_APP_EXTENSION_ID, {action: 'decreaseTweetCount'})
    })
  });

  describe('when the tweets list is empty', () => {
    it('should render an empty message', done => {
      api.loadTweets = jest.fn(
        () => new Promise(
          resolve => resolve({ body: { tweets: [] } })
        )
      )

      timeline = renderComponent()

      afterPromises(done, () => {
        expect(timeline.refs.empty).toBeDefined()
      })
    })
  })
})

describe('when the tweets fail to load', () => {
  let error

  beforeEach(() => {
    error = new Error()

    api.loadTweets = jest.fn(
      () => new Promise(
        (resolve, reject) => reject(error)
      )
    )

    timeline = renderComponent()
  })

  it('should render an error message', done => {
    afterPromises(done, () => {
      expect(timeline.refs.error).toBeDefined()
    })
  })
})
