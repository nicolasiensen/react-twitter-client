This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Getting started
In order to have this app fully functional you need to have [the API](https://github.com/nicolasiensen/t-inbox-api) running as well.

If you already have the API in place, you can run the following commands:

```shell
# Install dependencies
npm install

# Start the app
# Replace http://localhost:3000 with the host you are running the API
REACT_APP_API_HOST=http://localhost:3000 npm start
```

If you want to integrate the app with the extension, you can add the environment variable `REACT_APP_EXTENSION_ID` in the start command.

By doing this, the app will exchange messages with the extension.

## Testing
```shell
npm run test
```

## Chrome extension
This app can be also used as a Chrome extension, to install it to your extensions you will have to generate a build with a manifest file:

```shell
REACT_APP_API_HOST=http://localhost:3000 REACT_APP_EXTENSION_ID=123 REACT_APP_HOST=tinbox.com npm run build
```

The `REACT_APP_HOST` is important only if you want to integrate the web app with the extension, by providing this environment variable the web app will exchange messages with the extension.

Now you can install it as a Chrome extension using the `build` folder.
