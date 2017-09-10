Feature('Authorize with my PIN code');

Scenario('when the PIN code is valid', function* (I) {
  I.amOnPage('/')
  I.click('Get my PIN')
  I.waitTabsLoading(2)

  // Use this code when you need to get a new pin code from Twitter
  I.changeTab(2)
  I.fillField('#username_or_email', process.env.TWITTER_USERNAME)
  I.fillField('#password', process.env.TWITTER_PASSWORD)
  I.click('Authorize app')
  const pin = yield I.grabTextFrom('code');

  // const pin = '1234567'

  I.changeTab(1)
  I.fillField('PIN', pin)
  I.click('Go')
  I.waitForElement('[id^=tweet-]', 2);
  I.seeNumberOfElements('[id^=tweet-]', 20)
});
