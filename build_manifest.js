require('dotenv').config()
console.log("Building Chrome extension manifest...")

const fs = require('fs')

if(!process.env.REACT_APP_ICON_NAME) {
  throw new Error("REACT_APP_ICON_NAME is not defined")
}

const icon16 = `icons/${process.env.REACT_APP_ICON_NAME}16.png`
const icon48 = `icons/${process.env.REACT_APP_ICON_NAME}48.png`
const icon128 = `icons/${process.env.REACT_APP_ICON_NAME}128.png`

function writeManifest (options) {
  const manifest = JSON.stringify(
    {
      manifest_version: 2,
      version: "1.1",
      name: "T-Inbox",
      description: "Receive tweets and organize them just like as an inbox",
      "icons": {
        "16": icon16,
        "48": icon48,
        "128": icon128
      },
      browser_action: {
        default_icon: {
          "16": icon16,
          "48": icon48,
          "128": icon128
        },
        default_title: "T-Inbox",
        default_popup: "index.html"
      },
      permissions: [
        "storage",
        "alarms",
        process.env.REACT_APP_API_HOST + "/",
        "*://" + process.env.REACT_APP_HOST + "/*"
      ],
      background: {
        scripts: ['static/js/' + options.backgroundFileName],
        persistent: false
      },
      externally_connectable: {
        matches: ["*://" + process.env.REACT_APP_HOST + "/*"]
      }
    }
  )

  fs.writeFile("build/manifest.json", manifest, function(err) {
    if (err) {
      console.log(err)
    }
  })
}

fs.readdir('./build/static/js', (err, files) => {
  if (err) {
    console.log(err)
  } else {
    writeManifest({backgroundFileName: files[0]})
  }
})
