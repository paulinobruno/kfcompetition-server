'use strict';

const Exercise = require('./Exercise');

const def = {
  exercise: {
    type: Exercise,
    required: true
  },
  description: {
    type: String,
    lowercase: true
  },
  reps: {
    type: [Number],
    required: true,
    default: undefined
  },
  interval: {
    type: Number,
    required: true,
    set: val => Math.floor(val)
  }
};

module.exports = def;
