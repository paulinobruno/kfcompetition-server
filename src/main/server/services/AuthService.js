'use strict';

const debug = require('debug')('paal:services:auth');
const uuidv1 = require('uuid/v1');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Token = require('models/Token');

const basePayload = {
  client_id: process.env.AUTH0_CLIENT_ID,
  client_secret: process.env.AUTH0_CLIENT_SECRET
};

const service = {
  accessWithPassword(username, password) {
    const appToken = uuidv1();
    const params = {
      grant_type: 'password',
      scope: 'offline_access',
      username, password,
      ...basePayload
    }

    return Token.deleteOne({ username })
      .then(_ =>
        axios.post(process.env.AUTH0_TOKEN_ENDPOINT, params)
          .then(value =>
            new Token({ username, appToken, ...value.data }).save()
          )
      );
  },
  checkAccessTokenState(appToken, callback) {
    return Token.findOne({ appToken }).exec()
      .then(result => {
        if (!result) {
          logger.warn('token not found');
          return Promise.resolve();
        }

        const { id_token } = result;
        const jwtDecoded = jwt.decode(id_token);
        const expiresIn = new Date(jwtDecoded.exp * 1000);

        if (new Date() > expiresIn) {
          this.refreshIt(result);
        }

        return Promise.resolve(appToken);
      });
  },
  refreshIt(token) {
    const { refresh_token } = token;
    const params = {
      grant_type: 'refresh_token',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      refresh_token
    };

    return axios.post(process.env.AUTH0_TOKEN_ENDPOINT, params)
      .then(value => {
        const { access_token, id_token } = value.data;
        Object.assign(token, { access_token, id_token });
        return token.save();
      });
  }
};

module.exports = service;
