# Simple react-redux-app with Node Express Backend and React Apollo + GraphQL

> React-redux-app with a Node Express Backend

## Usage

Install [nodemon](https://github.com/remy/nodemon) globally

```
npm i nodemon -g
```

Install server and client dependencies

```
yarn
cd client
yarn
```

To start the server and client at the same time (from the root of the project)

```
yarn dev
```

Running the production build on localhost. This will create a production build, then Node will serve the app on http://localhost:8000

```
NODE_ENV=production yarn dev:server
```

## Set proxy to run Express backend with react-redux-app

```
"proxy": "http://localhost:8000/"
```

This will proxy our API requests to our API server, since Express server is running on **localhost:8000**

## Run React Apollo + GraphQL app

```
cd react-apollo-express
yarn
yarn dev
```