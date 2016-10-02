This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Getting started
In order to have this app fully functional you need to have [the API](https://github.com/nicolasiensen/react-twitter-api) running as well.

If you already have the API in place, you can run the following commands:

```shell
# Install dependencies
npm install

# Start the app
# Replace http://localhost:3000 with the host you are running the API
REACT_APP_API_HOST=http://localhost:3000 npm start
```

## Testing
```shell
npm run test
```

## Chrome extension
This app can be also used as a Chrome extension, to install it to your extensions you will have to generate a build with a manifest file:

```shell
REACT_APP_API_HOST=http://localhost:3000 npm run build && cp manifest.json build
```

Now you can install it as a Chrome extension using the `build` folder.
