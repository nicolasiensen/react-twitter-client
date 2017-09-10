const selenium = require('selenium-standalone')
const express = require('express')
const app = express()
const server = require('http').createServer(app)

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/*', function (req, res) {
  const http = require('http')
  const replay = require('replay')
  replay.mode = 'record'

  http.get({ hostname: 'www.local.dev', port: 3001, path: req.url }, (r) => {
    var rawData = ''
    r.on('data', (chunk) => { rawData += chunk; });
    r.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        res.json(parsedData)
      } catch (e) {
        console.error(e.message);
      }
    });
  })
})

let seleniumProcess

module.exports = {
  bootstrap: async (done) => {
    await new Promise((resolve, reject) => {
      selenium.install({}, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })

    seleniumProcess = await new Promise((resolve, reject) => {
      selenium.start({}, (err, child) => {
        if (err) {
          reject(err)
        } else {
          resolve(child)
        }
      })
    })

    await new Promise(resolve => server.listen(3002, resolve))
    done()
  },

  teardown: async (done) => {
    seleniumProcess.kill()
    await new Promise(resolve => server.close(resolve))
    done()
  }
}
