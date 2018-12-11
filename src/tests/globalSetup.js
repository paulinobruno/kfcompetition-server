'use strict';

const app = require('app');
const requestDefaults = require('superagent-defaults');

global.assert = require('assert');
global.sinon = require('sinon');
global.nock = require('nock');
global.request = require('supertest')(app);
global.proxyquire = require('proxyquire');

global.authrequest = requestDefaults(require('supertest')(app));
global.authrequest.set('Authorization', 'Bearer bearer-token');

global.mongo = {
  init() {
    require('config/mongo')(process.env.MONGO_URI);
  },
  destroy() {
    return require('mongoose').disconnect();
  }
};

// const log = require('why-is-node-running');
// setTimeout(() => {
//   log();
// }, 10000);
