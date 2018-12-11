'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(require('domain/Delegation'));

module.exports = mongoose.model('Delegation', schema);
