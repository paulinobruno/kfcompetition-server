'use strict';

const debug = require('debug')('paal:controllers:app');
const pkg = require('../../../../package.json');
const RequestUtil = require('util/RequestUtil');
const { UNAUTHORIZED, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('./HttpStatus');

const MAX_AGE = 60;

const AppController = {
  health(request, response) {
    response.json({
      status: 'OK',
      pid: process.pid,
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      env: process.env.NODE_ENV,
      host: request.get('host'),
      hostname: request.hostname,
      version: process.version
    });
  },

  version(request, response) {
    response.json({ version: pkg.version });
  },

  notFound(request, response, next) {
    const err = new Error('not found');
    err.status = NOT_FOUND;
    next(err);
  },

  unauthorized(request, response, next) {
    let err = null;

    if (!request.token) {
      err = new Error('unauthorized');
      err.status = UNAUTHORIZED;
    }

    next(err);
  },

  handleErrors(err, request, response, next) {
    const axiosResponse = err.response || {};
    const status = err.status || axiosResponse.status || INTERNAL_SERVER_ERROR;
    const errMessage = axiosResponse.data || err.message;

    const message = {
      err: errMessage,
      url: request.url,
      ip: RequestUtil.getClientRealIp(request.headers, request.ip),
      status,
      stack: status === INTERNAL_SERVER_ERROR ? err.stack : null,
      body: request.method !== 'GET' ? request.body : null
    };

    if (status !== NOT_FOUND && status !== NO_CONTENT) {
      logger.error('app.error', message);
    }

    response.setHeader('Cache-Control', `public, max-age=${MAX_AGE}`);
    response.setHeader('Expires', new Date(Date.now() + MAX_AGE * 1000).toUTCString());
    response.status(status).send(errMessage);
  }
};

module.exports = AppController;
