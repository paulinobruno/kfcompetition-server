'use strict';

const def = {
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    lowercase: true
  },
  tags: {
    type: [{
      type: String,
      uppercase: true
    }],
    default: undefined
  }
};

module.exports = def;
