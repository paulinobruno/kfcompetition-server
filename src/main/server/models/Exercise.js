'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(require('domains/Exercise'));

module.exports = mongoose.model('Exercise', schema);
