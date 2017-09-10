Feature('Archive a tweet');

Scenario('when the tweet is successfully archived', function (I) {
  I.amOnPage('/')

  I.executeScript(function() {
    window.localStorage.setItem('accessToken', JSON.stringify({
      token: "twitter-token",
      secret: "twitter-secret"
    }))
  });

  I.amOnPage('/')

  I.click('#tweet-894124571124748300 button[title="Archive"]')
  I.dontSeeElement('#tweet-894124571124748300')
});
