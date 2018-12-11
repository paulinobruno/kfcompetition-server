#!/bin/bash

DEBUG=paal:*
NODE_PATH=src/main/server/
export DEBUG NODE_PATH

case "$1" in
  start)
    echo 'Starting server...'
    PORT=5000
    NODE_ENV=development
    export PORT NODE_ENV
    nodemon src/main/server/bin/www $ENV
    exit 0
  ;;
  deploy)
    echo 'Deploying to Heroku...'
    git push heroku master -f
  ;;
  test)
    echo 'Testing...'
    MOCHA_OPTS="--recursive --require src/tests/globalSetup.js --timeout 5000"
    MONGO_URI="mongodb://localhost/paal-kfcompetition-test"
    AUTH0_TOKEN_ENDPOINT="http://localhost:8888/oauth/token"

    NODE_ENV=test
    export NODE_ENV MONGO_URI AUTH0_TOKEN_ENDPOINT

    nyc mocha $MOCHA_OPTS src/tests/e2e/* src/tests/unit/*
  ;;
  *)
    echo "Usage: {start|deploy|test}"
    exit 1
  ;;
esac
