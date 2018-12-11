'use strict';

const debug = require('debug')('paal:controllers:splits');
const router = require('express').Router({ mergeParams: true });
const controller = require('controllers/SplitController');

router.post('/', controller.addSplit);
router.get('/', controller.listWorkoutSplits);
router.get('/:splitId', controller.getSplit);
router.put('/:splitId', controller.updateSplit);
router.delete('/:splitId', controller.deleteSplit);

module.exports = router;
