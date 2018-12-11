'use strict';

const debug = require('debug')('paal:controllers:auth');

const controller = {
  checkAccessTokenState(request, response, next) {
    // Validar Token JWT
    next();
  }
};

module.exports = controller;
