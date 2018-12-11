'use strict';

const { NOT_FOUND } = require('controllers/HttpStatus');
const workoutService = require('./WorkoutService');

const service = {
  findById(workoutId, splitId) {
    return workoutService.findById(workoutId)
      .then(workout => {
        const split = workout.splits.find(split => split.id === splitId);

        if (!split) {
          const error = new Error('SPLIT_NOT_FOUND');
          error.status = NOT_FOUND;

          throw error;
        }

        return Promise.resolve({ split, workout });
      });
  }
};

module.exports = service;
