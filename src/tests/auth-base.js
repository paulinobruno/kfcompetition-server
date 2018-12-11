'use strict';

const { OK } = require('controllers/HttpStatus');
const Token = require('models/Token');
const jwt = require('jsonwebtoken');
const { connection } = require('mongoose');

before(done => {
  mongo.init();

  new Token({
    username: 'test@paal.com',
    appToken: 'bearer-token',
    access_token: 'bearer-token',
    refresh_token: '123',
    id_token: jwt.sign({}, 'secret', {
      expiresIn: '2 days'
    })
  }).save().then(() => done());
});

beforeEach(() => {
  nock('http://localhost:8888')
    .post('/oauth/token')
    .reply(OK, {
      data: {
        access_token: '123',
        id_token: '456'
      }
    });
});

beforeEach(done => {
  new Token({
    username: 'expired@paal.com',
    appToken: 'expired-token',
    access_token: 'expired-token',
    refresh_token: 'expired-token-refresh',
    id_token: jwt.sign({}, 'secret', {
      expiresIn: 0
    })
  }).save().then(() => done());
});

afterEach(done => {
  Token.deleteOne({ username: 'expired@paal.com' })
    .then(res => done());
});

after(done => {
  connection.dropCollection('tokens')
    .then(() => mongo.destroy())
    .then(() => done());
});
