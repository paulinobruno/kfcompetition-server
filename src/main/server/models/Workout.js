'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(require('domains/Workout'));

module.exports = mongoose.model('Workout', schema);
