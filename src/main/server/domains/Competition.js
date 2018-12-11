'use strict';

const def = {
  name: {
    type: String,
    required: true
  },
  edition: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  subscriptionsUntil: {
    type: Date,
    required: true
  },
  happeningOn: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date
  },
  driveFolder: {
    type: String
  }
};

module.exports = def;
