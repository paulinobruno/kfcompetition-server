'use strict';

const debug = require('debug')('paal:routes');
const router = require('express').Router();

router.use('/workouts', require('./workouts'));

module.exports = router;
