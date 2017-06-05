import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import moment from 'moment'

import Tweet from './../../src/components/Tweet'
import fakeTweets from './../tweets'

const tweet = fakeTweets.find(t => !t.retweeted_status)
const retweetedTweet = fakeTweets.find(t => t.retweeted_status)

it('shows the tweet text', () => {
  const component = ReactTestUtils.renderIntoDocument(<Tweet tweet={tweet} />)
  const domNode = ReactDOM.findDOMNode(component)
  expect(domNode.textContent).toMatch(tweet.text.replace(/&amp;/g, '&'))
})

it('shows the profile image of the user', () => {
  const component = ReactTestUtils.renderIntoDocument(<Tweet tweet={tweet} />)
  const imgNode = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'img')
  expect(imgNode.src).toBe(tweet.user.profile_image_url)
})

it('shows the user name', () => {
  const component = ReactTestUtils.renderIntoDocument(<Tweet tweet={tweet} />)
  const domNode = ReactDOM.findDOMNode(component)
  expect(domNode.textContent).toMatch(tweet.user.name)
})

it('shows the tweet age', () => {
  const component = ReactTestUtils.renderIntoDocument(<Tweet tweet={tweet} />)
  const domNode = ReactDOM.findDOMNode(component)
  expect(domNode.textContent).toMatch(moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').fromNow())
})

it('shows who retweeted the original tweet', () => {
  const component = ReactTestUtils.renderIntoDocument(
    <Tweet tweet={retweetedTweet.retweeted_status} retweetedBy={retweetedTweet.user} />
  )
  const domNode = ReactDOM.findDOMNode(component)
  expect(domNode.textContent).toMatch(`Retweeted by ${retweetedTweet.user.name}`)
})

it('calls the onArchive callback when the archive button is pressed', () => {
  const handleArchive = jest.fn()
  const component = ReactTestUtils.renderIntoDocument(
    <Tweet tweet={retweetedTweet.retweeted_status} retweetedBy={retweetedTweet.user} onArchive={handleArchive} />
  )

  const archiveButton = ReactTestUtils.findRenderedDOMComponentWithTag(component.refs.archiveButton, 'button')

  ReactTestUtils.Simulate.click(archiveButton)

  expect(handleArchive).toBeCalledWith(retweetedTweet.retweeted_status)
})
