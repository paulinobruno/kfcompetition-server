'use strict';

const { ObjectId } = require('mongoose').Schema.Types;
const Subscription = require('./Subscription');

const def = {
  name: {
    type: String,
    required: true
  },
  isAffiliate: {
    type: Boolean,
    required: true,
    default: false
  },
  affiliateNumber: {
    type: String,
    indexed: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['MALE', 'FEMALE']
  },
  birthDate: {
    type: Date,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    set: val => (val || '').replace(/\D/g, ''),
    // validate format?
  },
  yearsOfTraining: {
    type: Number,
    required: true,
    set: val => parseInt(val, 10)
  },
  currentStyle: String,
  phone: String,
  email: {
    type: String,
    required: true
  },
  agreedWithTerms: {
    type: Boolean,
    required: true
  },
  delegationId: ObjectId,
  subscriptions: [Subscription]
};

module.exports = def;
