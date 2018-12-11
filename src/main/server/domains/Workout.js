'use strict';

const Split = require('./Split');

const def = {
  name: {
    type: String,
    required: true
  },
  validSince: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  lastAccess: Date,
  splits: [Split]
};

module.exports = def;
