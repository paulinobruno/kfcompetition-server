'use strict';

const def = {
  type: {
    type: String,
    enum: ['SIMPLE', 'COMBINED', 'SANDA', 'SHUAI_JIAO'],
    required: true
  },
  category: {
    type: String,
    required: true,
    uppercase: true
  },
  partner: String,
  style: String
};

module.exports = def;
