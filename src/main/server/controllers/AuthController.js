'use strict';

const debug = require('debug')('paal:controllers:auth');
const service = require('services/AuthService');

const controller = {
  doLogin(request, response, next) {
    const { username, password } = request.body;

    service.accessWithPassword(username, password)
      .then(token => {
        const { appToken: access_token } = token;
        response.json({ access_token });
      })
      .catch(next);
  },
  checkAccessTokenState(request, response, next) {
    const { token } = request;

    if (!token) {
      return next();
    }

    service.checkAccessTokenState(token)
      .then(newToken => {
        request.token = newToken;
        next();
      })
      .catch(next);
  }
};

module.exports = controller;
