console.log("Building Chrome extension manifest...")

const fs = require('fs')

function writeManifest (options) {
  const manifest = JSON.stringify(
    {
      manifest_version: 2,
      version: "0.1",
      name: "React Twitter Client",
      description: "This extension shows your unread tweets",
      browser_action: {
        default_icon: "favicon.ico",
        default_popup: "index.html"
      },
      permissions: [
        "storage",
        "alarms",
        process.env.REACT_APP_API_HOST + "/"
      ],
      background: {
        scripts: ['static/js/' + options.backgroundFileName],
        persistent: false
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
