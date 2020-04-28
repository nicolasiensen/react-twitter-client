Nico was here!

This project is built on top of [Create React App](https://github.com/facebookincubator/create-react-app).

## Getting started
In order to have this app fully functional, you need a working instance of [the t-inbox-api](https://github.com/nicolasiensen/t-inbox-api).

Make sure also to create a file `.env` in the root folder, you should use the `.sample.env` as a template.

In the next steps you are going to install the dependencies, start the app, run all automated tests and pack the project into a build using [yarn](https://yarnpkg.com/en/):

```shell
# Install the dependencies
yarn install

# Start the app
yarn start

# Run all automated tests
yarn test

# Pack the project into a build
yarn build
```

## Chrome extension
This app can also be used as a Chrome extension, the build script will generate everything you need and place all the files in the build folder.
