'use strict';

const debug = require('debug')('paal:controllers:workouts');
const router = require('express').Router();
const controller = require('controllers/WorkoutController');

router.post('/', controller.addWorkout);
router.put('/:workoutId', controller.updateWorkout);
router.delete('/:workoutId', controller.deleteWorkout);
router.get('/:workoutId', controller.getWorkout);
router.get('/', controller.listWorkouts);
router.use('/:workoutId/splits', require('./splits'));

module.exports = router;
