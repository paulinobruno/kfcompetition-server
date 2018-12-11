'use strict';

const { ObjectId } = require('mongoose').Schema.Types;
const SubscriptionCategory = require('./SubscriptionCategory');

const def = {
  competitionId: {
    type: ObjectId,
    required: true
  },
  categories: [SubscriptionCategory]
};

module.exports = def;
