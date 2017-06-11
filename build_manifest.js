console.log("Building Chrome extension manifest...")

const fs = require('fs')

function writeManifest (options) {
  const manifest = JSON.stringify(
    {
      manifest_version: 2,
      version: "1.0",
      name: "T-Inbox",
      description: "Receive tweets and organize them just like as an inbox",
      "icons": {
        "16": "icons/t-inbox16.png",
        "48": "icons/t-inbox48.png",
        "128": "icons/t-inbox128.png"
      },
      browser_action: {
        default_icon: {
          "16": "icons/t-inbox16.png",
          "48": "icons/t-inbox48.png",
          "128": "icons/t-inbox128.png"
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
