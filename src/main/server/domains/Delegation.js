'use strict';

const def = {
  head: {
    type: String,
    required: true,
    unique: true
  },
  school: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
};

module.exports = def;
